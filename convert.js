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
        // TODO: Copy or handle images if they are local? 
        // If html.user.js saved images, they might be in 'images/' folder relative to html.
        // We might want to fix paths.
        
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
        
        let text = traverse(clone);
        text = text.replace(/^\s*\d+[．.、]\s*/, '');
        content += text.trim();
    }

    // 2. Options (.pt2)
    const pt2 = fieldset.querySelector('.pt2');
    if (pt2) {
        const options = [];
        const labels = pt2.querySelectorAll('.selectoption label');
        labels.forEach(label => {
            let optText = parseContent(label);
            optText = optText.replace(/^[A-D][．.、]\s*/, '').trim();
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
                // Check multiple possible paths
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
                        let solText = traverse(pt6);
                        solText = solText.replace(/^[\s\n]*【.*?】[\s\n]*(解[:：])?[\s\n]*/, '').replace(/^[\s\n]*解[:：][\s\n]*/, '');
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
    return traverse(clone, []);
}

function traverse(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        let text = node.textContent;
        // Escape special chars
        text = text.replace(/([#$\[\]*])/g, '\\$1');
        return normalizeText(text);
    }
    
    if (node.nodeType !== Node.ELEMENT_NODE) return '';

    if (node.style.display === 'none') return '';

    // MathJye
    if (node.classList.contains('MathJye') || node.getAttribute('mathtag') === 'math') {
        return ` $${parseMath(node)}$ `;
    }

    // Images
    if (node.tagName === 'IMG') {
        const src = node.src;
        if (src && !src.includes('icon') && !src.includes('button')) {
             let filename = src.substring(src.lastIndexOf('/') + 1);
             filename = filename.split('?')[0];
             if (!filename.includes('.')) filename += '.png';
             imagesToDownload.set(src, filename);
             
             // Use dummy image for local debugging
             return ` #image("dumb.png", width: 25%) `;
        }
        return '';
    }

    if (node.tagName === 'TABLE') {
        const rows = Array.from(node.querySelectorAll('tr'));
        if (rows.length === 0) return '';
        
        let maxCols = 0;
        const cells = [];
        
        rows.forEach(row => {
            const cols = Array.from(row.querySelectorAll('td, th'));
            if (cols.length > maxCols) maxCols = cols.length;
            cols.forEach(col => {
                let cellContent = traverse(col).trim();
                cells.push(`[${cellContent}]`);
            });
        });

        if (maxCols === 0) return '';
        
        return `\n#table(\n  columns: ${maxCols},\n  align: center + horizon,\n  ${cells.join(', ')}\n)\n`;
    }

    if (node.tagName === 'BR') {
        return '\n\n';
    }

    if (node.tagName === 'DIV' || node.tagName === 'P') {
        let res = '';
        for (let child of node.childNodes) {
            res += traverse(child);
        }
        if (node.tagName !== 'SPAN') res += '\n';
        return res;
    }

    let result = '';
    for (let child of node.childNodes) {
        result += traverse(child);
    }
    return result;
}

function normalizeText(text) {
    if (!text) return '';
    
    // Punctuation
    text = text.replace(/，/g, ', ')
               .replace(/。/g, '. ')
               .replace(/：/g, ': ')
               .replace(/；/g, '; ')
               .replace(/（/g, ' (')
               .replace(/）/g, ') ')
               .replace(/？/g, '?')
               .replace(/！/g, '!')
               .replace(/＞/g, '\\>')
               .replace(/＜/g, '\\<');
    
    // Blanks
    text = text.replace(/_+/g, ' #blank ');
    
    // Bullet
    text = text.replace(/•/g, ' $dot$ ');
    
    // Parentheses
    text = text.replace(/\( +\)/g, ' #parentheses ');
    text = text.replace(/\(\s*\)/g, ' #parentheses ');
    
    return text.replace(/\s+/g, ' ');
}

function parseMath(node) {
    let result = '';
    if (node.classList && (node.classList.contains('math-letter') || node.classList.contains('math-letter-i') || node.classList.contains('mnormal') || node.classList.contains('mo'))) {
        let text = node.textContent.trim();
        if (!text) return '';

        text = text.replace(/，/g, ', ')
               .replace(/。/g, '. ')
               .replace(/：/g, ': ')
               .replace(/；/g, '; ')
               .replace(/（/g, '(') 
               .replace(/）/g, ')') 
               .replace(/？/g, '?')
               .replace(/！/g, '!')
               .replace(/＞/g, ' > ')
               .replace(/＜/g, ' < ');

        text = text.replace(/([A-Z])(?=[A-Z])/g, '$1 ');
        text = text.replace(/([a-z])(?=[A-Z])/g, '$1 ');
        text = text.replace(/([a-z])(?=[a-z])/g, '$1 '); // split

        // rejoin
        text = text.replace(/s\s+i\s+n/g, 'sin')
                   .replace(/c\s+o\s+s/g, 'cos')
                   .replace(/t\s+a\s+n/g, 'tan')
                   .replace(/c\s+o\s+t/g, 'cot')
                   .replace(/s\s+e\s+c/g, 'sec')
                   .replace(/c\s+s\s+c/g, 'csc')
                   .replace(/s\s+i\s+n\s+h/g, 'sinh')
                   .replace(/c\s+o\s+s\s+h/g, 'cosh')
                   .replace(/a\s+r\s+c\s+s\s+i\s+n/g, 'arcsin')
                   .replace(/a\s+r\s+c\s+c\s+o\s+s/g, 'arccos')
                   .replace(/a\s+r\s+c\s+t\s+a\s+n/g, 'arctan')
                   .replace(/l\s+n/g, 'ln')
                   .replace(/l\s+o\s+g/g, 'log')
                   .replace(/l\s+g/g, 'lg')
                   .replace(/l\s+i\s+m/g, 'lim')
                   .replace(/m\s+a\s+x/g, 'max')
                   .replace(/m\s+i\s+n/g, 'min');
        
        const map = {
            '∵': 'because', '∴': 'therefore', '×': 'times', '⋅': 'dot.op',
            '≥': '>=', '≤': '<=', '≠': '!=', '≈': 'approx',
            '⊥': 'tack.t', '∥': '//', '△': 'triangle', '∠': 'angle',
            '°': 'degree', 'π': 'pi', 'α': 'alpha', 'β': 'beta', 'γ': 'gamma', 'θ': 'theta',
            'λ': 'lambda', 'μ': 'mu', 'ρ': 'rho', 'σ': 'sigma',
            'ω': 'omega', 'φ': 'phi', '→': 'arrow',
        };

        for (const [key, val] of Object.entries(map)) {
            text = text.replaceAll(key, ` ${val} `);
        }
        
        return text;
    }

    if (node.classList && node.classList.contains('mfrac')) {
        const num = node.querySelector('.fracZi');
        const den = node.querySelector('.fracMu');
        const nVal = num ? parseMath(num) : '';
        const dVal = den ? parseMath(den) : '';
        return `(${nVal})/(${dVal})`;
    }
    
    if (node.classList && node.classList.contains('msqrt')) { 
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
             let t = child.textContent;
             // Basic punctuation math
             t = t.replace(/，/g, ', ')
                  .replace(/。/g, '. ')
                  .replace(/：/g, ': ')
                  .replace(/；/g, '; ')
                  .replace(/（/g, '(') 
                  .replace(/）/g, ')') 
                  .replace(/？/g, '?')
                  .replace(/！/g, '!')
                  .replace(/＞/g, ' > ')
                  .replace(/＜/g, ' < ');
             
             t = t.replace(/([A-Z])(?=[A-Z])/g, '$1 ');
             t = t.replace(/([a-z])(?=[A-Z])/g, '$1 ');
             t = t.replace(/([a-z])(?=[a-z])/g, '$1 ');

             const map = {
                '∵': 'because', '∴': 'therefore', '×': 'times', '⋅': 'dot.op',
                '≥': '>=', '≤': '<=', '≠': '!=', '≈': 'approx',
                '⊥': 'tack.t', '∥': '//', '△': 'triangle', '∠': 'angle',
                '°': 'degree', 'π': 'pi', 'α': 'alpha', 'β': 'beta',
                'γ': 'gamma', 'θ': 'theta', 'λ': 'lambda', 'μ': 'mu',
                'ρ': 'rho', 'σ': 'sigma', 'ω': 'omega', 'φ': 'phi', '→': 'arrow'
             };
             for (const [key, val] of Object.entries(map)) {
                t = t.replaceAll(key, ` ${val} `);
             }
             result += t + ' ';
         } else {
             result += parseMath(child) + ' '; 
         }
    }
    
    // Post-process to rejoin functions
    result = result.replace(/s\s+i\s+n/g, 'sin')
                   .replace(/c\s+o\s+s/g, 'cos')
                   .replace(/t\s+a\s+n/g, 'tan')
                   .replace(/c\s+o\s+t/g, 'cot')
                   .replace(/s\s+e\s+c/g, 'sec')
                   .replace(/c\s+s\s+c/g, 'csc')
                   .replace(/s\s+i\s+n\s+h/g, 'sinh')
                   .replace(/c\s+o\s+s\s+h/g, 'cosh')
                   .replace(/a\s+r\s+c\s+s\s+i\s+n/g, 'arcsin')
                   .replace(/a\s+r\s+c\s+c\s+o\s+s/g, 'arccos')
                   .replace(/a\s+r\s+c\s+t\s+a\s+n/g, 'arctan')
                   .replace(/l\s+n/g, 'ln')
                   .replace(/l\s+o\s+g/g, 'log')
                   .replace(/l\s+g/g, 'lg')
                   .replace(/l\s+i\s+m/g, 'lim')
                   .replace(/m\s+a\s+x/g, 'max')
                   .replace(/m\s+i\s+n/g, 'min');

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
