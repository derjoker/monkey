const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// --- Configuration ---
const INPUT_PATH = process.argv[2]; // Can be file or folder
if (!INPUT_PATH) {
    console.error("Usage: node convert.js <html_file_or_folder>");
    process.exit(1);
}

// Determine Input File
let htmlFile = INPUT_PATH;
if (fs.statSync(INPUT_PATH).isDirectory()) {
    // If folder, find first .html file usually named index.html or the paper name
    const files = fs.readdirSync(INPUT_PATH).filter(f => f.endsWith('.html'));
    if (files.length === 0) {
        console.error(`No .html files found in ${INPUT_PATH}`);
        process.exit(1);
    }
    // Prefer one that looks like the main page (not in solutions folder if accidentally pointed there)
    // Assume flat or standard structure.
    htmlFile = path.join(INPUT_PATH, files[0]);
    if (files.includes('index.html')) htmlFile = path.join(INPUT_PATH, 'index.html');
}

// Determine Output Paths
let baseName = path.basename(htmlFile, path.extname(htmlFile));

// If input was a directory, use directory name. 
// If input was a file "index.html" or similar generic name, use parent directory name.
if (fs.statSync(INPUT_PATH).isDirectory()) {
    baseName = path.basename(INPUT_PATH);
} else if (baseName === 'index' || baseName === 'debug') {
    baseName = path.basename(path.dirname(htmlFile));
}

const OUTPUT_DIR = 'typst';
const outputTypFile = path.join(OUTPUT_DIR, `${baseName}.typ`);

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generate dummy image
const dumbPngPath = path.join(OUTPUT_DIR, 'dumb.png');
if (!fs.existsSync(dumbPngPath)) {
    // 1x1 transparent pixel or simple gray square
    const base64Png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
    fs.writeFileSync(dumbPngPath, Buffer.from(base64Png, 'base64'));
    console.log(`Created dummy image at ${dumbPngPath}`);
}

// Solutions Directory (Assumed relative to htmlFile)
const solutionsDir = path.join(path.dirname(htmlFile), 'solutions');

console.log(`Input: ${htmlFile}`);
console.log(`Solutions Dir: ${solutionsDir}`);
console.log(`Output: ${outputTypFile}`);

if (!fs.existsSync(htmlFile)) {
    console.error(`File not found: ${htmlFile}`);
    process.exit(1);
}

