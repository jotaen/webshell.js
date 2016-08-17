'use strict'

const filesystem = require('../filesystem')
const makePathFromString = require('../makePathFromString')
const CommandError = require('../errors')

module.exports = (args, print, state) => {
  const tree = state.fileTree
  const currentLocation = state.currentLocation
  let path = []
  if (args.length > 0) path = makePathFromString(args[0], currentLocation)
  else path = currentLocation

  if (!filesystem.find(tree, path)) throw new CommandError.PathNotFound(path)
  if (!filesystem.isDirectory(tree, path)) throw new CommandError.NotADirectory(path)

  const targetDirectory = filesystem.find(tree, path)
  Object.keys(targetDirectory).sort().forEach((node) => {
    let suffix = ''
    if (typeof tree[node] === 'object') suffix = '/'
    print(node + suffix)
  })
}
