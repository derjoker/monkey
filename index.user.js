// ==UserScript==
// @name         Typst Converter
// @namespace    http://tampermonkey.net/
// @version      2026-01-04
// @description  Convert Jyeoo Questions to Typst
// @author       derjoker
// @match        https://www.jyeoo.com/math2/paper/detail/*
// @match        https://www.jyeoo.com/math2/report/detail/*
// @require      https://unpkg.com/fflate@0.8.2/umd/index.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // UI Integration
    const btn = document.createElement('button');
    btn.innerText = 'To Typst (Zip)';
    btn.id = 'export-typst-btn';
    btn.style.position = 'fixed';
    btn.style.bottom = '20px'; // Changed from top: 10px
    btn.style.right = '20px';  // Changed from right: 10px
    btn.style.zIndex = '9999';
    btn.style.padding = '10px 20px';
    btn.style.backgroundColor = '#2c3e50'; // Dark blue instead of bright blue
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.borderRadius = '5px';
    btn.style.cursor = 'pointer';
    btn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.onclick = convertPage;
    document.body.appendChild(btn);

    // Global state for images in current conversion
    let imagesToDownload = new Map(); // url -> filename

    async function convertPage() {
        const questions = document.querySelectorAll('fieldset.quesborder');
        let typstContent = '';
        imagesToDownload.clear();
        
        // Header
        typstContent += `#import "/conf.typ": \*\n`;
        typstContent += `#show: conf-rules\n`;
        
        const titleEl = document.querySelector('h1.paper-title');
        const title = titleEl ? titleEl.innerText.trim() : 'Exported Questions';
        typstContent += `#title[${title}]\n\n`;

        questions.forEach(q => {
            typstContent += convertQuestion(q);
        });

        if (typeof fflate === 'undefined') {
            alert("Error: fflate library not loaded!");
            console.error("fflate is undefined");
            return;
        }

        console.log(`Conversion done. Found ${imagesToDownload.size} images. Downloading...`);
        
        try {
            const zipData = {};
            zipData[title + ".typ"] = fflate.strToU8(typstContent);

            // Download images
            const imagePromises = Array.from(imagesToDownload.entries()).map(([url, filename]) => {
                return new Promise((resolve, reject) => {
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: url,
                        responseType: "arraybuffer", // Important: ArrayBuffer for fflate
                        onload: function(response) {
                            if (response.status === 200) {
                                // Add to zipData under images/ folder
                                const uint8Array = new Uint8Array(response.response);
                                zipData["images/" + filename] = uint8Array;
                                resolve();
                            } else {
                                console.error("Failed to download image:", url);
                                resolve(); // Resolve anyway to continue
                            }
                        },
                        onerror: function(err) {
                            console.error("Error downloading image:", url, err);
                            resolve();
                        }
                    });
                });
            });

            await Promise.all(imagePromises);

            console.log("All images downloaded. Zipping...");
            
            // Synchronous Zip Generation
            const zipped = fflate.zipSync(zipData);
            
            // Save
            const blob = new Blob([zipped], {type: "application/zip"});
            saveAs(blob, title + ".zip");
            alert("Download started!");
            
        } catch (e) {
            console.error("Error generating zip:", e);
            alert("Error generating zip: " + e.message);
        }
    }

    function convertQuestion(fieldset) {
        let content = '';
        let questionImages = []; // Store images found in this question
        
        // 1. Question Text (.pt1)
        const pt1 = fieldset.querySelector('.pt1');
        if (pt1) {
            // Clone and remove sequence number (.qseq) to avoid regex guessing
            const clone = pt1.cloneNode(true);
            const qseq = clone.querySelector('.qseq');
            if (qseq) qseq.remove();
            
            let text = traverse(clone, questionImages);
            // Fallback regex in case qseq wasn't there but numbering exists in text
            text = text.replace(/^\s*\d+[．.、]\s*/, '');
            content += text.trim();
        }

        // 2. Options (.pt2)
        const pt2 = fieldset.querySelector('.pt2');
        if (pt2) {
            const options = [];
            const labels = pt2.querySelectorAll('.selectoption label');
            labels.forEach(label => {
                // Extract label (A., B., etc) and content
                let optText = parseContent(label); // Options usually don't have main images, but if so, traverse handles them?
                // Note: parseContent calls traverse(clone). We need to fix parseContent signature too if we want to support images in options.
                // But typically options just have text/math. Let's keep parseContent simple or update it.
                // Enhanced regex for options: A., A．, A、
                optText = optText.replace(/^[A-D][．.、]\s*/, '').trim();
                options.push(`[${optText}]`);
            });

            if (options.length > 0) {
                // Heuristic for columns
                const totalLength = options.reduce((sum, opt) => sum + opt.length, 0);
                let colNum = 4;
                if (totalLength > 60) colNum = 1;
                else if (totalLength > 30) colNum = 2;
                
                content += `\n#choices(\n  (${options.join(', ')}),\n  colNum: ${colNum}\n)`;
            }
        }
        
        // Append images at the bottom
        if (questionImages.length > 0) {
            content += '\n' + questionImages.join('\n');
        }

        // Wrap in #example
        return `#example[\n${content}\n#answer-block(10em)\n]\n\n`;
    }

    function parseContent(element) {
        // Clone to avoid modifying DOM
        const clone = element.cloneNode(true);
        return traverse(clone, []); // Pass empty array if we don't care, or handle option images later
    }

    function traverse(node, imageList) {
        if (node.nodeType === Node.TEXT_NODE) {
            // Main text: normalize AND escape
            let text = node.textContent;
            text = text.replace(/([#$\[\]])/g, '\\$1'); // Escape Typst special chars
            return normalizeText(text);
        }
        
        if (node.nodeType !== Node.ELEMENT_NODE) return '';

        // Handle specific elements
        
        // Hidden elements
        if (node.style.display === 'none') return '';

        // MathJye
        if (node.classList.contains('MathJye') || node.getAttribute('mathtag') === 'math') {
            return ` $${parseMath(node)}$ `; // Add spaces for safety
        }

        // Images
        if (node.tagName === 'IMG') {
            const src = node.src;
            if (src && !src.includes('icon') && !src.includes('button')) { // Ignore icons
                 // Generate local filename
                 let filename = src.substring(src.lastIndexOf('/') + 1);
                 // Cleanup filename (remove query params)
                 filename = filename.split('?')[0];
                 // Ensure extension
                 if (!filename.includes('.')) filename += '.png';
                 
                 // Add to map
                 imagesToDownload.set(src, filename);
                 
                 // Add code to list instead of returning it directly
                 if (imageList) {
                     imageList.push(`#image("images/${filename}", width: 25%)`);
                 }
                 return ''; // Return empty string so it doesn't appear in text flow
            }
            return '';
        }

        // Line breaks
        if (node.tagName === 'BR' || node.tagName === 'DIV' || node.tagName === 'P') {
            let res = '';
            for (let child of node.childNodes) {
                res += traverse(child, imageList);
            }
            if (node.tagName !== 'SPAN') res += '\n'; // Add newline for block elements
            return res;
        }

        // Default recursion
        let result = '';
        for (let child of node.childNodes) {
            result += traverse(child, imageList);
        }
        return result;
    }

    function normalizeText(text) {
        if (!text) return '';
        
        // 1. Punctuation
        text = text.replace(/，/g, ', ')
                   .replace(/。/g, '. ')
                   .replace(/：/g, ': ')
                   .replace(/；/g, '; ')
                   .replace(/（/g, ' (')
                   .replace(/）/g, ') ')
                   .replace(/？/g, '?')
                   .replace(/！/g, '!')
                   .replace(/＞/g, '\\>') // Escape for Typst text
                   .replace(/＜/g, '\\<'); // Escape for Typst text
        
        // 2. Blanks (_____)
        text = text.replace(/_+/g, ' #blank ');
        
        // Handle • (bullet) which might be dot product or separator
        // If between numbers/vars, likely product.
        text = text.replace(/•/g, ' $dot$ ');
        
        // 3. Parentheses for choices () -> #parentheses
        text = text.replace(/\( +\)/g, ' #parentheses ');
        text = text.replace(/\(\s*\)/g, ' #parentheses ');
        
        // 4. Escape Typst special characters in text mode
        // Escape #, $, [, ]
        // Note: We do this AFTER #blank and #parentheses so we don't escape those hashes
        // But wait, replaceAll will replace the ones we just added?
        // Strategy: Use a temporary placeholder for our macros or negative lookbehind?
        // Easier: Escape content chars FIRST, but we haven't processed blanks yet.
        // Actually, Jyeoo text shouldn't have # usually. 
        // But [ and ] are common in intervals. $ is rare in text but possible (money).
        
        // Let's escape text special chars first, THEN add our macros.
        // Re-ordering...
        
        return text.replace(/\s+/g, ' '); // Clean spaces first
    }

    // Helper to safely process text before adding macros
    function safeText(text) {
         if (!text) return '';
         // Escape Typst syntax chars: #, $, [, ]
         text = text.replace(/([#$\[\]])/g, '\\$1');
         return normalizeText(text); // Apply punctuation/macro logic which might re-add #
    }
    
    // We need to redefine traverse to use safeText for text nodes
    // NOT normalizeText directly
    
    // ... wait, I cannot easily redefine traverse here without changing the whole function structure.
    // Let's just modify normalizeText to be smart.
    
    // Revised normalizeText
    /*
    function normalizeText(text) {
        if (!text) return '';
        
        // Escape existing special chars
        text = text.replace(/([#$\[\]])/g, '\\$1');
        
        // Restore specific macros if I added them? No, Jyeoo text doesn't have #blank.
        // Jyeoo has _____.
        
        // Punctuation
        text = text.replace(/，/g, ', ')
                   .replace(/。/g, '. ')
                   .replace(/：/g, ': ')
                   .replace(/；/g, '; ')
                   .replace(/（/g, ' (')
                   .replace(/）/g, ') ')
                   .replace(/？/g, '?')
                   .replace(/！/g, '!')
                   .replace(/＞/g, ' > ')
                   .replace(/＜/g, ' < ');

        // Blanks
        text = text.replace(/_+/g, ' #blank ');
        
        // Parentheses
        text = text.replace(/\( +\)/g, ' #parentheses ');
        text = text.replace(/\(\s*\)/g, ' #parentheses ');

        text = text.replace(/\s+/g, ' ');
        return text;
    }
    */
    
    // But parseMath calls text.trim(). Math text shouldn't escape # $ [ ] usually?
    // Math text goes inside $ ... $. # is not special there. [ ] are delimiters but $...$ protects them?
    // In Typst math: $ [1, 2] $ is valid. $ #foo $ calls function foo.
    // So inside parseMath, we should NOT escape #, [, ].
    // Inside traverse -> text node (body text), we SHOULD escape.
    
    // So we need two functions: normalizeBodyText and normalizeMathText.
    
    // Updating the code below effectively.

    function parseMath(node) {
        let result = '';
        if (node.classList && (node.classList.contains('math-letter') || node.classList.contains('math-letter-i') || node.classList.contains('mnormal') || node.classList.contains('mo'))) {
            let text = node.innerText.trim();
            if (!text) return '';

            // Normalize punctuation inside math
            // DO NOT use normalizeText() here because it escapes < > which are valid in math
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

            // Split multi-letter identifiers
            // 1. Uppercase sequencies: AC -> A C
            text = text.replace(/([A-Z])(?=[A-Z])/g, '$1 ');
            // 2. Lowercase followed by Uppercase: sinA -> sin A
            text = text.replace(/([a-z])(?=[A-Z])/g, '$1 ');
            // 3. Lowercase sequences: (mx -> m x)
            text = text.replace(/([a-z])(?=[a-z])/g, '$1 '); // This might split 'sin' -> 's i n', handled by caller or we need local fix?
            // Since this function returns `text` immediately, we need the Fix HERE too or rely on the fact that if it's a leaf node "sin", it will be returned as "s i n".
            // But wait, the re-join logic is at the END of the function (after child traversal).
            // This return path is EARLY.
            // So we must fix it here too.
            
            // Rejoin functions
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
            
            // Symbol mapping (GLOBAL replacement)
            const map = {
                '∵': 'because',
                '∴': 'therefore',
                '×': 'times',
                '⋅': 'dot.op',
                '≥': '>=',
                '≤': '<=',
                '≠': '!=',
                '≈': 'approx',
                '⊥': 'tack.t',
                '∥': '//',
                '△': 'triangle',
                '∠': 'angle',
                '°': 'degree', 
                'π': 'pi',
                'α': 'alpha', 'β': 'beta', 'γ': 'gamma', 'θ': 'theta',
                'λ': 'lambda', 'μ': 'mu', 'ρ': 'rho', 'σ': 'sigma',
                'ω': 'omega', 'φ': 'phi',
                '→': 'arrow',
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
                 // For text inside math structures, just normalize punctuation/symbols
                 let t = child.textContent;
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
                 
                 // Split multi-letter identifiers
                 t = t.replace(/([A-Z])(?=[A-Z])/g, '$1 ');
                 t = t.replace(/([a-z])(?=[A-Z])/g, '$1 ');
                 // Split lowercase sequences (e.g. ab -> a b), risk of splitting functions (log -> l o g) handled by post-process
                 t = t.replace(/([a-z])(?=[a-z])/g, '$1 ');

                 // Apply map
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
                 result += t + ' '; // Add space to separate text nodes
             } else {
                 result += parseMath(child) + ' '; // Add space between math elements
             }
        }
        
        // Post-process to rejoin functions that might have been split (l o g -> log)
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
})();
