'use strict'

const output = require('./output')

module.exports = () => {
  let buffer = ''
  let color = ''
  const terminal = {}

  terminal.print = (text) => {
    if (buffer === '') buffer = output.startLine()
    buffer += output.text(text, color)
    return terminal
  }

  terminal.nl = () => {
    buffer += output.endLine()
    return terminal
  }

  terminal.color = (hexCode) => {
    color = hexCode
    return terminal
  }

  terminal.reset = () => {
    color = '#000000'
    return terminal
  }

  terminal.flush = () => {
    const result = buffer
    buffer = ''
    return result
  }

  terminal.reset()
  return terminal
}
