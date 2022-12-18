'use strict'

const entities = require('html-entities').encode
const Autolinker = require('autolinker')

const out = (input) => {
  return Autolinker.link(
    entities(input),
    {
      newWindow: false,
      urls: { schemeMatches: true, wwwMatches: false, tldMatches: false },
      phone: false,
      hashtag: false,
      stripPrefix: false,
      stripTrailingSlash: false
    }
  )
}

const line = (input) => {
  return '<span>' + out(input) + '</span>'
}

const list = (input) => {
  const items = input.reduce((result, item) => {
    result += '<li class="webshell-list-item">' + out(item) + '</li>'
    return result
  }, '')
  return '<ul class="webshell-list">' + items + '</ul>'
}

module.exports = (input) => {
  if (input === undefined) return '<div>&nbsp;</div>'
  else if (typeof input === 'string') return line(input)
  else if (Array.isArray(input)) return list(input)
}
