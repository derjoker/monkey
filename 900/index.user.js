// ==UserScript==
// @name         900
// @namespace    derjoker
// @version      0.2.4
// @description  Recite.
// @author       Feng Ya
// @match        https://github.com/derjoker/900/blob/master/Deutsch.md
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

  // Your code here...
  GM_addStyle(`
  .card-container {
    font-size: 1.6em;
  }
  .highlight {
    background: rgba(255, 242, 51, 0.298);
  }
  .mask {
    color: rgba(255, 242, 51, 0.298);
  }
  `);

  const regex = /[\wäöüß]+/gi;

  function replace(node, percent) {
    if (node.nodeType === 1) percent = 1;
    const html = node.textContent.replace(regex, match => {
      return Math.random() > percent
        ? match
        : `<span class="highlight mask">${match}</span>`;
    });
    // ELEMENT_NODE
    if (node.nodeType === 1) {
      node.innerHTML = html;
      return node.outerHTML;
    }
    // TEXT_NODE
    if (node.nodeType === 3) return html;

    return '';
  }

  function transform(el, percent) {
    // const clone = el.cloneNode(true);
    // console.log(clone.childNodes);

    const childNodes = [];
    el.childNodes.forEach(child => {
      childNodes.push(replace(child, percent));
    });
    el.innerHTML = childNodes.join('');
  }

  const items = document.querySelectorAll('li > p');

  const article = document.querySelector('article');
  article.insertAdjacentHTML(
    'beforebegin',
    '<section class="card-container"></section>'
  );

  article.style.display = 'none';

  const container = document.querySelector('.card-container');
  container.innerHTML = `
  <div class="prev"></div>
  <div class="card"></div>
  <div class="next"></div>
  `;

  const card = document.querySelector('.card');

  function display(index) {
    const item = items[(index + items.length) % items.length];
    const clone = item.cloneNode(true);
    card.innerHTML = '';
    card.appendChild(clone);
    transform(clone, 0.2);
  }

  let index = 0;

  function next() {
    index += 1;
    display(index);
  }

  function prev() {
    index -= 1;
    display(index);
  }

  function toggle() {
    document.querySelectorAll('.highlight').forEach(highlight => {
      highlight.classList.toggle('mask');
    });
  }

  display(index);

  container.addEventListener('click', event => {
    toggle();
  });

  document.body.addEventListener('keydown', event => {
    event.preventDefault();
    if (event.key === 'n' || event.key === 'j') next();
    if (event.key === 'p' || event.key === 'k') prev();
    if (event.key === 'r') display(index);
    if (event.key === ' ') toggle();
  });
})();
