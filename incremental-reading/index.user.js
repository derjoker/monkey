// ==UserScript==
// @name         Incremental Reading
// @namespace    http://tampermonkey.net/
// @version      0.7.1
// @description  Read. Recite.
// @description:en  Read. Recite.
// @author       Feng Ya
// @match        https://www.instapaper.com/read/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

  // Your code here...

  GM_addStyle('.mask {background-color: black !important;}');

  $('.highlight').addClass('mask');

  $('body').click(function(event) {
    if (event.target.nodeName !== 'BODY') return;

    // Instapaper: Remove Note
    if ($('div.highlight_popover.reveal').length > 0) return;

    $('.highlight').toggleClass('mask');
  });
})();
