'use strict'

const createEvaluator = require('../evaluator')
const util = require('./util')
const defaultState = require('../defaultState')
const reducers = require('../reducers/index')
const commands = require('../commands/index')

const saveState = (name, obj) => {
  const key = 'webshelljs_' + name
  const value = JSON.stringify(obj)
  window.localStorage.setItem(key, value)
}

module.exports = (elementId, initialState) => {
  const mergedState = Object.assign(defaultState(), initialState)
  const evaluator = createEvaluator(commands, reducers, mergedState)

  const webshellElement = document.getElementById(elementId)
  webshellElement.innerHTML = '<div class="webshell__input webshell__input--current webshell__text" id="' + elementId + '-cursor" contentEditable="true"></div>'
  const inputElement = document.getElementById(elementId + '-cursor')
  webshellElement.onclick = (event) => {
    if (event.target === webshellElement) inputElement.focus()
  }

  inputElement.onkeydown = (event) => {
    if (event.keyCode !== 13) return
    const input = inputElement.innerHTML
    const {state, output} = evaluator(input)
    inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__input webshell__text">' + input + '</div>')
    inputElement.innerHTML = ''
    const outputAsHtml = output.reduce((rendered, line) => {
      rendered += line
      return rendered
    }, '')
    inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__response webshell__text">' + outputAsHtml + '</div>')
    if (!state) {
      inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__response webshell__text">Bye bye.</div>')
      webshellElement.removeChild(inputElement)
      return
    }
    const prompt = util.prompt(state)
    inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__prompt webshell__text">' + prompt + '</div>')
    webshellElement.scrollTop = webshellElement.scrollHeight
    saveState(elementId, state)
    return false
  }

  const welcome = util.welcome(mergedState)
  inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__response webshell__text">' + welcome + '</div>')

  const prompt = util.prompt(mergedState)
  inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__prompt webshell__text">' + prompt + '</div>')
  inputElement.focus()
}
