'use strict'

const filesystem = require('../filesystem')
const makePathFromString = require('../makePathFromString')
const CommandError = require('../errors')

exports.help = ({
  description: 'List the content of a directory',
  usage: 'ls [directory]'
})

exports.main = (args, print, state) => {
  const tree = state.fileTree
  const currentLocation = state.currentLocation
  let path = []
  if (args.length > 0) path = makePathFromString(args[0], currentLocation)
  else path = currentLocation

  if (!filesystem.find(tree, path)) throw new CommandError.PathNotFound(path)
  if (!filesystem.isDirectory(tree, path)) throw new CommandError.NotADirectory(path)

  const targetDirectory = filesystem.find(tree, path)
  const result = Object.keys(targetDirectory).sort().map((node) => {
    let suffix = ''
    const nodePath = path.concat(node)
    if (filesystem.isDirectory(tree, nodePath)) suffix = '/'
    return node + suffix
  })
  print(result)
}
