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
    let execute = () => {}
    if (typeof nextCommand === 'function') {
      execute = nextCommand
    } else if (typeof commands[statement.command] === 'function') {
      store.dispatch(action.saveInput(statement.raw))
      execute = commands[statement.command]
    } else if (statement.command !== '') {
      execute = () => { throw new Error('Command not found') }
    }

    try {
      nextCommand = execute(statement.input, buffer.print, frozenState, store.dispatch)
    } catch (e) {
      buffer.print(statement.command + ': ' + e.message)
    }

    return {
      output: buffer.get(),
      state: Object.freeze(store.getState())
    }
  }
}
