'use strict'

const defaultState = require('../defaultState')
const createBuffer = require('../buffer/textBuffer.js')
const createStore = require('redux').createStore
const reducers = require('../reducers/index')
const commands = require('../commands/index')

const splitStatement = (line) => {
  const parts = line.split(' ')
  return {
    command: parts.shift(),
    input: parts.join(' ')
  }
}

module.exports = () => {
  const store = createStore(reducers, defaultState(reducers))
  let nextCommand
  return {
    execute: (line) => {
      const buffer = createBuffer()
      const statement = splitStatement(line)
      if (typeof nextCommand === 'function') {
        nextCommand = nextCommand(statement.input, buffer, store)
      } else if (typeof commands[statement.command] === 'function') {
        nextCommand = commands[statement.command](statement.input, buffer, store)
      } else if (statement.command !== '') {
        buffer.print(statement.command + ': command not found')
      }
      return buffer.get()
    },
    prompt: () => {
      const user = store.getState().currentUser
      const location = '/' + store.getState().currentLocation.join('/')
      return user + '@' + location + '$'
    }
  }
}
