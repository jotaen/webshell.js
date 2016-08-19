'use strict'

const makePathFromString = require('../makePathFromString')
const action = require('../actions')
const filesystem = require('../filesystem')
const CommandError = require('../errors')

exports.help = ({
  description: 'Create a new directory',
  usage: 'mkdir [directory]'
})

exports.main = (args, print, state, dispatch) => {
  const currentLocation = state.currentLocation
  const path = makePathFromString(args[0], currentLocation)
  const tree = state.fileTree
  const destination = path.slice(0, -1)
  if (!filesystem.isDirectory(tree, destination)) throw new CommandError.NotADirectory(destination)
  dispatch(action.createDirectory(path))
}
