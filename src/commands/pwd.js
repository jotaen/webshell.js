'use strict'

module.exports = (input, terminal, store) => {
  const location = store.getState().currentLocation
  const output = '/' + location.join('/')
  terminal.print(output)
}
