'use strict'

module.exports = (input, print, state) => {
  const location = state.currentLocation
  const output = '/' + location.join('/')
  print(output)
}
