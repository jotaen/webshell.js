'use strict'

const createEngine = require('../engine')
const createBuffer = require('../buffer/htmlBuffer')
const stack = require('../stack')

const prompt = (buffer, state) => {
  buffer
    .color('green').print(stack.latest(state.sessions))
    .color('light-gray').print('@')
    .color('yellow').print('/' + state.currentLocation.join('/'))
}

module.exports = (elementId, initialState) => {
  const engine = createEngine(initialState)
  const buffer = createBuffer()

  const webshellElement = document.getElementById(elementId)
  webshellElement.innerHTML = '<div class="webshell__input webshell__input--current webshell__text" id="' + elementId + '-cursor" contentEditable="true"></div>'
  const inputElement = document.getElementById(elementId + '-cursor')
  webshellElement.onclick = (event) => {
    if (event.target === webshellElement) inputElement.focus()
  }

  inputElement.onkeydown = (event) => {
    if (event.keyCode !== 13) return
    const input = inputElement.innerHTML
    const state = engine(input, buffer)
    const response = buffer.flush()
    inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__input webshell__text">' + input + '</div>')
    inputElement.innerHTML = ''
    inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__response webshell__text">' + response + '</div>')
    prompt(buffer, state)
    const ps1 = buffer.flush()
    inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__prompt">' + ps1 + '</div>')
    webshellElement.scrollTop = webshellElement.scrollHeight
    return false
  }

  const state = engine('', buffer)
  prompt(buffer, state)
  const ps1 = buffer.flush()
  inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__prompt">' + ps1 + '</div>')
  inputElement.focus()
}
