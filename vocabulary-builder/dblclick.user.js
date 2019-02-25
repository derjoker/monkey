// ==UserScript==
// @name         Double Click
// @namespace    derjoker
// @version      0.0.3
// @description  Double Click to Search (Lookup)
// @author       Feng Ya
// @match        https://www.duden.de/*
// @match        https://de.wikipedia.org/*
// @match        https://www.mydealz.de/*
// @match        https://derjoker.github.io/vocabulary-builder/*
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  // Your code here...
  const host = window.location.host
  // console.log(host)

  const engines = {
    'www.duden.de': 'https://www.duden.de/suchen/dudenonline/'
  }
  const engine = engines[host] || 'https://www.duden.de/suchen/dudenonline/'

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
