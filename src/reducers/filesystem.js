'use strict'

const filesystem = require('../filesystem')
const CommandError = require('../errors')

exports.CHANGE_LOCATION = (state, action) => {
  const path = action.path
  const tree = state.fileTree
  const target = filesystem.find(tree, path)
  if (!target) throw new CommandError.PathNotFound(path)
  if (!filesystem.isDirectory(tree, path)) throw new CommandError.NotADirectory(path)
  return Object.assign({}, state, {currentLocation: path})
}

exports.CREATE_PATH = (state, action) => {
  const path = action.path
  const tree = state.fileTree
  if (filesystem.find(tree, path)) throw new CommandError.PathAlreadyExists(path)
  const newTree = filesystem.insert(tree, path, action.content)
  return Object.assign({}, state, {fileTree: newTree})
}
