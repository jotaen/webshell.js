'use strict'

const createRepl = require('./repl.js')

module.exports = (elementId) => {
  const inputElement = document.getElementById('webshell-current')
  const repl = createRepl()

  inputElement.insertAdjacentHTML('beforebegin', '<div class="prompt">' + repl.prompt() + '</div>')

  return {
    process: (event) => {
      if (event.keyCode !== 13) return
      const input = inputElement.innerHTML
      inputElement.insertAdjacentHTML('beforebegin', '<div class="input">' + input + '</div>')
      inputElement.innerHTML = ''
      const response = repl.execute(input)
      inputElement.insertAdjacentHTML('beforebegin', '<div class="response">' + response + '</div>')
      const prompt = repl.prompt()
      inputElement.insertAdjacentHTML('beforebegin', '<div class="prompt">' + prompt + '</div>')
      return false
    }
  }
}
