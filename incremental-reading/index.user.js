// ==UserScript==
// @name         Incremental Reading
// @namespace    http://tampermonkey.net/
// @version      0.5.0
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

  let cntClick = 0;

  $('body').click(function(event) {
    // Instapaper: Remove Note
    if ($('div.highlight_popover.reveal').length > 0) return;

    cntClick++;
    setTimeout(function() {
      if (cntClick === 1) {
        $('.highlight').toggleClass('mask');
      }
      cntClick = 0;
    }, 200);
  });

  $('body').keyup(function(event) {
    // disable during input
    if ($('div.ipnote-popover.showing').length > 0) return;

    // key: h (72)
    if (event.which === 72) {
      $('.highlight').toggleClass('mask');
    }
  });
})();
