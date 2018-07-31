// ==UserScript==
// @name         Vocabulary
// @namespace    http://tampermonkey.net/
// @version      0.4.0
// @description  Tweaks in Vocabulary
// @author       Feng Ya
// @match        https://www.vocabulary.com/*
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'
  // Your code here...
  // console.log(window.location)
  const pathname = window.location.pathname

  if (pathname === '/lists/vocabgrabber') {
    document
      .querySelector('button.ss-settings')
      .addEventListener('click', () => {
        const count = parseInt(
          document.querySelector('div.resultsonly > h1 > span').textContent,
          10
        )

        const selects = document.querySelectorAll(
          'div.menu-item[data-action="select"]'
        )
        // console.log(selects)

        selects[0].setAttribute('data-count', (count / 4).toFixed())
        selects[0].textContent = 'Select First 25%'

        selects[1].setAttribute('data-count', (count / 2).toFixed())
        selects[1].textContent = 'Select First 50%'

        selects[2].setAttribute('data-count', count.toFixed())
        selects[2].textContent = 'Select All Words'
      })
  }

  if (pathname.startsWith('/dictionary')) {
    document.body.addEventListener('keydown', event => {
      // console.log(event)
      if (event.target.nodeName !== 'INPUT') {
        document.querySelector('input#search').focus()
      }
    })
  }

  if (pathname === '/' || pathname === '/play/') {
    function changeAccessKey () {
      document.querySelectorAll('div.active div.choices > a').forEach(a => {
        const key = a.getAttribute('accesskey')
        switch (key) {
          case '1A':
            a.setAttribute('accesskey', '1A')
            break
          case '2B':
            a.setAttribute('accesskey', '2S')
            break
          case '3C':
            a.setAttribute('accesskey', '3D')
            break
          case '4D':
            a.setAttribute('accesskey', '4F')
            break
          default:
            break
        }
      })
    }

    const target = document.querySelector('div#challenge')
    // console.log(target)
    const config = { childList: true, subtree: true }

    const callback = function (mutations) {
      // console.log(mutationsList)
      for (let mutation of mutations) {
        if (mutation.target.className === 'questionPane') {
          changeAccessKey()
        }
      }
    }
    const observer = new MutationObserver(callback)
    observer.observe(target, config)
  }
})()