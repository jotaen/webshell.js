'use strict'

const entities = require('html-entities').XmlEntities

module.exports = (id) => {
  const webshell = document.getElementById(id)
  webshell.innerHTML = '<div class="webshell-input webshell-input-current" id="' + id + '-cursor" contentEditable="true"></div>'
  const input = document.getElementById(id + '-cursor')
  const eventHandler = {
    onArrowDown: () => {},
    onArrowUp: () => {},
    onCancel: () => {},
    onReturn: () => {},
    onTab: () => {}
  }

  const scroll = () => {
    webshell.scrollTop = webshell.scrollHeight
  }

  const freeze = () => {
    webshell.removeChild(input)
  }

  const focus = () => {
    input.focus()
  }

  const prompt = (text) => {
    input.insertAdjacentHTML('beforebegin', '<div class="webshell-prompt">' + text + '</div>')
    scroll()
  }

  const readInput = () => {
    return entities.decode(input.innerHTML).replace(/&nbsp;/g, ' ')
  }

  const setInput = (text) => {
    input.innerHTML = !text ? '' : text
    if (text.length > 0) {
      const range = document.createRange()
      const sel = window.getSelection()
      range.setStart(input.childNodes[0], text.length)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
      focus()
    }
  }

  const writeResponse = (text) => {
    input.insertAdjacentHTML('beforebegin', '<div class="webshell-response">' + text + '</div>')
    scroll()
  }

  const writeInput = (text) => {
    input.insertAdjacentHTML('beforebegin', '<div class="webshell-input">' + entities.encode(text) + '</div>')
    scroll()
  }

  webshell.onclick = function (event) {
    if (event.target === webshell) focus()
  }

  input.onkeydown = function (event) {
    switch (event.keyCode) {
      case 13:
        eventHandler.onReturn()
        event.preventDefault()
        return false
      case 38:
        eventHandler.onArrowUp()
        event.preventDefault()
        return false
      case 40:
        eventHandler.onArrowDown()
        event.preventDefault()
        return false
      case 67:
        if (!event.ctrlKey) return true
        eventHandler.onCancel()
        event.preventDefault()
        return false
      case 9:
        eventHandler.onTab()
        event.preventDefault()
        return false
      default:
        return true
    }
  }

  return {
    freeze,
    focus,
    onArrowDown: (cb) => { eventHandler.onArrowDown = cb },
    onArrowUp: (cb) => { eventHandler.onArrowUp = cb },
    onCancel: (cb) => { eventHandler.onCancel = cb },
    onReturn: (cb) => { eventHandler.onReturn = cb },
    onTab: (cb) => { eventHandler.onTab = cb },
    prompt,
    readInput,
    setInput,
    writeInput,
    writeResponse
  }
}
