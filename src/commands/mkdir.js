'use strict'

const makePathFromString = require('../makePathFromString')
const action = require('../actions')
const filesystem = require('../filesystem')

module.exports = (input, terminal, state, dispatch) => {
  const currentLocation = state.currentLocation
  const path = makePathFromString(input, currentLocation)
  const tree = state.fileTree
  const destination = path.slice(0, -1)
  if (!filesystem.isDirectory(tree, destination)) {
    const pathString = '/' + path.join('/')
    terminal.print(pathString + ': No such file or directory')
    return
  }
  try {
    dispatch(action.createDirectory(path))
  } catch (e) {
    const pathString = '/' + path.join('/')
    if (e.message === 'ALREADY_EXISTS') terminal.print(pathString + ': File or folder already exists')
  }
}
