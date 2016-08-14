'use strict'

const makeClasses = (font) => {
  let result = 'webshell__text'
  result += ' '
  result += 'webshell__text--' + font.color
  result += ' '
  result += 'webshell__text--' + font.weight
  result += ' '
  result += 'webshell__text--' + font.style
  return result
}

module.exports = (defaultStyle) => {
  let storage = ''
  let font = {}
  const buffer = {}

  buffer.print = (output) => {
    storage += '<span class="' + makeClasses(font) + '">' + output + '</span>'
    return buffer
  }

  buffer.flush = () => {
    const oldStorage = storage
    storage = ''
    return oldStorage
  }

  buffer.color = (color) => {
    font.color = color
    return buffer
  }

  buffer.style = (style) => {
    font.style = style
    return buffer
  }

  buffer.weight = (weight) => {
    font.weight = weight
    return buffer
  }

  buffer.reset = () => {
    font = Object.assign({
      color: 'white',
      weight: 'normal',
      style: 'normal'
    }, defaultStyle)
  }

  buffer.reset()
  return buffer
}
