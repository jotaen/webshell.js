'use strict'

const createEngine = require('../engine')
const createBuffer = require('../buffer/htmlBuffer')
const util = require('./util')

const saveState = (name, obj) => {
  const key = 'webshelljs_' + name
  const value = JSON.stringify(obj)
  window.localStorage.setItem(key, value)
}

const readState = (name) => {
  const key = 'webshelljs_' + name
  const value = window.localStorage.getItem(key)
  if (!value) return {}
  const result = JSON.parse(value)
  if (result.lastActivity) result.lastActivity = new Date(result.lastActivity)
  return result
}

module.exports = (elementId, initialState) => {
  const lastState = readState(elementId)
  const mergedState = Object.assign({}, initialState, lastState)
  const engine = createEngine(mergedState)
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
    util.prompt(buffer, state)
    const ps1 = buffer.flush()
    inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__prompt">' + ps1 + '</div>')
    webshellElement.scrollTop = webshellElement.scrollHeight
    saveState(elementId, state)
    return false
  }

  util.welcome(buffer, mergedState)
  const hello = buffer.flush()
  inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__response webshell__text">' + hello + '</div>')

  util.prompt(buffer, mergedState)
  const ps1 = buffer.flush()
  inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__prompt">' + ps1 + '</div>')
  inputElement.focus()
}
