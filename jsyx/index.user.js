// ==UserScript==
// @name         jsyx
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Jiao Shi Yan Xiu
// @author       DJ
// @match        http://jsyx.zje.net.cn:8066/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Your code here...
  console.log('Tampermonkey')

  const node = document.body
  const config = { childList: true, subtree: true }
  const observer = new MutationObserver(mutationsList => {
    // console.log(mutationsList)
    for (let mutation of mutationsList) {
      const node = mutation.addedNodes[1]
      if (node && node.id === 'numresult') {
        const text = node.previousSibling
        // console.log(text)
        const num = text.textContent.replace(/\D/g, '')
        node.value = num
        const button = document.querySelector('button.aui_state_highlight')
        // console.log(button)
        button.click()
      }
    }
  })

  observer.observe(node, config)

})();