const html = fs.readFileSync(htmlFile, 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;
const Node = dom.window.Node;

// Mock window/global objects if needed
const imagesToDownload = new Map();

// --- Core Logic ---

async function runConversion() {
    try {
        const headers = document.querySelectorAll('h3.ques-type');
        const totalQuestions = document.querySelectorAll('fieldset.quesborder').length;
        let processedCount = 0;
        
        let typstContent = '';
        
        // Header
        typstContent += `#import "/conf.typ": *\n`;
        typstContent += `#show: conf-rules\n`;
        
        const titleEl = document.querySelector('h1.paper-title');
        const title = titleEl ? titleEl.textContent.trim() : baseName;
        typstContent += `#title[${title}]\n\n`;

        if (headers.length > 0) {
            // Section-based extraction
            for (const header of headers) {
                let sectionTitle = header.textContent.trim();
                sectionTitle = sectionTitle.replace(/^[\d一二三四五六七八九十]+\s*[、．.]\s*/, '');
                sectionTitle = sectionTitle.replace(/\s*[（\(].*?共.*?题.*?[）\)]$/, '');
                
                typstContent += `= ${sectionTitle}\n\n`;

                let questions = [];
                let nextNode = header.nextElementSibling;
                
                // Case 1: Questions in a UL immediately following
                if (nextNode && nextNode.tagName === 'UL') {
                    const fieldsets = nextNode.querySelectorAll('fieldset.quesborder');
                    fieldsets.forEach(fs => questions.push(fs));
                } else {
                    // Case 2: Questions are siblings
                    while (nextNode && !nextNode.classList.contains('ques-type')) {
                        if (nextNode.tagName === 'FIELDSET' && nextNode.classList.contains('quesborder')) {
                            questions.push(nextNode);
                        }
                        nextNode = nextNode.nextElementSibling;
                    }
                }
                
                const questionPromises = questions.map(async q => {
                    const res = await convertQuestion(q);
                    processedCount++;
                    process.stdout.write(`\rProcessed: ${processedCount}/${totalQuestions}`);
                    return res;
                });
                const results = await Promise.all(questionPromises);
                results.forEach(r => typstContent += r);
            }
        } else {
            // Fallback: No sections
            const questions = document.querySelectorAll('fieldset.quesborder');
            const questionPromises = Array.from(questions).map(async q => {
                const res = await convertQuestion(q);
                processedCount++;
                process.stdout.write(`\rProcessed: ${processedCount}/${totalQuestions}`);
                return res;
            });
            const results = await Promise.all(questionPromises);
            results.forEach(r => typstContent += r);
        }

        fs.writeFileSync(outputTypFile, typstContent);
        console.log(`\n\nConversion complete! written to ${outputTypFile}`);
        console.log(`Images found: ${imagesToDownload.size} (Note: Images are not downloaded by this local script, user browser download)`);
        
    } catch (e) {
        console.error("Error:", e);
    }
}

async function convertQuestion(fieldset) {
    let content = '';
    
    // Extract solution URL
    const solutionUrl = extractSolutionUrl(fieldset);
    if (solutionUrl) {
        content += `// ${solutionUrl}\n`;
    }
    
    // 1. Question Text (.pt1)
    const pt1 = fieldset.querySelector('.pt1');
    if (pt1) {
        const clone = pt1.cloneNode(true);
        const qseq = clone.querySelector('.qseq');
        if (qseq) qseq.remove();

        // processLayout handles floating images and text extraction
        content += processLayout(clone, (t) => t.replace(/^\s*(?:(?:\$\s*)?\d+(?:\s*\$)?)\s*[．.、]\s*/, '').trim());
    }

    // 2. Options (.pt2)
    const pt2 = fieldset.querySelector('.pt2');
    if (pt2) {
        const options = [];
        const labels = pt2.querySelectorAll('.selectoption label');
        labels.forEach(label => {
            let optText = parseContent(label);
            optText = optText.replace(/^\s*(?:(?:\$\s*)?[A-D](?:\s*\$)?)\s*[．.、]\s*/, '').trim();
            options.push(`[${optText}]`);
        });

        if (options.length > 0) {
            const totalLength = options.reduce((sum, opt) => sum + opt.length, 0);
            let colNum = 4;
            if (totalLength > 60) colNum = 1;
            else if (totalLength > 30) colNum = 2;
            
            content += `\n#choices(\n  (${options.join(', ')}),\n  colNum: ${colNum}\n)`;
        }
    }
    
    // 3. Solution (Local fetch)
    if (solutionUrl) {
        try {
            // Extract ID
            const idMatch = solutionUrl.match(/\/detail\/([a-zA-Z0-9]+)/);
            const id = idMatch ? idMatch[1] : null;
            
            if (id) {
                // Look for debug/solutions/ID.html
                const candidates = [
                    path.join(solutionsDir, id + '.html'),
                    path.join(path.dirname(htmlFile), id + '.html'), // in case flattened
                    path.join(__dirname, 'debug', 'solutions', id + '.html')
                ];
                
                let solutionDoc = null;
                for (const p of candidates) {
                    if (fs.existsSync(p)) {
                        const solHtml = fs.readFileSync(p, 'utf8');
                        const tempDom = new JSDOM(solHtml);
                        solutionDoc = tempDom.window.document;
                        break;
                    }
                }

                if (solutionDoc) {
                    const pt6 = solutionDoc.querySelector('.pt6');
                    if (pt6) {
                        let solText = processLayout(pt6, (t) => {
                             t = t.replace(/^(\s*(?:#align\(.*?\))?[\s\n]*#image\(.*?\)\s*)?[\s\n]*【.*?】[\s\n]*(解[:：])?[\s\n]*/, '$1');
                             return t.replace(/^(\s*(?:#align\(.*?\))?[\s\n]*#image\(.*?\)\s*)?[\s\n]*解[:：][\s\n]*/, '$1');
                        });
                        content += `\n\n#solution[\n${solText}\n]`;
                    }
                } else {
                    content += `\n// Solution file not found for ID: ${id}\n`;
                }
            }
        } catch (e) {
            console.error("Solution error:", e);
        }
    }

    return `#example[\n${content}\n]\n\n`;
}

function extractSolutionUrl(element) {
    let container = element;
    let link = container.querySelector('.fieldtip-right a[href*="/ques/detail/"]');
    if (link && link.textContent.includes('解析')) return link.href;

    if (container.parentElement) {
         link = container.parentElement.querySelector('.fieldtip-right a[href*="/ques/detail/"]');
         if (link && link.textContent.includes('解析')) return link.href;
    }
    return null;
}

function parseContent(element) {
    const clone = element.cloneNode(true);
    return renderSegments(traverse(clone, []));
}

// --- Segmentation Logic ---

// Returns Array<{ text: string, isMath: boolean }>
function traverse(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        return segmentizeText(node.textContent);
    }
    
    if (node.nodeType !== Node.ELEMENT_NODE) return [];

    if (node.style.display === 'none') return [];

    // MathJye
    if (node.classList.contains('MathJye') || node.getAttribute('mathtag') === 'math') {
        const mathContent = parseMath(node);
        return [{ text: mathContent, isMath: true }];
    }

    // Images
    if (node.tagName === 'IMG') {
        const src = node.src;
        if (src && !src.includes('icon') && !src.includes('button')) {
             let filename = src.substring(src.lastIndexOf('/') + 1);
             filename = filename.split('?')[0];
             if (!filename.includes('.')) filename += '.png';
             imagesToDownload.set(src, filename);
             
             // Images are not math, and break math context
             return [{ text: ` #image("dumb.png", width: 25%) `, isMath: false }];
        }
        return [];
    }

    if (node.tagName === 'TABLE') {
        const rows = Array.from(node.querySelectorAll('tr'));
        if (rows.length === 0) return [];
        
        let maxCols = 0;
        const cells = [];
        
        rows.forEach(row => {
            const cols = Array.from(row.querySelectorAll('td, th'));
            if (cols.length > maxCols) maxCols = cols.length;
            cols.forEach(col => {
                let cellSegments = traverse(col);
                let cellContent = renderSegments(cellSegments).trim();
                cells.push(`[${cellContent}]`);
            });
        });

        if (maxCols === 0) return [];
        
        return [{ 
            text: `\n#table(\n  columns: ${maxCols},\n  align: center + horizon,\n  ${cells.join(', ')}\n)\n`,
            isMath: false 
        }];
    }

    if (node.tagName === 'BR') {
        return [{ text: '\n\n', isMath: false }];
    }

    // SUP/SUB: Treat as math segments that can merge
    if (node.tagName === 'SUP') {
        let segments = [];
        for (let child of node.childNodes) {
            segments = segments.concat(traverse(child));
        }
        const innerContent = renderSegmentsRaw(segments); // defined below
        return [{ text: `^(${innerContent})`, isMath: true }];
    }

    if (node.tagName === 'SUB') {
        let segments = [];
        for (let child of node.childNodes) {
            segments = segments.concat(traverse(child));
        }
        const innerContent = renderSegmentsRaw(segments);
        return [{ text: `_(${innerContent})`, isMath: true }];
    }

    // New Request: Handle quizPutTag -> #blank, sanwser -> delete
    if (node.classList && node.classList.contains('quizPutTag')) {
        return [{ text: ' #blank ', isMath: false }];
    }
    if (node.classList && node.classList.contains('sanwser')) {
        return [];
    }

    // Block elements break math merging usually, but we handle via segments
    if (node.tagName === 'DIV' || node.tagName === 'P') {
        let segments = [];
        for (let child of node.childNodes) {
            segments = segments.concat(traverse(child));
        }
        if (node.tagName !== 'SPAN') {
             segments.push({ text: '\n', isMath: false });
        }
        return segments;
    }

    let segments = [];
    for (let child of node.childNodes) {
        segments = segments.concat(traverse(child));
    }
    return segments;
}

function segmentizeText(text) {
    if (!text) return [];

    // 1. Preprocess punctuation (Full-width to Half-width, etc.)
    text = preprocessText(text);

    // 2. Protect patterns like (   ) and ______
    // Use PUA codes to protect. E000 range.
    const mapping = new Map();
    let puaCode = 0xE000;
    
    text = text.replace(/(\(\s+\))|(_+)/g, (match) => {
        const char = String.fromCharCode(puaCode++); // Unique char for this match
        mapping.set(char, match);
        return char;
    });

    // 3. Regex for math-like text
    // Includes: Alphanumeric, Greek, Operators, Parens/Brackets, Dot, Comma, etc.
    // Explicitly add common math symbols.
    // ALSO include PUA range for protected patterns so they are split out.
    const mathRegex = /([a-zA-Z0-9\+\-\=\<\>\/\%\.\,\:\;\u0370-\u03FF\(\)\[\]\{\}\|\^\*\~\⋅\uE000-\uF8FF]+)/;
    
    // 3. Regex for math-like text
    // Exclude .,:; from the main block so we can check context
    // Capturing groups: 1=PUA, 2=DefiniteMath, 3=Punctuation(.,:;)
    // Added \u2200-\u22FF (Math Operators: infinity, union, element of, etc.)
    const tokenRegex = /([\uE000-\uF8FF])|([a-zA-Z0-9\+\-\=\<\>\/\%\(\)\[\]\{\}\|\^\*\~\⋅\u0370-\u03FF\u2200-\u22FF]+)|([\.\,\:\;])/g;
    
    let lastIndex = 0;
    let match;
    const segments = [];
    let bracketDepth = 0; // Track depth for context-aware punctuation
    
    while ((match = tokenRegex.exec(text)) !== null) {
        // Text before match?
        if (match.index > lastIndex) {
            const txt = text.slice(lastIndex, match.index);
            segments.push({ text: normalizeText(txt), isMath: false });
        }
        
        if (match[1]) {
            // PUA (Protected)
            const original = mapping.get(match[1]);
            if (original.includes('(')) segments.push({ text: ' #parentheses ', isMath: false });
            else if (original.includes('_')) segments.push({ text: ' #blank ', isMath: false });
        } else if (match[2]) {
            // Definite Math
            const m = match[2];
            
            // Update bracket depth
            for (const char of m) {
                if ('([{'.includes(char)) bracketDepth++;
                else if (')]}'.includes(char)) bracketDepth = Math.max(0, bracketDepth - 1);
            }

             if (m.startsWith('http') || m.startsWith('//') || m.startsWith('www')) {
                 segments.push({ text: m, isMath: false });
             } else {
                 segments.push({ text: processMathText(m), isMath: true });
             }
        } else if (match[3]) {
            // Punctuation (.,:;)
            // Check context: 
            // 1. If inside brackets/parens (depth > 0), treat as Math (intervals, tuples).
            // 2. Else check whitespace/EOF for Text.
            const p = match[3];
            
            if (bracketDepth > 0) {
                 segments.push({ text: p, isMath: true });
            } else {
                const nextChar = text[tokenRegex.lastIndex]; // Peek next char
                // If next char is undefined (EOF) or whitespace, treat as Text Punctuation
                if (nextChar === undefined || /\s/.test(nextChar) || /[\u4e00-\u9fa5]/.test(nextChar)) {
                     segments.push({ text: p, isMath: false });
                } else {
                     // Followed by non-space (e.g. digit, letter), likely math (3.14, f(x,y))
                     segments.push({ text: p, isMath: true });
                }
            }
        }
        lastIndex = tokenRegex.lastIndex;
    }
    // Tail
    if (lastIndex < text.length) {
        segments.push({ text: normalizeText(text.slice(lastIndex)), isMath: false });
    }
    
    return segments;
}

function preprocessText(text) {
    return text.replace(/，/g, ', ')
               .replace(/。/g, '. ')
               .replace(/：/g, ': ')
               .replace(/；/g, '; ')
               .replace(/（/g, '(')
               .replace(/）/g, ')')
               .replace(/？/g, '?')
               .replace(/！/g, '!')
               .replace(/＞/g, '>')
               .replace(/＜/g, '<')
               .replace(/•/g, '⋅'); // Convert bullet to dot operator for math matching
}

function processLayout(element, textCleaner) {
    const clone = element.cloneNode(true);
    const floatingImg = Array.from(clone.children).find(child => 
        child.tagName === 'IMG' && 
        (child.style.float === 'right' || child.style.float === 'left')
    );

    if (floatingImg) {
         const floatDir = floatingImg.style.float;
         floatingImg.remove();
         
         let text = renderSegments(traverse(clone));
         if (textCleaner) text = textCleaner(text);
         
         const imgTypst = `#align(center + horizon, image("dumb.png", width: 100%))`;
         
         if (floatDir === 'right') {
             return `#grid(columns: (1fr, 25%), gutter: 1em, [${text}], [${imgTypst}])`;
         } else {
             return `#grid(columns: (25%, 1fr), gutter: 1em, [${imgTypst}], [${text}])`;
         }
    } else {
        let text = renderSegments(traverse(clone));
        if (textCleaner) text = textCleaner(text);
        return text.trim();
    }
}

function renderSegments(segments) {
    let result = '';
    let currentMath = '';
    
    const flushMath = () => {
        if (currentMath) {
            // Trim to avoid block math (which requires spaces inside $)
            result += ` $${currentMath.trim()}$ `;
            currentMath = '';
        }
    };

    for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        
        if (seg.isMath) {
            currentMath += seg.text;
        } else {
            // Text. Check whitespace merging.
            if (/^\s+$/.test(seg.text)) {
                 let nextIsMath = false;
                 for (let j = i + 1; j < segments.length; j++) {
                     if (segments[j].text) {
                         if (segments[j].isMath) nextIsMath = true;
                         break; // found next non-empty
                     }
                 }
                 
                 if (currentMath && nextIsMath) {
                     currentMath += ' '; 
                 } else {
                     flushMath();
                     result += seg.text;
                 }
            } else {
                flushMath();
                result += seg.text;
            }
        }
    }
    flushMath();
    return result.replace(/ +/g, ' ');
}

// Render segments without wrapping in $, for inside SUP/SUB or other math contexts
function renderSegmentsRaw(segments) {
    return segments.map(s => {
        if (s.isMath) return s.text;
        // If text contains non-math chars (like Chinese), quote it
        // Or if it's text, safe to quote always? 
        // " " -> " ".
        // "Text" -> "Text".
        // If it's pure whitespace, quoting might be weird? `" "`. Typst math `" "` is space.
        // If it's Chinese, definitely quote.
        if (/[\u4e00-\u9fa5]/.test(s.text)) {
            return `"${s.text}"`;
        }
        // What about English text that isn't math? e.g. "if" inside subscript?
        // `$x_(if)$`. `if` is var unless quoted.
        // Safer to quote all non-math text segments?
        // But what about punctuation that we normalized?
        // if text is just whitespace, don't quote.
        if (!s.text.trim()) return s.text;
        
        // Quote non-empty text
        return `"${s.text}"`;
    }).join(' ');
}


function normalizeText(text) {
    if (!text) return '';
    
    // Parentheses/Blanks are handled by protection logic, but just in case
    text = text.replace(/_+/g, ' #blank ');
    text = text.replace(/\( +\)/g, ' #parentheses ');

    // Special markers
    text = text.replace(/⋅/g, ' $dot$ ');

    return text.replace(/\s+/g, ' ');
}

// Reusable math text processor for text segments AND math nodes
function processMathText(text) {
    if (!text) return '';

    // preprocess if not already done (safe to repeat)
    text = preprocessText(text);

    // variable spacing: split letters
    text = text.replace(/([A-Z])(?=[A-Z])/g, '$1 ');
    text = text.replace(/([a-z])(?=[A-Z])/g, '$1 ');
    text = text.replace(/([a-z])(?=[a-z])/g, '$1 ');
    text = text.replace(/([A-Z])(?=[a-z])/g, '$1 '); // Asin -> A sin
    
    // Split digit-letter and letter-digit
    text = text.replace(/([0-9])(?=[a-zA-Z])/g, '$1 ');
    text = text.replace(/([a-zA-Z])(?=[0-9])/g, '$1 ');

    // rejoin functions - ORDER MATTERS! Longest first.
    text = text.replace(/a\s+r\s+c\s+s\s+i\s+n/g, 'arcsin')
               .replace(/a\s+r\s+c\s+c\s+o\s+s/g, 'arccos')
               .replace(/a\s+r\s+c\s+t\s+a\s+n/g, 'arctan')
               .replace(/s\s+i\s+n\s+h/g, 'sinh')
               .replace(/c\s+o\s+s\s+h/g, 'cosh')
               .replace(/t\s+a\s+n\s+h/g, 'tanh') // Added tanh just in case
               .replace(/s\s+i\s+n/g, 'sin')
               .replace(/c\s+o\s+s/g, 'cos')
               .replace(/t\s+a\s+n/g, 'tan')
               .replace(/c\s+o\s+t/g, 'cot')
               .replace(/l\s+n/g, 'ln')
               .replace(/l\s+o\s+g/g, 'log')
               .replace(/l\s+g/g, 'lg')
               .replace(/l\s+i\s+m/g, 'lim')
               .replace(/m\s+a\s+x/g, 'max')
               .replace(/m\s+i\s+n/g, 'min')
               .replace(/s\s+e\s+c/g, 'sec')
               .replace(/c\s+s\s+c/g, 'csc');
    
    // Map text representation to Typst symbols
    const map = {
        '∵': 'because', '∴': 'therefore', '×': 'times', '⋅': 'dot.op',
        '≥': '>=', '≤': '<=', '≠': '!=', '≈': 'approx',
        '⊥': 'tack.t', '∥': '//', '△': 'triangle', '∠': 'angle',
        '°': 'degree', 'π': 'pi', 'α': 'alpha', 'β': 'beta', 'γ': 'gamma', 'θ': 'theta',
        'λ': 'lambda', 'μ': 'mu', 'ρ': 'rho', 'σ': 'sigma',
        'ω': 'omega', 'φ': 'phi', '→': 'arrow',
        '∞': 'infinity', '∪': 'union', '∩': 'inter', 
        '∈': 'in', '∉': 'in.not', '⊆': 'subset.eq', '⊂': 'subset', '∅': 'emptyset'
    };

    for (const [key, val] of Object.entries(map)) {
        text = text.replaceAll(key, ` ${val} `);
    }
    
    return text;
}

function parseMath(node) {
    // MathJye parsing
    
    let result = '';

    // Handle Cases / Piecewise (stretchVBox with braces)
    if (node.classList && node.classList.contains('stretchVBox')) {
        // Check for brace
        if (node.querySelector('.brace')) {
            const rootTable = node.querySelector('table');
            if (rootTable) {
                // Recursive function to flatten layout tables preserving order
                const getFlatRows = (element) => {
                    let collected = [];
                    if (element.tagName === 'TABLE') {
                        Array.from(element.rows).forEach(row => {
                            collected = collected.concat(getFlatRows(row));
                        });
                    } else if (element.tagName === 'TR') {
                        const innerTable = element.querySelector('table');
                        // If row simply wraps a table (content identical), flatten down
                        if (innerTable && element.textContent.replace(/\s/g, '') === innerTable.textContent.replace(/\s/g, '')) {
                            collected = collected.concat(getFlatRows(innerTable));
                        } else {
                            collected.push(element);
                        }
                    }
                    return collected;
                };

                const rows = getFlatRows(rootTable);
                const caseLines = rows.map(row => {
                    let lineMath = '';
                    const td = row.querySelector('td');
                    if (td) {
                        const container = td.querySelector('.mrow') || td;
                        for (let child of container.childNodes) {
                            if (child.textContent.trim() === '，' || child.textContent.trim() === ',') {
                                if (child.classList && child.classList.contains('mo')) {
                                    lineMath += ' "," ';
                                    continue;
                                }
                            }
                            lineMath += parseMath(child) + ' ';
                        }
                    }
                    lineMath = lineMath.trim();
                    if (lineMath.endsWith('quad')) lineMath = lineMath.substring(0, lineMath.length - 4);
                    if (lineMath.endsWith('","')) lineMath = lineMath.substring(0, lineMath.length - 3);
                    if (lineMath.endsWith(',')) lineMath = lineMath.substring(0, lineMath.length - 1);

                    return lineMath.trim();
                });

                const validLines = caseLines.filter(l => l && l !== '""' && l.trim() !== '');
                return `cases(${validLines.join(', ')})`;
            }
        }
    }
    
    if (node.classList && (node.classList.contains('math-letter') || node.classList.contains('math-letter-i') || node.classList.contains('mnormal') || node.classList.contains('mo'))) {
        let text = node.textContent.trim();
        if (!text) return '';
        
        return processMathText(text);
    }

    if (node.classList && node.classList.contains('mfrac')) {
        const num = node.querySelector('.fracZi');
        const den = node.querySelector('.fracMu');
        const nVal = num ? parseMath(num) : '';
        const dVal = den ? parseMath(den) : '';
        return `(${nVal})/(${dVal})`;
    }

    if (node.classList && (node.classList.contains('msubsup') || node.classList.contains('msub') || node.classList.contains('msup'))) {
        let base = '', sub = '', sup = '';
        // Iterate direct children to avoid picking up nested subs/sups
        for (let child of node.children) {
             if (child.classList.contains('msubsupCont')) base = parseMath(child);
             // Handle both msub (wrapper) and inner msub slot? Usually slot.
             if (child.classList.contains('msub')) sub = parseMath(child);
             if (child.classList.contains('msup')) sup = parseMath(child);
        }
        // If it's a wrapper class but no explicit slots found, maybe fall back?
        // But MathJye seems consistent.
        if (!base && !sub && !sup) {
             // Fallback
        } else {
             return `${base}${sub ? `_(${sub})` : ''}${sup ? `^(${sup})` : ''}`;
        }
    }
    
    if (node.classList && node.classList.contains('msqrt')) { 
         const box = node.querySelector('.msqrtBox');
         if (box) {
             return `sqrt(${parseMath(box)})`;
         }
         return `sqrt(${parseMathChildren(node)})`;
    }
    
    if (node.tagName === 'SUP') {
         return `^(${parseMathChildren(node)})`;
    }
    if (node.tagName === 'SUB') {
         return `_(${parseMathChildren(node)})`;
    }
    
    for (let child of node.childNodes) {
         if (child.nodeType === Node.TEXT_NODE) {
             // For text nodes inside MathJye, we also process them
             result += processMathText(child.textContent) + ' ';
         } else {
             result += parseMath(child) + ' '; 
         }
    }
    
    return result;
}

function parseMathChildren(node) {
    let res = '';
    for (let child of node.childNodes) {
         if (child.nodeType === Node.TEXT_NODE) res += child.textContent;
         else res += parseMath(child);
    }
    return res;
}

runConversion();
