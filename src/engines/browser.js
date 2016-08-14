'use strict'

const defaultState = require('../defaultState')
const createBuffer = require('../buffer/textBuffer.js')
const createStore = require('redux').createStore
const reducers = require('../reducers/index')
const commands = require('../commands/index')

module.exports = (elementId) => {
  const inputElement = document.getElementById('webshell-current')
  const store = createStore(reducers, defaultState(reducers))
  const webshell = {}
  let nextCommand

  const dispatch = (input) => {
    return input+': command not found'
    const buffer = createBuffer()
    if (typeof nextCommand === 'function') {
      nextCommand = nextCommand(input.arg, buffer, store)
    } else if (typeof commands[input.command] === 'function') {
      nextCommand = commands[input.command](input.arg, buffer, store)
    } else if (input.command !== '') {
      buffer.print(input.command + ': command not found')
    }
    return buffer.get()
  }

  webshell.process = (event) => {
    if (event.keyCode !== 13) return;
    const input = inputElement.innerHTML;
    inputElement.insertAdjacentHTML('beforebegin', '<div class="input">'+input+'</div>');
    inputElement.innerHTML = ''
    const response = dispatch(input)
    inputElement.insertAdjacentHTML('beforebegin', '<div class="response">'+response+'</div>');
    inputElement.insertAdjacentHTML('beforebegin', '<div class="prompt">jotaen@/$</div>');
    return false;
  }

  return webshell
}
