// ==UserScript==
// @name         bilibili
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  哔哩哔哩链接
// @author       derjoker
// @match        https://www.bilibili.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  // Your code here...
  console.log(GM_info.script.version)

  console.log(location)

  if (location.href === 'https://www.bilibili.com/watchlater/#/list') {
    const target = document.querySelector('body > div.app-wrap > div')
    const config = { childList: true }
    const observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        mutation.addedNodes.forEach(node => {
          if (node.classList && node.classList.contains('list-box')) {
            node.querySelectorAll('a').forEach(a => a.setAttribute('target', '_blank'))
            observer.disconnect()
          }
        })
      }
    })
    observer.observe(target, config)
  }
})()
