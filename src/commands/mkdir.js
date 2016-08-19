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
  args.forEach((pathString) => {
    const path = makePathFromString(pathString, state.currentLocation)
    const destination = path.slice(0, -1)
    if (!filesystem.isDirectory(state.fileTree, destination)) throw new CommandError.NotADirectory(destination)
    dispatch(action.createDirectory(path))
  })
}
