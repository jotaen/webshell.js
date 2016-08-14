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

const isStateOkay = (state) => {
  if (state.sessions.length === 0) return false
  return true
}

module.exports = (initialState) => {
  const state = Object.assign(defaultState(), initialState)
  const store = createStore(reducers, state)
  let nextCommand
  return (line, buffer) => {
    buffer.reset()
    const statement = splitStatement(line)
    store.dispatch(action.activity())
    const frozenState = Object.freeze(store.getState())
    if (typeof nextCommand === 'function') {
      nextCommand = nextCommand(statement.input, buffer, frozenState, store.dispatch)
    } else if (typeof commands[statement.command] === 'function') {
      store.dispatch(action.saveInput(statement.raw))
      nextCommand = commands[statement.command](statement.input, buffer, frozenState, store.dispatch)
    } else if (statement.command !== '') {
      buffer.print(statement.command + ': command not found')
    }

    if (isStateOkay(store.getState())) return Object.freeze(store.getState())
  }
}
