// ==UserScript==
// @name         Double Click
// @namespace    derjoker
// @version      0.0.7
// @description  Double Click to Search (Lookup)
// @author       Feng Ya
// @match        https://www.duden.de/*
// @match        https://de.langenscheidt.com/*
// @match        https://de.*/*
// @match        https://*.de/*
// @match        https://*/de/*
// @match        https://getpocket.com/read/*
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  // Your code here...
  console.log('Double Click')

  const engine = 'https://www.duden.de/suchen/dudenonline/'

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
