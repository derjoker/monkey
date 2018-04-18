// ==UserScript==
// @name         Fan Yi
// @namespace    derjoker
// @version      0.1.0
// @description  Fan Yi
// @description:en  Fan Yi
// @author       Feng Ya
// @match        https://github.com/derjoker/drafts/blob/master/deutsch/fanyi.md
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

  // Your code here...
  GM_addStyle(`
  .highlight {
    background: rgba(255, 242, 51, 0.298);
  }
  .mask {
    color: rgba(255, 242, 51, 0.298);
  }
  `);

  const regex = /[\wäöüß]+/gi;

  document.querySelectorAll('article > h2').forEach(h2 => {
    const p = h2.nextSibling.nextSibling;
    const html = p.textContent.replace(regex, match => {
      return Math.random() > 0.6
        ? match
        : `<span class="highlight mask">${match}</span>`;
    });
    p.innerHTML = html;
  });

  document.body.addEventListener('dblclick', event => {
    document.querySelectorAll('.highlight').forEach(highlight => {
      highlight.classList.toggle('mask');
    });
  });
})();
