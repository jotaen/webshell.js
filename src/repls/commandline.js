'use strict'

const createBuffer = require('../buffer/textBuffer.js')
const createEvaluator = require('../evaluator.js')
const util = require('./util')

module.exports = (stdin, stdout, initialState) => {
  stdin.resume()
  stdin.setEncoding('utf8')
  const evaluator = createEvaluator(initialState)
  const buffer = createBuffer()

  stdin.on('data', (line) => {
    const input = line.replace(/(\r\n|\n|\r)/gm, '')
    const state = evaluator(input, buffer)
    const response = buffer.flush()
    stdout.write(response)
    if (!state) {
      stdout.write('\nBye bye.\n')
      process.exit(0)
    }
    util.prompt(buffer, state)
    const ps1 = buffer.flush()
    let newline = '\n'
    if (response === '') newline = ''
    stdout.write(newline + ps1 + ' ')
  })

  util.welcome(buffer, initialState)
  const hello = buffer.flush()
  stdout.write(hello + '\n')
  util.prompt(buffer, initialState)
  const ps1 = buffer.flush()
  stdout.write(ps1 + '$ ')
}
