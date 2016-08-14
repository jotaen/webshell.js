'use strict'

const createEngine = require('../engine.js')
const createBuffer = require('../buffer/htmlBuffer.js')

module.exports = (elementId, initialState) => {
  const engine = createEngine(initialState)
  const buffer = createBuffer()

  const webshellElement = document.getElementById(elementId)
  webshellElement.innerHTML = '<div class="webshell__input webshell__text" id="' + elementId + '-current-input" contentEditable="true"></div>'
  const inputElement = document.getElementById(elementId + '-current-input')
  webshellElement.onclick = (event) => {
    if (event.target === webshellElement) inputElement.focus()
  }

  inputElement.onkeydown = (event) => {
    if (event.keyCode !== 13) return
    const input = inputElement.innerHTML
    engine.execute(input, buffer)
    const response = buffer.flush()
    inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__input webshell__text">' + input + '</div>')
    inputElement.innerHTML = ''
    inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__response webshell__text">' + response + '</div>')
    engine.prompt(buffer)
    const prompt = buffer.flush()
    inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__prompt">' + prompt + '</div>')
    webshellElement.scrollTop = webshellElement.scrollHeight
    return false
  }

  engine.prompt(buffer)
  const prompt = buffer.flush()
  inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__prompt">' + prompt + '</div>')
  inputElement.focus()
}
