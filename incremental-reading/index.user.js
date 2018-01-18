// ==UserScript==
// @name         Incremental Reading
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  Read. Recite.
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
})();
