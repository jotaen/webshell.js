'use strict'

const createEngine = require('../core/engine')
const special = require('./specials')
const defaultState = require('../defaultState')
const reducers = require('../reducers/index')
const commands = require('../commands/index')
const render = require('../render/html')
const entities = require('html-entities').XmlEntities

module.exports = (elementId, initialState) => {
  const mergedState = Object.assign(defaultState(), initialState)
  const engine = createEngine(commands, reducers, mergedState)
  let currentHistoryItem = -1
  ;(() => {})(currentHistoryItem) // workaround for falsy linter error
  const webshellElement = document.getElementById(elementId)
  webshellElement.innerHTML = '<div class="input input-current" id="' + elementId + '-cursor" contentEditable="true"></div>'
  const inputElement = document.getElementById(elementId + '-cursor')
  webshellElement.onclick = function (event) {
    if (event.target === webshellElement) focus()
  }
  inputElement.onkeydown = function (event) {
    switch (event.keyCode) {
      case 13: // return
        evaluate()
        return false
      case 38: // arrow up
        historyUp()
        return false
      case 40: // arrow down
        historyDown()
        return false
      case 67: // c
        if (!event.ctrlKey) return true
        clear()
        return false
      case 9: // tab
        tab()
        return false
      default:
        return true
    }
  }

  const tab = () => {
    const input = read()
    const result = engine.complete(input)
    let line = ''
    if (result.length === 1) {
      line = result[0].preceding + ' ' + result[0].partial
    } else {
      flush()
      print([result.map(item => item.partial)])
      prompt()
      line = input
    }
    propose(line)
  }

  const clear = () => {
    flush('^C')
    print([])
    prompt()
    propose('')
  }

  const historyUp = () => {
    currentHistoryItem++
    const history = engine.state().history.reverse()
    if (currentHistoryItem > history.length - 1) currentHistoryItem = history.length - 1
    const old = typeof history[currentHistoryItem] === 'string' ? history[currentHistoryItem] : ''
    propose(old)
  }

  const historyDown = () => {
    currentHistoryItem--
    const history = engine.state().history.reverse()
    if (currentHistoryItem < -1) currentHistoryItem = -1
    const old = typeof history[currentHistoryItem] === 'string' ? history[currentHistoryItem] : ''
    propose(old)
  }

  const focus = () => {
    webshellElement.scrollTop = webshellElement.scrollHeight
    inputElement.focus()
  }

  const saveState = (state) => {
    const key = 'webshelljs_' + elementId
    const value = JSON.stringify(state)
    window.localStorage.setItem(key, value)
  }

  const prompt = () => {
    currentHistoryItem = -1
    const state = engine.state()
    inputElement.insertAdjacentHTML('beforebegin', '<div class="prompt">' + special.prompt(state) + '</div>')
    focus()
  }

  const read = () => {
    return entities.decode(inputElement.innerHTML).replace(/&nbsp;/g, ' ')
  }

  const flush = (additionalContent) => {
    const input = read()
    const text = input + (typeof additionalContent === 'string' ? additionalContent : '')
    inputElement.insertAdjacentHTML('beforebegin', '<div class="input">' + text + '</div>')
    inputElement.innerHTML = ''
    return input
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

  const propose = (line) => {
    inputElement.innerHTML = line
    if (line.length > 0) {
      const range = document.createRange()
      const sel = window.getSelection()
      range.setStart(inputElement.childNodes[0], line.length)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
      focus()
    }
  }

  const evaluate = () => {
    const input = flush()
    const {state, output} = engine.evaluate(input)
    print(output)
    if (!state) {
      terminate()
      return
    }
    saveState(state)
    prompt()
  }

  inputElement.insertAdjacentHTML('beforebegin', '<div class="response">' + special.welcome(mergedState) + '</div>')
  prompt()
}
