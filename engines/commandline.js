'use strict'

const defaultState = require('../src/defaultState')
const createBuffer = require('../test/buffer')
const createStore = require('redux').createStore
const reducers = require('../src/reducers/index')
const commands = require('../src/commands/index')

const stdin = process.stdin
stdin.resume()
stdin.setEncoding('utf8')

const store = createStore(reducers, defaultState(reducers))

const splitInput = (line) => {
  const parts = line.split(' ')
  return {
    command: parts.shift(),
    args: parts
  }
}

const prompt = () => {
  const location = store.getState().currentLocation.join('/')
  const ps1 = '/' + location + '$ '
  process.stdout.write(ps1)
}

stdin.on('data', (line) => {
  const sanitizedLine = line.replace(/(\r\n|\n|\r)/gm, '')
  const input = splitInput(sanitizedLine)
  const buffer = createBuffer()
  if (typeof commands[input.command] === 'function') {
    commands[input.command](input.args, buffer, store)
  } else {
    buffer.print(input.command + ': command not found')
  }
  const output = buffer.get()
  const newline = output === '' ? '' : '\n'
  process.stdout.write(output + newline)
  prompt()
})

prompt()
