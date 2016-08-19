'use strict'

const createEngine = require('../core/engine')
const persistState = require('./persistState')
const reducers = require('../reducers/index')
const commands = require('../commands/index')
const render = require('../render/html')
const stack = require('../stack')
const entities = require('html-entities').XmlEntities

module.exports = (elementId, options) => {
  //
  //  INITIALIZATION
  //

  const defaultOptions = {
    initialState: {}
  }
  const opts = Object.assign({}, defaultOptions, options)

  const refresh = (window.location.href.search(/\?refresh/) === -1)
  if (refresh) {
    persistState.delete(elementId)
    window.location = window.location.href.split('?')[0]
  }
  const savedState = persistState.read(elementId)
  const initialState = Object.assign({}, savedState, opts.initialState)

  const engine = createEngine(commands, reducers, initialState)
  let currentHistoryItem = -1
  ;(() => {})(currentHistoryItem) // this line is a workaround for an incorrectly issued linter error
  const webshellElement = document.getElementById(elementId)
  webshellElement.innerHTML = '<div class="input input-current" id="' + elementId + '-cursor" contentEditable="true"></div>'
  const inputElement = document.getElementById(elementId + '-cursor')

  //
  //  METHOD DEFINITIONS
  //

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

  const prompt = () => {
    currentHistoryItem = -1
    const state = engine.state()
    const userName = stack.latest(state.sessions)
    const path = '/' + state.currentLocation.join('/')
    const html = [
      '<span class="text-green">' + userName + '</span>',
      '<span class="text-lightgray">@</span>',
      '<span class="text-yellow">' + path + '</span>'
    ].join('')
    inputElement.insertAdjacentHTML('beforebegin', '<div class="prompt">' + html + '</div>')
    focus()
  }

  const welcome = () => {
    const state = engine.state()
    const userName = stack.latest(state.sessions)
    const date = state.lastActivity
    let hello = 'Hello ' + userName + '!'
    if (date instanceof Date) {
      hello += ' Last activity: ' + date.toLocaleString()
      hello += '<br>Reset the shell to its default state by <a class="text text-lightgray" href="?refresh">clicking here</a>'
    }
    inputElement.insertAdjacentHTML('beforebegin', '<div class="response">' + hello + '</div>')
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
    const {output} = engine.evaluate(input)
    print(output)
    const state = engine.state()
    if (!state) {
      terminate()
      return
    }
    persistState.save(elementId, state)
    prompt()
  }

  //
  // BIND EVENT HANDLERS
  //

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

  //
  // START
  //

  welcome()
  prompt()

  return {
    print: (input, response) => {
      flush(input)
      print((response === undefined ? [] : response))
      prompt()
    }
  }
}
