// ==UserScript==
// @name         Double Click
// @namespace    derjoker
// @version      0.1.0
// @description  Double Click to Lookup in Online Dictionary
// @author       Feng Ya
// @match        *://*/*
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  // Your code here...
  console.log('Double Click')

  const engines = {
    en: 'https://www.merriam-webster.com/dictionary/',
    de: 'https://www.duden.de/suchen/dudenonline/'
  }

  let domain = 'en'
  const splits = location.href.split(/\W/)
  if (splits.indexOf('de') > -1) domain = 'de'

  const engine = engines[domain]

  window.addEventListener('dblclick', function () {
    var selection =
      window.getSelection() ||
      document.getSelection() ||
      document.selection.createRange()
    var link = engine + selection
    console.log(link)
    window.open(link)
  })
})()
