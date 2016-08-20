'use strict'

const createEngine = require('../core/engine')
const persistState = require('./persistState')
const reducers = require('../reducers/index')
const commands = require('../commands/index')
const render = require('../render/html')
const stack = require('../stack')
const createElement = require('./element')
const basicStyling = require('./basicStyling')
const entities = require('html-entities').XmlEntities

module.exports = (id, options) => {
  //
  //  INITIALIZATION
  //

  const defaultOptions = {
    initialState: {}
  }
  const opts = Object.assign({}, defaultOptions, options)

  const refresh = (window.location.href.search(/\?refresh/) !== -1)
  if (refresh) {
    persistState.delete(id)
    window.location = window.location.href.split('?')[0]
  }
  const savedState = persistState.read(id)
  const initialState = savedState || opts.initialState

  const engine = createEngine(commands, reducers, initialState)
  let currentHistoryItem = -1
  ;(() => {})(currentHistoryItem) // this line is a workaround for an incorrectly issued linter error
  const element = createElement(id)

  basicStyling()

  //
  //  METHOD DEFINITIONS
  //

  const prompt = () => {
    currentHistoryItem = -1
    const state = engine.state()
    const userName = stack.latest(state.sessions)
    const path = '/' + state.currentLocation.join('/')
    const html = [
      '<span class="text-green">' + entities.encode(userName) + '</span>',
      '<span class="text-lightgray">@</span>',
      '<span class="text-yellow">' + entities.encode(path) + '</span>'
    ].join('')
    element.prompt(html)
    element.focus()
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
    element.writeResponse(hello)
  }

  const flush = (additionalContent) => {
    const input = element.readInput()
    const text = input + (typeof additionalContent === 'string' ? additionalContent : '')
    element.writeInput(text)
    element.setInput('')
    return input
  }

  const terminate = () => {
    element.writeResponse('Bye bye.')
    element.freeze()
  }

  const print = (output) => {
    const outputAsHtml = output.reduce((rendered, line) => {
      return (rendered + render(line))
    }, '')
    element.writeResponse(outputAsHtml)
  }

  const propose = (line) => {
    element.setInput(line)
  }

  //
  // EVENT HANDLERS
  //

  element.onTab(() => {
    const input = element.readInput()
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
  })

  element.onCancel(() => {
    flush('^C')
    print([])
    prompt()
    propose('')
  })

  element.onArrowUp(() => {
    currentHistoryItem++
    const history = engine.state().history.reverse()
    if (currentHistoryItem > history.length - 1) currentHistoryItem = history.length - 1
    const old = typeof history[currentHistoryItem] === 'string' ? history[currentHistoryItem] : ''
    propose(old)
  })

  element.onArrowDown(() => {
    currentHistoryItem--
    const history = engine.state().history.reverse()
    if (currentHistoryItem < -1) currentHistoryItem = -1
    const old = typeof history[currentHistoryItem] === 'string' ? history[currentHistoryItem] : ''
    propose(old)
  })

  element.onReturn(() => {
    const input = flush()
    const {output} = engine.evaluate(input)
    print(output)
    const state = engine.state()
    if (!state) {
      terminate()
      return
    }
    persistState.save(id, state)
    prompt()
  })

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
