// ==UserScript==
// @name         900
// @namespace    derjoker
// @version      0.7.2
// @description  Recite.
// @author       Feng Ya
// @match        https://github.com/derjoker/900/blob/master/Deutsch.md
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

  // Your code here...

  const LOCAL_INDEX = 'LOCAL_INDEX';

  const localIndex = parseInt(window.localStorage.getItem(LOCAL_INDEX), 10);

  GM_addStyle(`
  .card-container {
    font-size: 1.6em;
    text-align: center;
    margin-top: 0.6em;
    padding: 0.8em;
    border: black 1px solid;
  }
  .card > div {
    font-size: 0.6em;
    padding: 0.8em;
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

  const file = document.querySelector('.file');
  file.insertAdjacentHTML(
    'beforebegin',
    '<section class="card-container"></section>'
  );

  const container = document.querySelector('.card-container');
  container.innerHTML = `
  <div class="prev"></div>
  <div class="card"></div>
  <div class="next"></div>
  `;

  const card = document.querySelector('.card');

  function display(index) {
    index = (index + items.length) % items.length;
    window.localStorage.setItem(LOCAL_INDEX, index);

    const item = items[index];
    const clone = item.cloneNode(true);
    card.innerHTML = `<div>${index + 1}/${items.length}</div>`;
    card.appendChild(clone);
    transform(clone, 0.2);
  }

  let index = localIndex >= 0 ? localIndex : 0;

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

  let mode = false;

  function toggleMode() {
    mode = !mode;

    if (mode) {
      file.style.display = 'none';
      container.style.display = '';
    } else {
      file.style.display = '';
      container.style.display = 'none';
      items[index].scrollIntoView();
    }
  }

  display(index);
  container.style.display = 'none';
  items[index].scrollIntoView();

  container.addEventListener('click', event => {
    toggle();
  });

  items.forEach((item, i) => {
    item.addEventListener('click', event => {
      index = i;
      display(index);
      toggleMode();
    });
  });

  document.body.addEventListener('keydown', event => {
    if (event.key === 'x') {
      event.preventDefault();
      toggleMode();
    }

    if (!mode) return;
    if (event.key === 'n' || event.key === 'j') {
      event.preventDefault();
      next();
    }
    if (event.key === 'p' || event.key === 'k') {
      event.preventDefault();
      prev();
    }
    if (event.key === 'r') {
      event.preventDefault();
      display(index);
    }
    if (event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  });
})();
