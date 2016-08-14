'use strict'

module.exports = () => {
  let storage = ''
  const buffer = {}

  buffer.print = (output) => {
    storage += output
    return buffer
  }

  buffer.flush = () => storage
  buffer.color = () => buffer
  buffer.style = () => buffer
  buffer.weight = () => buffer

  return buffer
}
