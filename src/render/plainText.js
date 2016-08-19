'use strict'

const text = (input) => {
  return input + '\n'
}

const list = (input) => {
  return input.reduce((result, item) => {
    return (result + item + '\n')
  }, '')
}

module.exports = (input) => {
  if (input === undefined) return '\n'
  else if (typeof input === 'string') return text(input)
  else if (Array.isArray(input)) return list(input)
}
