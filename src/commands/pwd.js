'use strict'

module.exports = (args, terminal, store) => {
  const location = store.getState().currentLocation
  const output = '/' + location.join('/')
  terminal.print(output)
}
