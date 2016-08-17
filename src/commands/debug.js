'use strict'

module.exports = (args, print, state) => {
  if (args[0] === 'state') {
    const serializedState = JSON.stringify(state, null, 2)
    print(serializedState)
  }
}
