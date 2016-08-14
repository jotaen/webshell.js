'use strict'

const defaultState = require('./defaultState')
const createStore = require('redux').createStore
const reducers = require('./reducers/index')
const commands = require('./commands/index')
const action = require('./actions')

const splitStatement = (line) => {
  const parts = line.split(' ')
  return {
    raw: line,
    command: parts.shift(),
    input: parts.join(' ')
  }
}

module.exports = (initialState) => {
  const state = Object.assign(defaultState(), initialState)
  const store = createStore(reducers, state)
  let nextCommand
  return (line, buffer) => {
    buffer.reset()
    const statement = splitStatement(line)
    store.dispatch(action.activity())
    if (typeof nextCommand === 'function') {
      nextCommand = nextCommand(statement.input, buffer, store)
    } else if (typeof commands[statement.command] === 'function') {
      store.dispatch(action.saveInput(statement.raw))
      nextCommand = commands[statement.command](statement.input, buffer, store)
    } else if (statement.command !== '') {
      buffer.print(statement.command + ': command not found')
    }
    return store.getState()
  }
}
