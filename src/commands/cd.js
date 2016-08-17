'use strict'

const makePathFromString = require('../makePathFromString')
const action = require('../actions')
const CustomError = require('../errors')

module.exports = (input, terminal, state, dispatch) => {
  const currentLocation = state.currentLocation
  const path = makePathFromString(input, currentLocation)
  try {
    dispatch(action.changeLocation(path))
  } catch (e) {
    const pathString = '/' + path.join('/')
    if (e instanceof CustomError.PathNotFound) terminal.print(pathString + ': No such file or directory')
    if (e instanceof CustomError.NotADirectory) terminal.print(pathString + ': Not a directory')
  }
}
