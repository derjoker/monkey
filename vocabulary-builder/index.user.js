// ==UserScript==
// @name         Vocabulary Builder
// @namespace    derjoker
// @version      0.0.1
// @description  Vocabulary to Anki Cards.
// @author       Feng Ya
// @match        https://www.duden.de/rechtschreibung/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

;(function () {
  'use strict'

  // Your code here...
  /* global $ */
  const host = window.location.host
  console.log(host)

  let stem, word

  if (host === 'www.duden.de') {
    const names = window.location.pathname.split('/')
    stem = names[names.length - 1]
    word = $('section#block-system-main > h1')
      .text()
      .replace(/\u00AD/g, '')

    const section = $('h2:contains("Bedeutungsübersicht")').parents('section')

    section.find('ol > li > a').each((_, a) => {
      const definition = $(a)
        .text()
        .trim()
      const href = $(a).attr('href')
      // $(href).prepend('<input type="checkbox" />')
      $(href)
        .find('.term-section')
        .each((_, el) => {
          const b = $(el).find('h3:contains("Beispiel") + span')
          b.prepend(
            $('<input type="checkbox" />').data('kvb', {
              definition,
              example: b.text().trim()
            })
          )

          const w = $(el).find(
            'h3:contains("Wendungen, Redensarten, Sprichwörter") + span'
          )
          const clone = w.parent().clone()
          clone.find('h3').remove()
          w.prepend(
            $('<input type="checkbox" />').data('kvb', {
              definition,
              example: clone.text().trim()
            })
          )

          $(el)
            .find('ul > li')
            .each((_, li) => {
              const example = $(li)
                .text()
                .trim()
              $(li).prepend(
                $('<input type="checkbox" />').data('kvb', {
                  definition,
                  example
                })
              )
            })
        })
    })
  }

  $('input:checkbox').click(event => {
    const data = $(event.target).data('kvb')
    console.log(host, stem, word, data)
    if (event.target.checked) {
      // Add
    } else {
      // Remove
    }
  })
})()
