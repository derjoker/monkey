// ==UserScript==
// @name         Print PDF
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  Print.
// @author       Feng Ya
// @match        http://www.imsdb.com/scripts/*
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'
  // Your code here...
  print()

  function print () {
    const script = document.querySelector('pre')
    document.body.innerHTML = script.outerHTML
  }
})()
