'use strict'

const makePathFromString = require('../makePathFromString')
const action = require('../actions')

module.exports = (input, terminal, state, dispatch) => {
  const currentLocation = state.currentLocation
  const path = makePathFromString(input, currentLocation)
  try {
    dispatch(action.changeLocation(path))
  } catch (e) {
    const pathString = '/' + path.join('/')
    if (e.message === 'NOT_FOUND') terminal.print(pathString + ': No such file or directory')
    if (e.message === 'NOT_A_DIRECTORY') terminal.print(pathString + ': Not a directory')
  }
}
