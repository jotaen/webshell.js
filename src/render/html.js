'use strict'

const text = (input) => {
  return '<div>' + input + '</div>'
}

const list = (input) => {
  const items = input.reduce((result, item) => {
    result += '<li class="list-item">' + item + '</li>'
    return result
  }, '')
  return '<ul class="list">' + items + '</ul>'
}

module.exports = (input) => {
  if (input === undefined) return '<div>&nbsp;</div>'
  else if (typeof input === 'string') return text(input)
  else if (Array.isArray(input)) return list(input)
}
