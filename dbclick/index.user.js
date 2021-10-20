// ==UserScript==
// @name         Double Click
// @namespace    derjoker
// @version      0.1.1
// @description  Double Click to Lookup in Online Dictionary
// @author       Feng Ya
// @match        *://*/*
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  // Your code here...
  console.log('Double Click v' + GM_info.script.version)

  const engines = {
    en: 'https://www.merriam-webster.com/dictionary/',
    de: 'https://www.duden.de/suchen/dudenonline/'
  }

  const htmlLang = document.querySelector('html').lang

  window.addEventListener('dblclick', event => {
    console.log(event.path)
    console.log(event.path.map(node => node.lang))
    const langs = event.path.map(node => node.lang)
      .filter(lang => Boolean(lang))
    const lang = htmlLang === 'en' ? langs[0] : htmlLang
    const engine = engines[lang] || engines.en

    const selection =
      window.getSelection() ||
      document.getSelection() ||
      document.selection.createRange()
    const link = engine + selection
    console.log(link)
    window.open(link)
  })
})()
