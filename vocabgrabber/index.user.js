// ==UserScript==
// @name         Vocabgrabber
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  Select All/Half Words
// @author       You
// @match        https://www.vocabulary.com/lists/vocabgrabber
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js
// @grant        none
// ==/UserScript==

/* global $ */

;(function () {
  'use strict'
  // Your code here...
  $('button.ss-settings').click(function () {
    const count = parseInt(
      $('div.resultsonly > h1:nth-child(1) > span:nth-child(1)').text(),
      10
    )

    const select10 = $('div.menu-item[data-action="select"][data-count="10"]')
    select10.attr('data-count', (count / 10).toFixed())
    select10.text('Select First 10%')

    const select25 = $('div.menu-item[data-action="select"][data-count="25"]')
    select25.attr('data-count', (count / 4).toFixed())
    select25.text('Select First 25%')

    const select50 = $('div.menu-item[data-action="select"][data-count="50"]')
    select50.attr('data-count', (count / 2).toFixed())
    select50.text('Select First 50%')
  })
})()
