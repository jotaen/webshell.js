'use strict'

const createEngine = require('../core/engine')
const special = require('./specials')
const defaultState = require('../defaultState')
const reducers = require('../reducers/index')
const commands = require('../commands/index')
const render = require('./render')
const entities = require('html-entities').XmlEntities

module.exports = (elementId, initialState) => {
  const mergedState = Object.assign(defaultState(), initialState)
  const engine = createEngine(commands, reducers, mergedState)
  let currentHistoryItem = 0
  ;(() => {})(currentHistoryItem) // workaround for falsy linter error
  const webshellElement = document.getElementById(elementId)
  webshellElement.innerHTML = '<div class="input input-current" id="' + elementId + '-cursor" contentEditable="true"></div>'
  const inputElement = document.getElementById(elementId + '-cursor')
  webshellElement.onclick = function (event) {
    if (event.target === webshellElement) focus()
  }
  inputElement.onkeydown = function (event) {
    switch (event.keyCode) {
      case 13:
        evaluate()
        return false
      case 38:
        historyUp()
        return false
      case 40:
        historyDown()
        return false
      case 67:
        if (event.ctrlKey) console.log(67)
        return false
      default:
        return true
    }
  }

  const historyUp = () => {
    currentHistoryItem++
  }

  const historyDown = () => {
    currentHistoryItem--
  }

  const focus = () => {
    inputElement.focus()
  }

  const saveState = (state) => {
    const key = 'webshelljs_' + elementId
    const value = JSON.stringify(state)
    window.localStorage.setItem(key, value)
  }

  const prompt = (state) => {
    inputElement.insertAdjacentHTML('beforebegin', '<div class="prompt">' + special.prompt(state) + '</div>')
  }

  const scrollToPrompt = () => {
    webshellElement.scrollTop = webshellElement.scrollHeight
  }

  const readline = () => {
    return entities.decode(inputElement.innerHTML)
  }

  const flush = (input) => {
    inputElement.insertAdjacentHTML('beforebegin', '<div class="input">' + input + '</div>')
    inputElement.innerHTML = ''
  }

  const terminate = () => {
    inputElement.insertAdjacentHTML('beforebegin', '<div class="response">Bye bye.</div>')
    webshellElement.removeChild(inputElement)
  }

  const print = (output) => {
    const outputAsHtml = output.reduce((rendered, line) => {
      return (rendered + render(line))
    }, '')
    inputElement.insertAdjacentHTML('beforebegin', '<div class="response">' + outputAsHtml + '</div>')
  }

  const evaluate = () => {
    const input = readline()
    const {state, output} = engine.evaluate(input)
    flush(input)
    print(output)
    if (!state) {
      terminate()
      return
    }
    prompt(state)
    saveState(state)
    scrollToPrompt()
  }

  inputElement.insertAdjacentHTML('beforebegin', '<div class="response">' + special.welcome(mergedState) + '</div>')
  inputElement.insertAdjacentHTML('beforebegin', '<div class="prompt">' + special.prompt(mergedState) + '</div>')
  focus()
}
