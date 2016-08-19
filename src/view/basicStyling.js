'use strict'

module.exports = () => {
  var style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = `
    .webshell {
      box-sizing: border-box;
      cursor: text;
      padding: 0.5em;
      overflow-y: scroll;
    }

    .input {
      position: relative;
      display: flex;
    }

    .response {
      clear: both;
      white-space: pre-wrap;
    }

    .list {
      padding-left: 0;
      margin: 0;
    }

    .list-item {
      list-style-type: none;
    }
  `
  document.getElementsByTagName('head')[0].appendChild(style)
}
