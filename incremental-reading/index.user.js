// ==UserScript==
// @name         Incremental Reading
// @namespace    http://tampermonkey.net/
// @version      0.2.0
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

  $('.highlight').click(function() {
    $(this).toggleClass('mask');
  });

  $('body').keyup(function(event) {
    // key: h (72)
    if (event.which === 72) {
      $('.highlight').toggleClass('mask');
    }
  });
})();
