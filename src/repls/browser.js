'use strict'

const createEvaluator = require('../evaluator')
const createBuffer = require('../buffer/htmlBuffer')
const util = require('./util')

const saveState = (name, obj) => {
  const key = 'webshelljs_' + name
  const value = JSON.stringify(obj)
  window.localStorage.setItem(key, value)
}

module.exports = (elementId, initialState) => {
  const evaluator = createEvaluator(initialState)
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
    const state = evaluator(input, buffer)
    const response = buffer.flush()
    inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__input webshell__text">' + input + '</div>')
    inputElement.innerHTML = ''
    inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__response webshell__text">' + response + '</div>')
    if (!state) {
      inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__response webshell__text">Bye bye.</div>')
      webshellElement.removeChild(inputElement)
      return
    }
    util.prompt(buffer, state)
    const ps1 = buffer.flush()
    inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__prompt">' + ps1 + '</div>')
    webshellElement.scrollTop = webshellElement.scrollHeight
    saveState(elementId, state)
    return false
  }

  util.welcome(buffer, initialState)
  const hello = buffer.flush()
  inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__response webshell__text">' + hello + '</div>')

  util.prompt(buffer, initialState)
  const ps1 = buffer.flush()
  inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__prompt">' + ps1 + '</div>')
  inputElement.focus()
}
