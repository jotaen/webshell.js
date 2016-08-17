'use strict'

const makePathFromString = require('../makePathFromString')
const action = require('../actions')

module.exports = (args, print, state, dispatch) => {
  const currentLocation = state.currentLocation
  const path = makePathFromString(args[0], currentLocation)
  dispatch(action.changeLocation(path))
}
