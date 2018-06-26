// ==UserScript==
// @name         Print Code
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  Print.
// @author       Feng Ya
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'
  // Your code here...
  if (!document.querySelector('div.file')) return

  console.log('print code')

  const btnPrint = document.createElement('a')
  btnPrint.classList.add('btn')
  btnPrint.classList.add('btn-sm')
  btnPrint.classList.add('BtnGroup-item')
  console.log(btnPrint.classList)
  btnPrint.innerHTML = 'Print'
  btnPrint.addEventListener('click', printCode)

  document
    .querySelector('div.file-actions > div.BtnGroup')
    .appendChild(btnPrint)

  function printCode () {
    const file = document.querySelector('div.file')
    const header = document.querySelector('div.file-header')

    header.style.display = 'none'

    document.querySelectorAll('body > div').forEach(div => {
      div.style.display = 'none'
    })

    document.body.appendChild(file)
  }
})()
