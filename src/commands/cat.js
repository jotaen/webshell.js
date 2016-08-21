'use strict'

const makePathFromString = require('../makePathFromString')
const filesystem = require('../filesystem')
const CommandError = require('../errors')

exports.help = () => ({
  description: 'Concat and print out files',
  usage: 'cat [file, ...]'
})

exports.main = (args, print, state) => {
  if (args.length === 0) throw new CommandError.InvalidArgument()

  const content = args.reduce((result, pathString) => {
    const path = makePathFromString(pathString, state.currentLocation)
    const node = filesystem.find(state.fileTree, path)
    if (node === undefined) throw new CommandError.PathNotFound(path)
    if (!filesystem.isFile(state.fileTree, path)) throw new CommandError.NotAFile(path)
    return (result.concat(node))
  }, '')
  print(content)
}
