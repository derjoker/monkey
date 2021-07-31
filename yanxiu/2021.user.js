// ==UserScript==
// @name         教师研修2021暑期
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  try to take over the world!
// @author       DJ
// @match        https://ipx.yanxiu.com/g*
// @icon         https://www.google.com/s2/favicons?domain=yanxiu.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Your code here...
  console.log('Tampermonkey')

  const node = document.body
  const config = { childList: true, subtree: true }
  const observer = new MutationObserver(mutationsList => {
    // console.log(mutationsList)
    const button = document.querySelector('div.alarmClock-wrapper')
    if (button.style.display !== 'none') {
      console.log(button)
      button.click()
    }
  })

  observer.observe(node, config)

})();