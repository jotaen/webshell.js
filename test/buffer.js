'use strict'

let buffer = ''

exports.print = (output) => {
  buffer += output
}

exports.get = () => {
  return buffer
}
