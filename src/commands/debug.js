'use strict'

module.exports = (input, print, state) => {
  if (input === 'state') {
    const serializedState = JSON.stringify(state, null, 2)
    print(serializedState)
  }
}
