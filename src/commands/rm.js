'use strict'

const makePathFromString = require('../makePathFromString')
const action = require('../actions')
const filesystem = require('../filesystem')
const Command = require('../errors')

module.exports = (args, print, state, dispatch) => {
  const tree = state.fileTree
  const pathes = args.map((pathString) => {
    const path = makePathFromString(pathString, state.currentLocation)
    const node = filesystem.find(tree, path)
    if (node === undefined) throw new Command.PathNotFound(path)
    return path
  })
  pathes.forEach((path) => {
    dispatch(action.delete(path))
  })
}
