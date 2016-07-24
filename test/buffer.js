'use strict'

module.exports = () => {
  let stream = ''
  const buffer = {}

  buffer.print = (output) => {
    stream += output
  }

  buffer.get = () => {
    return stream
  }

  return buffer
}
