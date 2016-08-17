'use strict'

const makePathFromString = require('../makePathFromString')
const action = require('../actions')

module.exports = (input, print, state, dispatch) => {
  const currentLocation = state.currentLocation
  const path = makePathFromString(input, currentLocation)
  dispatch(action.changeLocation(path))
}
