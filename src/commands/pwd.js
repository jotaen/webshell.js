'use strict'

module.exports = (args, print, state) => {
  const location = state.currentLocation
  const output = '/' + location.join('/')
  print(output)
}
