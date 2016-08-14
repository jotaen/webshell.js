'use strict'

const createRepl = require('./repl.js')

module.exports = (elementId) => {
  const webshellElement = document.getElementById(elementId)
  webshellElement.innerHTML = '<div class="webshell__input" id="' + elementId + '-current-input" contentEditable="true" onkeypress="return webshell.process(event)"></div>'
  const inputElement = document.getElementById(elementId + '-current-input')
  const repl = createRepl()

  inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__prompt">' + repl.prompt() + '</div>')

  return {
    process: (event) => {
      if (event.keyCode !== 13) return
      const input = inputElement.innerHTML
      inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__input">' + input + '</div>')
      inputElement.innerHTML = ''
      const response = repl.execute(input)
      inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__response">' + response + '</div>')
      const prompt = repl.prompt()
      inputElement.insertAdjacentHTML('beforebegin', '<div class="webshell__prompt">' + prompt + '</div>')
      return false
    }
  }
}
