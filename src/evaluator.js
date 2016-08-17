'use strict'

const createStore = require('redux').createStore
const action = require('./actions')
const createBuffer = require('./buffer')

const splitStatement = (line) => {
  const parts = line.split(' ')
  return {
    raw: line,
    command: parts.shift(),
    input: parts.join(' ')
  }
}

module.exports = (commands, reducers, initialState) => {
  const store = createStore(reducers, initialState)
  let nextCommand
  return (line) => {
    const buffer = createBuffer()
    const statement = splitStatement(line)
    store.dispatch(action.activity())
    const frozenState = Object.freeze(store.getState())
    if (typeof nextCommand === 'function') {
      nextCommand = nextCommand(statement.input, buffer.print, frozenState, store.dispatch)
    } else if (typeof commands[statement.command] === 'function') {
      store.dispatch(action.saveInput(statement.raw))
      nextCommand = commands[statement.command](statement.input, buffer.print, frozenState, store.dispatch)
    } else if (statement.command !== '') {
      buffer.print(statement.command + ': command not found')
    }

    return {
      output: buffer.get(),
      state: Object.freeze(store.getState())
    }
  }
}
