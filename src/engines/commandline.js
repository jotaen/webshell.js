'use strict'

const initialState = require('../initialState')
const createBuffer = require('../../test/buffer')
const createStore = require('redux').createStore
const reducers = require('../reducers/index')

const cd = require('../commands/cd')
const mkdir = require('../commands/mkdir')
const ls = require('../commands/ls')
const pwd = require('../commands/pwd')

const stdin = process.stdin
stdin.resume()
stdin.setEncoding('utf8')

const store = createStore(reducers, initialState(reducers))

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
  if (input.command === 'pwd') pwd(input.args, buffer, store)
  else if (input.command === 'cd') cd(input.args, buffer, store)
  else if (input.command === 'mkdir') mkdir(input.args, buffer, store)
  else if (input.command === 'ls') ls(input.args, buffer, store)
  else buffer.print(input.command + ': command not found')
  const output = buffer.get()
  const newline = output === '' ? '' : '\n'
  process.stdout.write(output + newline)
  prompt()
})

prompt()
