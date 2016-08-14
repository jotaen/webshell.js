'use strict'

module.exports = (input, terminal, state) => {
  const location = state.currentLocation
  const output = '/' + location.join('/')
  terminal.print(output)
}
