'use strict'

module.exports = (input, terminal, store) => {
  if (input === 'state') {
    const state = JSON.stringify(store.getState(), null, 2)
    terminal.print(state)
  }
}
