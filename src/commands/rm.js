'use strict'

const makePathFromString = require('../makePathFromString')
const action = require('../actions')
const filesystem = require('../filesystem')
const Command = require('../errors')

exports.help = ({
  description: 'Remove a file or directory',
  usage: 'rm [path, ...]'
})

exports.main = (args, print, state, dispatch) => {
  const tree = state.fileTree
  args.forEach((pathString) => {
    const path = makePathFromString(pathString, state.currentLocation)
    const node = filesystem.find(tree, path)
    if (node === undefined) throw new Command.PathNotFound(path)
    dispatch(action.delete(path))
  })
}
