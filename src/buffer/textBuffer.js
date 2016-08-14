'use strict'

module.exports = () => {
  let storage = ''
  const buffer = {}

  buffer.print = (output) => {
    storage += output
  }

  buffer.get = () => {
    return storage
  }

  buffer.clear = () => {
    storage = ''
  }

  return buffer
}
