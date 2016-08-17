'use strict'

module.exports = () => {
  let storage = []
  const buffer = {}

  buffer.print = (output) => {
    storage.push(output)
  }

  buffer.get = () => {
    return storage
  }

  return buffer
}
