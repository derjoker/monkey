// ==UserScript==
// @name         Double Click
// @namespace    derjoker
// @version      0.0.1
// @description  Double Click to Search (Lookup)
// @author       Feng Ya
// @match        https://www.duden.de/*
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
  const engine = engines[host]

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
