'use strict'

const createRepl = require('./repl.js')
const createBuffer = require('../buffer/htmlBuffer.js')

module.exports = (elementId, initialState) => {
  const repl = createRepl(initialState)
  const buffer = createBuffer()

  const webshellElement = document.getElementById(elementId)
  webshellElement.innerHTML = '<div class="webshell__input webshell__text" id="' + elementId + '-current-input" contentEditable="true" onkeypress="return webshell.process(event)"></div>'
  const inputElement = document.getElementById(elementId + '-current-input')
  webshellElement.onclick = (event) => {
    if (event.target === webshellElement) inputElement.focus()
  }
  inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__prompt">' + repl.prompt(buffer) + '</div>')
  inputElement.focus()

  const webshell = {}
  webshell.process = (event) => {
    if (event.keyCode !== 13) return
    const input = inputElement.innerHTML
    const response = repl.execute(input, buffer)
    webshell.write(input, response)
    webshellElement.scrollTop = webshellElement.scrollHeight;
    return false
  }
  webshell.write = (input, response) => {
    console.log(input, response)
    inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__input webshell__text">' + input + '</div>')
    inputElement.innerHTML = ''
    inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__response webshell__text">' + response + '</div>')
    const prompt = repl.prompt(buffer)
    inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__prompt">' + prompt + '</div>')
  }
  return webshell
}
