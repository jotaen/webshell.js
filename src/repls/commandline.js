'use strict'

const createBuffer = require('../buffer/textBuffer.js')
const createEngine = require('../engine.js')

module.exports = (stdin, stdout, initialState) => {
  stdin.resume()
  stdin.setEncoding('utf8')
  const engine = createEngine(initialState)
  const buffer = createBuffer()

  stdin.on('data', (line) => {
    const input = line.replace(/(\r\n|\n|\r)/gm, '')
    engine.execute(input, buffer)
    const response = buffer.flush()
    stdout.write(response)
    engine.prompt(buffer)
    let newline = '\n'
    if (response === '') newline = ''
    stdout.write(newline + buffer.flush() + ' ')
  })

  engine.prompt(buffer)
  stdout.write(buffer.flush() + ' ')
}
