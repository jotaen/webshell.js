'use strict'

module.exports = (args, terminal, store) => {
  if (args[0] === 'state') {
    const state = JSON.stringify(store.getState(), null, 2)
    terminal.print(state)
  }
}
