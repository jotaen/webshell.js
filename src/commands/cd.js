'use strict'

const makePathFromString = require('../makePathFromString')
const action = require('../actions')

module.exports = (args, terminal, store) => {
  const currentLocation = store.getState().currentLocation
  const path = makePathFromString(args[0], currentLocation)
  try {
    store.dispatch(action.changeLocation(path))
  } catch (e) {
    const pathString = '/' + path.join('/')
    if (e.message === 'NOT_FOUND') terminal.print(pathString + ': No such file or directory')
    if (e.message === 'NOT_A_DIRECTORY') terminal.print(pathString + ': Not a directory')
  }
}
