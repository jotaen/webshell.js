'use strict'

const text = (input) => {
  return input
}

const list = (input) => {
  return input.reduce((result, item) => {
    return (result + item + '\n')
  }, '')
}

module.exports = (input) => {
  if (typeof input === 'string') return text(input)
  else if (Array.isArray(input)) return list(input)
}
