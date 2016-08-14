'use strict'

module.exports = (defaultStyle) => {
  let storage = ''
  let style = defaultStyle
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

  buffer.color = (colorCode) => {
    style.color = colorCode
  }

  buffer.font = (style) => {
    style.font = style
  }

  buffer.reset = () => {
    style = defaultStyle
  }

  return buffer
}
