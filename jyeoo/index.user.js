// ==UserScript==
// @name         Typst Converter
// @namespace    http://tampermonkey.net/
// @version      2026-01-04
// @description  Convert Jyeoo Questions to Typst
// @author       derjoker
// @match        https://www.jyeoo.com/math*/paper/detail/*
// @match        https://www.jyeoo.com/math*/report/detail/*
// @require      https://unpkg.com/fflate@0.8.2/umd/index.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// @icon         https://www.jyeoo.com/api/photo/62956866
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
    'use strict';

    // UI Integration: Sidebar Button
    // Structure based on div.qrcode-side
    /*
    <div class="qrcode-side" style="bottom: 100px; cursor: pointer;">
        <div class="show-paper prelative">
            <i class="p-new-icon p-new-icon-01 p-new-icon-01-01"></i>
            <p class="c999">To Typst</p>
        </div>
    </div>
    */

    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'qrcode-side';

    // Position above 'Share' (分享)
    // Default fallback
    let bottomPos = 245;
    const shareBtn = Array.from(document.querySelectorAll('.qrcode-side')).find(el => el.innerText.includes('分享'));
    if (shareBtn) {
        const shareBottom = parseInt(shareBtn.style.bottom || '173', 10);
        if (!isNaN(shareBottom)) {
            bottomPos = shareBottom + 70; // Add height + margin (approx 70px)
        }
    }
    btnWrapper.style.bottom = bottomPos + 'px';

    btnWrapper.style.cursor = 'pointer';
    btnWrapper.id = 'export-typst-wrapper';

    const inner = document.createElement('div');
    inner.className = 'show-paper prelative';
    inner.style.textAlign = 'center';
    inner.style.padding = '5px 0 2px 0'; // Reduced bottom padding
    inner.style.backgroundColor = '#fff';
    inner.style.borderRadius = '4px';
    inner.style.width = '100%';           // Use full width of parent
    inner.style.margin = '0 auto';
    // inner.style.width = '60px';        // Removed fixed width

    const icon = document.createElement('i');
    icon.className = 'icon i-download';
    icon.style.display = 'block';
    icon.style.margin = '5px auto 0'; // Center and add top margin
    // icon.style.fontSize = '28px';  // Ineffective for sprites
    icon.style.transform = 'scale(1.25)';
    icon.style.transformOrigin = 'center center';
    // If it's a sprite, this font-size might affect spacing but not image. 
    // We assume 'icon' class sets inline-block. We force block.

    const text = document.createElement('p');
    text.className = 'c999';
    text.innerText = 'Typst';
    text.style.margin = '12px 0 0 0';
    text.style.fontSize = '12px';
    text.style.lineHeight = '1.2';
    // Fix overflow: enforce width and wrapping
    text.style.width = '100%';
    text.style.boxSizing = 'border-box';
    text.style.padding = '0';
    text.style.whiteSpace = 'pre-wrap'; // Allow wrapping
    text.style.wordBreak = 'break-word'; // Break words if needed
    text.style.overflow = 'hidden';      // Clip just in case

    inner.appendChild(icon);
    inner.appendChild(text);
    btnWrapper.appendChild(inner);

    btnWrapper.onclick = convertPage;
    document.body.appendChild(btnWrapper);

    // Reference for progress updates - we will update the TEXT element
    const btn = text;
    // Note: The click handler is on the wrapper, but the progress logic updates `btn.innerText`.
    // So 'btn' variable now points to the text paragraph.

    // Global state for images in current conversion
    let imagesToDownload = new Map(); // url -> filename

    async function convertPage() {
        // UI Feedback
        // btn is now the <p> text element. btnWrapper is the container.
        const originalText = btn.innerText;
        btn.innerText = 'Init...';

        // Disable interaction
        btnWrapper.style.pointerEvents = 'none';
        btnWrapper.style.opacity = '0.6';

        try {
            // Questions extraction logic based on sections
            const headers = document.querySelectorAll('h3.ques-type');
            const totalQuestions = document.querySelectorAll('fieldset.quesborder').length;
            let processedCount = 0;

            let typstContent = '';
            imagesToDownload.clear();

            // Header
            typstContent += `#import "/conf/exam.typ": \*\n`;
            typstContent += `#show: exam-rules\n`;

            const titleEl = document.querySelector('h1.paper-title');
            const title = titleEl ? titleEl.innerText.trim() : 'Exported Questions';
            typstContent += `#title[${preprocessText(title)}]\n\n`;

            if (headers.length > 0) {
                // Section-based extraction
                for (const header of headers) {
                    let sectionTitle = header.innerText.trim();
                    sectionTitle = sectionTitle.replace(/^[\d一二三四五六七八九十]+\s*[、．.]\s*/, '');
                    sectionTitle = sectionTitle.replace(/\s*[（\(].*?共.*?题.*?[）\)]$/, '');
                    typstContent += `= ${preprocessText(sectionTitle)}\n\n`;

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
                        btn.innerText = `${processedCount}/${totalQuestions}`; // Shortened status
                        return res;
                    });
                    const results = await Promise.all(questionPromises);
                    results.forEach(r => typstContent += r);
                }
            } else {
                // Fallback: No sections, just all questions
                const questions = document.querySelectorAll('fieldset.quesborder');
                const questionPromises = Array.from(questions).map(async q => {
                    const res = await convertQuestion(q);
                    processedCount++;
                    btn.innerText = `${processedCount}/${totalQuestions}`; // Shortened status
                    return res;
                });
                const results = await Promise.all(questionPromises);
                results.forEach(r => typstContent += r);
            }

            console.log(`Conversion done. Found ${imagesToDownload.size} images. Downloading...`);

            const zipData = {};
            zipData[title + ".typ"] = fflate.strToU8(typstContent);

            // Create images folder object
            const imagesFolder = {};

            if (imagesToDownload.size > 0) {
                btn.innerText = `Img 0/${imagesToDownload.size}`;
                let imgCount = 0;

                // Download images
                const imagePromises = Array.from(imagesToDownload.entries()).map(([url, filename]) => {
                    return new Promise((resolve, reject) => {
                        GM_xmlhttpRequest({
                            method: "GET",
                            url: url,
                            responseType: "arraybuffer", // Important: ArrayBuffer for fflate
                            onload: function (response) {
                                imgCount++;
                                btn.innerText = `Img ${imgCount}/${imagesToDownload.size}`;
                                if (response.status === 200) {
                                    // Add to imagesFolder
                                    const uint8Array = new Uint8Array(response.response);
                                    imagesFolder[filename] = uint8Array;
                                    resolve();
                                } else {
                                    console.error("Failed to download image:", url);
                                    resolve(); // Resolve anyway to continue
                                }
                            },
                            onerror: function (err) {
                                imgCount++;
                                console.error("Error downloading image:", url, err);
                                resolve();
                            }
                        });
                    });
                });

                await Promise.all(imagePromises);

                if (Object.keys(imagesFolder).length > 0) {
                    zipData["images"] = imagesFolder;
                }
            }

            console.log("All images downloaded. Zipping...");
            btn.innerText = 'Zipping...';

            await new Promise(r => setTimeout(r, 100)); // Yield to UI

            // Synchronous Zip Generation
            const zipped = fflate.zipSync(zipData);

            // Save
            const blob = new Blob([zipped], { type: "application/zip" });
            saveAs(blob, title + ".zip");

        } catch (e) {
            console.error("Error generating zip:", e);
            alert("Error generating zip: " + e.message);
        } finally {
            btn.innerText = originalText;
            btnWrapper.style.pointerEvents = 'auto'; // Re-enable interaction
            btnWrapper.style.opacity = '1';
        }
    }

    async function convertQuestion(fieldset) {
        let content = '';

        // Extract solution URL early
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

            content += processLayout(clone, (t) => t.replace(/^\s*(?:(?:\$\s*)?\d+(?:\s*\$)?)\s*[．.、,]\s*/, '').trim());
        }

        // 2. Options (.pt2)
        const pt2 = fieldset.querySelector('.pt2');
        if (pt2) {
            const options = [];
            const labels = pt2.querySelectorAll('.selectoption label');
            labels.forEach(label => {
                let optText = parseContent(label);
                optText = optText.replace(/^\s*(?:(?:\$\s*)?[A-D](?:\s*\$)?)\s*[．.、,]\s*/, '').trim();
                // Redundant parens check
                if (/^\$\s*\(/.test(optText) && /\)\s*\$$/.test(optText)) {
                    const inner = optText.replace(/^\$\s*\(\s*/, '').replace(/\s*\)\s*\$/, '');
                    if (isBalanced(inner) && !hasTopLevelComma(inner)) {
                        optText = '$' + inner.trim() + '$';
                    }
                }
                options.push(`[${optText}]`);
            });

            function isBalanced(str) {
                let depth = 0;
                for (const char of str) {
                    if (char === '(' || char === '（' || char === '[' || char === '{') depth++;
                    else if (char === ')' || char === '）' || char === ']' || char === '}') depth--;
                    if (depth < 0) return false;
                }
                return depth === 0;
            }

            function hasTopLevelComma(str) {
                let depth = 0;
                for (const char of str) {
                    if (char === '(' || char === '（' || char === '[' || char === '{') depth++;
                    else if (char === ')' || char === '）' || char === ']' || char === '}') depth--;
                    else if ((char === ',' || char === '，') && depth === 0) return true;
                }
                return false;
            }

            if (options.length > 0) {
                const totalLength = options.reduce((sum, opt) => sum + opt.length, 0);
                let colNum = 4;
                if (totalLength > 60) colNum = 1;
                else if (totalLength > 30) colNum = 2;

                content += `\n#choices(\n  (${options.join(', ')}),\n  colNum: ${colNum}\n)`;
            }
        }

        // 3. Solution / Analysis
        if (solutionUrl) {
            try {
                const solutionContent = await fetchQuestionDetail(solutionUrl);
                if (solutionContent) {
                    content += `\n\n#solution[\n${solutionContent}\n]`;
                }
            } catch (e) {
                console.error("Failed to fetch solution:", solutionUrl, e);
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

    function fetchQuestionDetail(url) {
        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: function (response) {
                    if (response.status === 200) {
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = response.responseText;

                        // Look for .pt6 (Analysis content)
                        const pt6 = tempDiv.querySelector('.pt6');
                        if (pt6) {
                            resolve(processLayout(pt6, (t) => {
                                // Pattern: [解答] or 【解答】 or $[$ 解答 $]$ followed by optional "解:"
                                t = t.replace(/^(\s*(?:#align\(.*?\))?[\s\n]*#image\(.*?\)\s*)?[\s\n]*(?:(?:\$\[\$|\[|【).*?(?:\$\]\$|\]|】))[\s\n]*(?:解[:：])?[\s\n]*/, '$1');

                                // Fix case like (1)$ 解: where $ is left over
                                t = t.replace(/(\(\d+\))\$\s*解[:：]/g, '$1 解:');
                                // Fix case like $(2) 解: where $ is at the start (handle optional space after $)
                                t = t.replace(/^\s*\$\s*(\(\d+\))\s*解[:：]/g, '$1 解:');
                                // Fix case where $ is before numbering
                                t = t.replace(/\$\s*(\(\d+\))\s*解[:：]/g, '$1 解:');

                                // Safety: Remove "" artifacts (consolidate to single quote)
                                t = t.replace(/""/g, '"');

                                // Safety: Deduplicate numbering (1)(1) -> (1)
                                t = t.replace(/(\(\d+\))\1/g, '$1');

                                return t.replace(/^(\s*(?:#align\(.*?\))?[\s\n]*#image\(.*?\)\s*)?[\s\n]*解[:：][\s\n]*/, '$1');
                            }));
                        } else {
                            resolve(null);
                        }
                    } else {
                        resolve(null);
                    }
                },
                onerror: function () {
                    resolve(null);
                }
            });
        });
    }

    function parseContent(element) {
        const clone = element.cloneNode(true);
        return renderSegments(traverse(clone, []));
    }

    function traverse(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            return segmentizeText(node.textContent);
        }

        if (node.nodeType !== Node.ELEMENT_NODE) return [];

        if (node.style.display === 'none') return [];

        // MathJye
        if (node.classList.contains('MathJye') || node.getAttribute('mathtag') === 'math') {
            let mathContent = parseMath(node);
            // User request: Treat as a whole, add spaces before and after.
            if (mathContent.includes('/') || mathContent.includes('^') || mathContent.length > 3) {
                const trimmed = mathContent.trim();

                // Fix: Do not wrap equations/relations (contains =, <, >, approx)
                if (/[=<>≈]/.test(trimmed)) {
                    return [{ text: ' ' + mathContent + ' ', isMath: true }];
                }

                // Fix: Do not wrap single terms even if they have ^ (e.g. x^2, x_1^2, sin^2 x)
                // If it has NO '/', NO '+', NO '-', it's likely a single term/product.
                if (!/[+\-\/]/.test(trimmed)) {
                    return [{ text: ' ' + mathContent + ' ', isMath: true }];
                }

                // Fix: Do not wrap sets { ... } or already parenthesized ( ... )
                // Fix: Do not wrap sets { ... } or already parenthesized ( ... )
                // Avoid using startsWith/endsWith due to Jyeoo's poisoned prototype
                if ((trimmed.length > 0 && trimmed[0] === '(' && trimmed[trimmed.length - 1] === ')') ||
                    (trimmed.length > 0 && trimmed[0] === '{' && trimmed[trimmed.length - 1] === '}') ||
                    mathContent.includes(',')) {
                    return [{ text: ' ' + mathContent + ' ', isMath: true }];
                }

                // Fix: Check for safe context (preceded by Chinese, =, comma, colon, etc.)
                // If safe, we can allow fractions like "-17/8" without wrapping.
                // We need to look at previousSibling.
                let isSafeContext = false;
                let prev = node.previousSibling;
                // Skip empty text nodes
                while (prev && prev.nodeType === 3 && !prev.textContent.trim()) {
                    prev = prev.previousSibling;
                }
                if (!prev) {
                    isSafeContext = true; // Start of block
                } else if (prev.nodeType === 3) { // Text node
                    const text = prev.textContent.trim();
                    if (text.length > 0) {
                        const lastChar = text[text.length - 1];
                        // Chinese, =, :, ,, (, [, {
                        if (/[\u4e00-\u9fa5=,：，:(\[{]/.test(lastChar)) {
                            isSafeContext = true;
                        }
                    }
                } else if (prev.nodeType === 1) {
                    // If previous is an element (like br), maybe safe?
                    if (prev.tagName === 'BR') isSafeContext = true;
                }

                if (isSafeContext) {
                    return [{ text: ' ' + mathContent + ' ', isMath: true }];
                }
                // Check if it's a function call like sqrt(...) or sin(...)
                // Simple check: starts with letters, followed by (, ends with )
                if (/^[a-zA-Z]+\s*\(/.test(trimmed) && trimmed.length > 0 && trimmed[trimmed.length - 1] === ')') {
                    return [{ text: ' ' + mathContent + ' ', isMath: true }];
                }
                // Check external context
                if (node.previousSibling && node.previousSibling.textContent) {
                    const prevText = node.previousSibling.textContent.trim();
                    const pLen = prevText.length;
                    if (pLen > 0) {
                        const lastChar = prevText[pLen - 1];
                        if (lastChar === '(' || lastChar === '（' || lastChar === ',' || lastChar === '，') {
                            return [{ text: ' ' + mathContent + ' ', isMath: true }];
                        }
                    }
                }
                return [{ text: ` (${mathContent}) `, isMath: true }];
            }
            return [{ text: ' ' + mathContent + ' ', isMath: true }];
        }

        // Images
        if (node.tagName === 'IMG') {
            const src = node.src;
            if (src && !src.includes('icon') && !src.includes('button')) {
                let filename = src.substring(src.lastIndexOf('/') + 1);
                filename = filename.split('?')[0];
                if (!filename.includes('.')) filename += '.png';
                imagesToDownload.set(src, filename);

                return [{ text: ` #image("images/${filename}", width: 25%) `, isMath: false }];
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
            const innerContent = renderSegmentsRaw(segments);
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

        if (node.classList && node.classList.contains('quizPutTag')) {
            return [{ text: ' #blank ', isMath: false }];
        }
        if (node.classList && node.classList.contains('sanwser')) {
            return [];
        }

        // Block elements
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

        // 2. Protect patterns like (   ), ______, (5 分), and numbering (1) at start
        // Use PUA codes to protect. E000 range.
        const mapping = new Map();
        let puaCode = 0xE000;

        // Groups:
        // 1. (\(\s+\)) -> Empty parens
        // 2. (__+)     -> Underscores (at least 2)
        // 3. (\(\s*\d+\s*分\s*\)) -> Score (e.g. (5 分))
        // 4. ((?:^|[\n\r])\s*\(\s*\d+\s*\)) -> Numbering at start of line/text (e.g. (1))
        text = text.replace(/(\(\s+\))|(__+)|(\(\s*\d+\s*分\s*\))|((?:^|[\n\r])\s*\(\s*\d+\s*\))/g, (match) => {
            const char = String.fromCharCode(puaCode++);
            mapping.set(char, match);
            return char;
        });

        // 3. Regex for math-like text
        // Includes: Alphanumeric, Greek, Operators, Parens/Brackets, Dot, Comma, etc.
        // Explicitly add common math symbols.
        // ALSO include PUA range for protected patterns so they are split out.
        const mathRegex = /([a-zA-Z0-9\+\-\=\<\>\/\%\.\,\:\;\u0370-\u03FF\(\)\[\]\{\}\|\^\*\~\⋅\uE000-\uF8FF\u00B0\u00D7\u00F7\u2190-\u21FF\u25B3]+)/;

        // 3. Regex for math-like text
        // Exclude .,:; from the main block so we can check context
        // Capturing groups: 1=PUA, 2=DefiniteMath, 3=Punctuation(.,:;)
        // Added \u2200-\u22FF (Math Operators: infinity, union, element of, etc.)
        // Added \u00B0(°), \u00D7(×), \u00F7(÷), \u2190-\u21FF(Arrows), \u25B3(△)
        const tokenRegex = /([\uE000-\uF8FF])|([a-zA-Z0-9\+\-\=\<\>\/\%\(\)\[\]\{\}\|\^\*\~\⋅\'\_\u0370-\u03FF\u2200-\u22FF\u00B0\u00B1\u00D7\u00F7\u2190-\u21FF\u25B3]+)|([\.\,\:\;])/g;

        let lastIndex = 0;
        let match;
        const segments = [];
        let bracketDepth = 0; // Track depth for context-aware punctuation

        while ((match = tokenRegex.exec(text)) !== null) {
            // Text before match?
            if (match.index > lastIndex) {
                const txt = text.slice(lastIndex, match.index);
                segments.push({ text: preprocessText(txt), isMath: false });
            }

            if (match[1]) {
                // PUA (Protected)
                const original = mapping.get(match[1]);

                // Check for empty parens explicitly
                if (/^\(\s+\)$/.test(original)) {
                    segments.push({ text: ' #parentheses ', isMath: false });
                } else if (/^_+$/.test(original)) {
                    segments.push({ text: ' #blank ', isMath: false });
                } else {
                    // Protected content (Score or Numbering), return as-is text with a trailing space
                    segments.push({ text: original + ' ', isMath: false });
                }
            } else if (match[2]) {
                // Definite Math
                const m = match[2];

                // Fix: Treat simple numbering like (1), (2) as text, not math.
                // This prevents $(1)$ artifacts in numbering.
                if (/^\(\d+\)$/.test(m) || /^（\d+）$/.test(m)) {
                    segments.push({ text: m, isMath: false });
                    lastIndex = tokenRegex.lastIndex; // Update lastIndex before continue!
                    continue;
                }

                // Update bracket depth
                for (const char of m) {
                    if ('([{'.includes(char)) bracketDepth++;
                    else if (')]}'.includes(char)) bracketDepth = Math.max(0, bracketDepth - 1);
                }

                if (m.indexOf('http') === 0 || m.indexOf('//') === 0 || m.indexOf('www') === 0) {
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
            segments.push({ text: preprocessText(text.slice(lastIndex)), isMath: false });
        }

        return segments;
    }

    function preprocessText(text) {
        if (!text) return '';
        text = text.replace(/，/g, ', ')
            .replace(/。|．/g, '. ')
            .replace(/：/g, ': ')
            .replace(/；/g, '; ')
            .replace(/（/g, '(')
            .replace(/）/g, ')')
            .replace(/【/g, '[')
            .replace(/】/g, ']')
            .replace(/[“”]/g, '"')
            .replace(/[‘’′]/g, "'")
            .replace(/、/g, ', ')
            .replace(/？/g, '?')
            .replace(/！/g, '!')
            .replace(/＞/g, '>')
            .replace(/＜/g, '<')
            .replace(/⇒/g, ' => ')
            .replace(/•/g, '⋅');

        // Final normalization (spacing)
        text = text.replace(/\s+/g, ' ');

        return text;
    }

    function processLayout(element, textCleaner) {
        const clone = element.cloneNode(true);
        const floatingImg = Array.from(clone.children).find(child =>
            child.tagName === 'IMG' &&
            (child.style.float === 'right' || child.style.float === 'left')
        );

        if (floatingImg) {
            const floatDir = floatingImg.style.float;
            const src = floatingImg.src;

            if (src && !src.includes('icon') && !src.includes('button')) {
                let filename = src.substring(src.lastIndexOf('/') + 1);
                filename = filename.split('?')[0];
                if (!filename.includes('.')) filename += '.png';

                imagesToDownload.set(src, filename);

                floatingImg.remove();

                let text = renderSegments(traverse(clone));
                if (textCleaner) text = textCleaner(text);

                const imgTypst = `#align(center + top, image("images/${filename}", width: 100%))`;

                if (floatDir === 'right') {
                    return `#grid(columns: (1fr, 25%), gutter: 1em, [${text}], [${imgTypst}])`;
                } else {
                    return `#grid(columns: (25%, 1fr), gutter: 1em, [${imgTypst}], [${text}])`;
                }
            } else {
                floatingImg.remove();
                let text = renderSegments(traverse(clone));
                if (textCleaner) text = textCleaner(text);
                return text.trim();
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
                result += ` $${currentMath.trim()}$ `;
                currentMath = '';
            }
        };

        for (let i = 0; i < segments.length; i++) {
            const seg = segments[i];

            if (seg.isMath) {
                currentMath += seg.text;
            } else {
                if (/^\s+$/.test(seg.text)) {
                    let nextIsMath = false;
                    for (let j = i + 1; j < segments.length; j++) {
                        if (segments[j].text) {
                            if (segments[j].isMath) nextIsMath = true;
                            break;
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
        result = result.replace(/ +/g, ' ');
        return fixQuoteSpacing(result);
    }

    function fixQuoteSpacing(text) {
        if (!text) return text;

        // Use split-based parity to distinguish Open vs Close quotes
        const parts = text.split('"');
        let result = parts[0];

        for (let i = 1; i < parts.length; i++) {
            let seg = parts[i];

            if (i % 2 !== 0) {
                // Odd index -> Just passed an OPEN quote. (Current seg is INSIDE)

                // 1. Spacing for Outside -> Open Quote
                // If the text before (result) ends with Chinese, add space.
                if (/[\u4e00-\u9fa5]$/.test(result)) {
                    result += ' ';
                }

                result += '"'; // Append Open Quote

                // 2. Spacing for Open Quote -> Inside
                // Trim leading space of inside content (User wants "$..." not " $...")
                result += seg.trimStart();

            } else {
                // Even index -> Just passed a CLOSE quote. (Current seg is OUTSIDE)

                // 3. Spacing for Inside -> Close Quote
                // Trim trailing space of inside content (which is currently at end of result)
                result = result.trimEnd();

                result += '"'; // Append Close Quote

                // 4. Spacing for Close Quote -> Outside
                // If the text after (seg) starts with Chinese, add space.
                if (/^[\u4e00-\u9fa5]/.test(seg)) {
                    result += ' ';
                }

                result += seg;
            }
        }
        return result;
    }

    function renderSegmentsRaw(segments) {
        return segments.map(s => {
            if (s.isMath) return s.text;

            // If text contains non-math chars (like Chinese), quote it
            if (/[\u4e00-\u9fa5]/.test(s.text)) {
                return `"${s.text}"`;
            }

            if (!s.text.trim()) return s.text;

            // Quote non-empty text, stripping existing quotes to avoid double quoting
            let cleanText = s.text.replace(/["“”]/g, '');
            if (!cleanText.trim()) return '';

            // Always quote Chinese or if it was originally quoted
            return `"${cleanText}"`;
        }).join(' ');
    }



    function processMathText(text) {
        if (!text) return '';
        // preprocess if not already done (safe to repeat)
        text = preprocessText(text);

        text = text.replace(/([A-Z])(?=[A-Z])/g, '$1 ');
        text = text.replace(/([a-z])(?=[A-Z])/g, '$1 ');
        text = text.replace(/([a-z])(?=[a-z])/g, '$1 ');
        text = text.replace(/([A-Z])(?=[a-z])/g, '$1 ');

        text = text.replace(/([0-9])(?=[a-zA-Z])/g, '$1 ');
        text = text.replace(/([a-zA-Z])(?=[0-9])/g, '$1 ');

        text = text.replace(/a\s+r\s+c\s+s\s+i\s+n/g, 'arcsin')
            .replace(/a\s+r\s+c\s+c\s+o\s+s/g, 'arccos')
            .replace(/a\s+r\s+c\s+t\s+a\s+n/g, 'arctan')
            .replace(/s\s+i\s+n\s+h/g, 'sinh')
            .replace(/c\s+o\s+s\s+h/g, 'cosh')
            .replace(/t\s+a\s+n\s+h/g, 'tanh')
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

        const map = {
            '∵': 'because', '∴': 'therefore', '×': 'times', '⋅': 'dot.op', '÷': 'div',
            '±': 'plus.minus', '∓': 'minus.plus',
            '≥': '>=', '≤': '<=', '≠': '!=', '≈': 'approx',
            '⊥': 'tack.t', '∥': 'parallel', '△': 'triangle', '∠': 'angle',
            '°': 'degree', 'π': 'pi', 'α': 'alpha', 'β': 'beta', 'γ': 'gamma', 'θ': 'theta',
            'λ': 'lambda', 'μ': 'mu', 'ρ': 'rho', 'σ': 'sigma',
            'ω': 'omega', 'φ': 'phi', '→': 'arrow',
            '∞': 'infinity', '∪': 'union', '∩': 'inter',
            '∈': 'in', '∉': 'in.not', '⊆': 'subset.eq', '⊂': 'subset', '∅': 'emptyset',
            '∀': 'forall', '∃': 'exists'
        };

        // Context-aware Delta mapping
        // If Δ is followed by 3 uppercase letters (vertices), it's a triangle.
        // Note: Letters are already spaced by previous rules (e.g. "A B C")
        // Regex looks for Δ followed by optional spaces and 3 letters.
        text = text.replace(/Δ(?=\s*[A-Z]\s*[A-Z]\s*[A-Z])/g, ' triangle ');

        // Default remaining Δ to Delta
        text = text.replace(/Δ/g, ' Delta ');

        for (const [key, val] of Object.entries(map)) {
            text = text.replaceAll(key, ` ${val} `);
        }

        return text;
    }

    function parseMath(node) {
        if (node.classList && node.classList.contains('stretchVBox')) {
            if (node.querySelector('.brace')) {
                const rootTable = node.querySelector('table');
                if (rootTable) {
                    const getFlatRows = (element) => {
                        let collected = [];
                        if (element.tagName === 'TABLE') {
                            Array.from(element.rows).forEach(row => {
                                collected = collected.concat(getFlatRows(row));
                            });
                        } else if (element.tagName === 'TR') {
                            const innerTable = element.querySelector('table');
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
                        if (lineMath.slice(-4) === 'quad') lineMath = lineMath.substring(0, lineMath.length - 4);
                        if (lineMath.slice(-3) === '","') lineMath = lineMath.substring(0, lineMath.length - 3);
                        if (lineMath.length > 0 && lineMath[lineMath.length - 1] === ',') lineMath = lineMath.substring(0, lineMath.length - 1);

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
            let num, den;
            for (let child of node.children) {
                if (child.classList.contains('fracZi')) num = child;
                if (child.classList.contains('fracMu')) den = child;
            }
            const nVal = num ? parseMath(num) : '';
            const dVal = den ? parseMath(den) : '';
            return `(${nVal})/(${dVal})`;
        }

        if (node.classList && (node.classList.contains('msubsup') || node.classList.contains('msub') || node.classList.contains('msup'))) {
            let base = '', sub = '', sup = '';
            for (let child of node.children) {
                if (child.classList.contains('msubsupCont')) base = parseMath(child);
                if (child.classList.contains('msub')) sub = parseMath(child);
                if (child.classList.contains('msup')) sup = parseMath(child);
            }
            if (base || sub || sup) {
                return `${base}${sub ? `_(${sub})` : ''}${sup ? `^(${sup})` : ''}`;
            }
        }

        if (node.classList && node.classList.contains('msqrt')) {
            let box;
            for (let child of node.children) {
                if (child.classList.contains('msqrtBox')) {
                    box = child;
                    break;
                }
            }
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

        let result = '';
        for (let child of node.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
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
})();
