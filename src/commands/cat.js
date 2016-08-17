'use strict'

const makePathFromString = require('../makePathFromString')
const filesystem = require('../filesystem')
const CommandError = require('../errors')

module.exports = (input, print, state) => {
  if (input === '') {
    print('usage: cat [filename]')
    return
  }
  const tree = state.fileTree
  const currentLocation = state.currentLocation
  const path = makePathFromString(input, currentLocation)
  const node = filesystem.find(tree, path)
  if (!node) throw new CommandError.PathNotFound(path)
  if (!filesystem.isFile(tree, path)) throw new CommandError.NotAFile(path)
  print(node)
}
