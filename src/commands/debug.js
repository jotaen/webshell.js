'use strict'

module.exports = (input, terminal, state) => {
  if (input === 'state') {
    const serializedState = JSON.stringify(state, null, 2)
    terminal.print(serializedState)
  }
}
