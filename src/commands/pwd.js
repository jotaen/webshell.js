'use strict'

module.exports = (input, terminal, store) => {
  const path = store.getState().currentLocation
  const output = '/' + path.join('/')
  terminal.print(output)
}
