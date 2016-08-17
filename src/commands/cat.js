'use strict'

const makePathFromString = require('../makePathFromString')
const filesystem = require('../filesystem')
const CommandError = require('../errors')

module.exports = (args, print, state) => {
  if (args.length === 0) {
    print('usage: cat [filename]')
    return
  }
  const tree = state.fileTree
  const currentLocation = state.currentLocation
  const path = makePathFromString(args[0], currentLocation)
  const node = filesystem.find(tree, path)
  if (node === undefined) throw new CommandError.PathNotFound(path)
  if (!filesystem.isFile(tree, path)) throw new CommandError.NotAFile(path)
  print(node)
}
