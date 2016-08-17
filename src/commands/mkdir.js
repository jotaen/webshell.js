'use strict'

const makePathFromString = require('../makePathFromString')
const action = require('../actions')
const filesystem = require('../filesystem')
const CustomError = require('../errors')

module.exports = (input, print, state, dispatch) => {
  const currentLocation = state.currentLocation
  const path = makePathFromString(input, currentLocation)
  const tree = state.fileTree
  const destination = path.slice(0, -1)
  if (!filesystem.isDirectory(tree, destination)) throw new CustomError.NotADirectory(destination)
  dispatch(action.createDirectory(path))
}
