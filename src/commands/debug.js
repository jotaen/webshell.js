'use strict'

module.exports = (input, terminal, state) => {
  if (input === 'state') {
    const state = JSON.stringify(state, null, 2)
    terminal.print(state)
  }
}
