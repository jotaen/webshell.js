'use strict'

const makePathFromString = require('../makePathFromString')
const action = require('../actions')
const filesystem = require('../filesystem')

module.exports = (args, terminal, store) => {
  const currentLocation = store.getState().currentLocation
  const path = makePathFromString(args[0], currentLocation)
  const tree = store.getState().directoryStructure
  const destination = path.slice(0, -1)
  if (!filesystem.isDirectory(tree, destination)) {
    const pathString = '/' + path.join('/')
    terminal.print(pathString + ': No such file or directory')
    return
  }
  try {
    store.dispatch(action.createDirectory(path))
  } catch (e) {
    const pathString = '/' + path.join('/')
    if (e.message === 'ALREADY_EXISTS') terminal.print(pathString + ': File or folder already exists')
  }
}
