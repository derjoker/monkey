// ==UserScript==
// @name         HTML Downloader (Debug)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Download raw HTML and solutions for local debugging
// @author       derjoker
// @match        https://www.jyeoo.com/math2/paper/detail/*
// @match        https://www.jyeoo.com/math2/report/detail/*
// @require      https://unpkg.com/fflate@0.8.2/umd/index.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// @icon         https://www.jyeoo.com/api/photo/62956866
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // UI Integration: "HTML" Button above "Typst" or "Share"
    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'qrcode-side';
    
    // Position
    let bottomPos = 315; // Above the Typst button (approx 245 + 70)
    // Try to find existing Typst button or Share button
    const shareBtn = Array.from(document.querySelectorAll('.qrcode-side')).find(el => el.innerText.includes('分享'));
    if (shareBtn) {
        const shareBottom = parseInt(shareBtn.style.bottom || '173', 10);
        if (!isNaN(shareBottom)) {
            bottomPos = shareBottom + 140; // Typst is +70, so this is +140
        }
    }
    btnWrapper.style.bottom = bottomPos + 'px';
    
    btnWrapper.style.cursor = 'pointer';
    btnWrapper.id = 'export-html-wrapper';

    const inner = document.createElement('div');
    inner.className = 'show-paper prelative';
    inner.style.textAlign = 'center'; 
    inner.style.padding = '5px 0 2px 0';
    inner.style.backgroundColor = '#f0f0f0'; // Slightly different color 
    inner.style.borderRadius = '4px';     
    inner.style.width = '100%';
    inner.style.margin = '0 auto';  

    const icon = document.createElement('i');
    icon.className = 'icon i-download'; // Reuse download icon
    icon.style.display = 'block';     
    icon.style.margin = '5px auto 0';
    icon.style.transform = 'scale(1.25)';
    icon.style.transformOrigin = 'center center';
    icon.style.filter = 'hue-rotate(90deg)'; // Change color to distinguish

    const text = document.createElement('p');
    text.className = 'c999';
    text.innerText = 'HTML';         
    text.style.margin = '12px 0 0 0';  
    text.style.fontSize = '12px';     
    text.style.lineHeight = '1.2';
    text.style.width = '100%';
    text.style.wordBreak = 'break-word'; 
    
    inner.appendChild(icon);
    inner.appendChild(text);
    btnWrapper.appendChild(inner);

    btnWrapper.onclick = downloadHtml;
    document.body.appendChild(btnWrapper);
    
    const btn = text; // For status updates

    async function downloadHtml() {
        const originalText = btn.innerText;
        btn.innerText = 'Scanning...';
        btnWrapper.style.pointerEvents = 'none';
        btnWrapper.style.opacity = '0.6';

        try {
            const zipData = {};
            
            // 1. Save Main Page
            // Clean up scripts? No, keep as raw as possible for debug.
            zipData["index.html"] = fflate.strToU8(document.documentElement.outerHTML);
            
            // 2. Find Solutions
            const solutionUrls = new Set();
            
            // Find all questions
            const questions = document.querySelectorAll('fieldset.quesborder');
            questions.forEach(q => {
                const url = extractSolutionUrl(q);
                if (url) solutionUrls.add(url);
            });
            
            if (solutionUrls.size > 0) {
                const solutionsFolder = {};
                let count = 0;
                btn.innerText = `Sol 0/${solutionUrls.size}`;
                
                const promises = Array.from(solutionUrls).map(url => {
                    return new Promise(resolve => {
                        GM_xmlhttpRequest({
                            method: "GET",
                            url: url,
                            onload: function(response) {
                                count++;
                                btn.innerText = `Sol ${count}/${solutionUrls.size}`;
                                if (response.status === 200) {
                                    // Extract ID
                                    const idMatch = url.match(/\/detail\/([a-zA-Z0-9]+)/);
                                    const id = idMatch ? idMatch[1] : 'unknown_' + Math.random().toString(36).substr(2, 9);
                                    solutionsFolder[`${id}.html`] = fflate.strToU8(response.responseText);
                                }
                                resolve();
                            },
                            onerror: function() {
                                count++;
                                console.error('Failed to fetch', url);
                                resolve();
                            }
                        });
                    });
                });
                
                await Promise.all(promises);
                
                if (Object.keys(solutionsFolder).length > 0) {
                    zipData["solutions"] = solutionsFolder;
                }
            }
            
            console.log("Zipping...");
            btn.innerText = 'Zipping...';
            await new Promise(r => setTimeout(r, 100));

            const zipped = fflate.zipSync(zipData);
            
            const titleEl = document.querySelector('h1.paper-title');
            const title = titleEl ? titleEl.innerText.trim() : 'Debug_Dump';
            
            const blob = new Blob([zipped], {type: "application/zip"});
            saveAs(blob, `${title}_debug.zip`);
            
        } catch (e) {
            console.error(e);
            alert("Error: " + e.message);
        } finally {
            btn.innerText = originalText;
            btnWrapper.style.pointerEvents = 'auto';
            btnWrapper.style.opacity = '1';
        }
    }

    function extractSolutionUrl(element) {
        let container = element;
        // Strategy: Search inside fieldset first
        let link = container.querySelector('.fieldtip-right a[href*="/ques/detail/"]');
        if (link && link.innerText.includes('解析')) return link.href;

        // Search siblings if not in fieldset
        if (container.parentElement) {
             link = container.parentElement.querySelector('.fieldtip-right a[href*="/ques/detail/"]');
             if (link && link.innerText.includes('解析')) return link.href;
        }

        return null;
    }

})();
