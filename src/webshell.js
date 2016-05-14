'use strict';

require('./cli.js');

module.exports = function(document, selector) {
  const webshellNode = document.getElementById(selector)
  const p = document.createElement('p')
  webshellNode.appendChild(p)
};
