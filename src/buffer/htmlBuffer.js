'use strict'

const makeStyles = (font) => {
  let result = ''
  result += 'color:' + font.color
  result += ';font-weight:' + font.weight
  result += ';font-style:' + font.style
  return result
}

module.exports = (defaultStyle) => {
  let storage = ''
  const font = Object.assign({
    color: '#fff',
    weight: 'normal',
    style: 'normal'
  }, defaultStyle)
  const buffer = {}

  buffer.print = (output) => {
    storage += '<span style="' + makeStyles(font) + '">' + output + '</span>'
    return buffer
  }

  buffer.flush = () => {
    const oldStorage = storage
    storage = ''
    return oldStorage
  }

  buffer.color = (colorCode) => {
    font.color = colorCode
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

  return buffer
}
