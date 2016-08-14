'use strict'

const createRepl = require('./repl.js')
const createBuffer = require('../buffer/htmlBuffer.js')

module.exports = (elementId) => {
  const webshellElement = document.getElementById(elementId)
  webshellElement.innerHTML = '<div class="webshell__input" id="' + elementId + '-current-input" contentEditable="true" onkeypress="return webshell.process(event)"></div>'
  const inputElement = document.getElementById(elementId + '-current-input')
  const repl = createRepl()
  const buffer = createBuffer()

  inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__prompt">' + repl.prompt(buffer) + '</div>')

  return {
    process: (event) => {
      if (event.keyCode !== 13) return
      const input = inputElement.innerHTML
      inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__input">' + input + '</div>')
      inputElement.innerHTML = ''
      const response = repl.execute(input, buffer)
      inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__response">' + response + '</div>')
      const prompt = repl.prompt(buffer)
      inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__prompt">' + prompt + '</div>')
      return false
    }
  }
}
