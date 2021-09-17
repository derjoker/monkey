// ==UserScript==
// @name         Double Click
// @namespace    derjoker
// @version      0.0.6
// @description  Double Click to Search (Lookup)
// @author       Feng Ya
// @match        https://*.langenscheidt.com/*
// @match        https://www.duden.de/*
// @match        https://de.*/*
// @match        https://*.de/*
// @match        https://*/de/*
// @match        https://getpocket.com/read/*
// @grant        none
// ==/UserScript==

; (function () {
  'use strict'

  // Your code here...
  const host = window.location.host
  // console.log(host)

  const engines = {
    'de.langenscheidt.com': 'https://de.langenscheidt.com/deutsch-englisch/',
    'www.duden.de': 'https://www.duden.de/suchen/dudenonline/'
  }
  const engine = engines[host] || 'https://de.langenscheidt.com/deutsch-englisch/'

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
