// ==UserScript==
// @name         Fan Yi
// @namespace    derjoker
// @version      0.2.1
// @description  Recite.
// @description:en  Recite.
// @author       Feng Ya
// @match        https://github.com/derjoker/drafts/blob/master/deutsch/fanyi.md
// @match        https://github.com/derjoker/900/blob/master/Deutsch.md
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

  function transform(el, percent) {
    const html = el.textContent.replace(regex, match => {
      return Math.random() > percent
        ? match
        : `<span class="highlight mask">${match}</span>`;
    });
    el.innerHTML = html;
  }

  const regex = /[\wäöüß]+/gi;

  // console.log(location);

  if (
    location.href ===
    'https://github.com/derjoker/drafts/blob/master/deutsch/fanyi.md'
  ) {
    document.querySelectorAll('article > h2').forEach(h2 => {
      const p = h2.nextSibling.nextSibling;
      transform(p, 0.6);
    });
  }

  if (
    location.href === 'https://github.com/derjoker/900/blob/master/Deutsch.md'
  ) {
    document.querySelectorAll('li > p').forEach(p => {
      transform(p, 0.3);
    });
  }

  document.body.addEventListener('click', event => {
    document.querySelectorAll('.highlight').forEach(highlight => {
      highlight.classList.toggle('mask');
    });
  });
})();
