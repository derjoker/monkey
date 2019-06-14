// ==UserScript==
// @name         Double Click
// @namespace    derjoker
// @version      0.0.5
// @description  Double Click to Search (Lookup)
// @author       Feng Ya
// @match        https://*.langenscheidt.com/*
// @match        https://www.duden.de/*
// @match        https://de.wikipedia.org/*
// @match        https://*.fandom.com/de/*
// @match        https://www.mydealz.de/*
// @match        https://www.apple.com/de/*
// @match        https://derjoker.github.io/vocabulary-builder/*
// @grant        none
// ==/UserScript==

;(function () {
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
