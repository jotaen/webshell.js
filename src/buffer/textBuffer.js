'use strict'

module.exports = () => {
  let storage = ''
  const buffer = {}

  buffer.print = (output) => {
    storage += output
    return buffer
  }

  buffer.flush = () => {
    const oldStorage = storage
    storage = ''
    return oldStorage
  }
  buffer.color = () => buffer
  buffer.style = () => buffer
  buffer.weight = () => buffer
  buffer.reset = () => buffer

  return buffer
}
