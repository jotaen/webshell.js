'use strict'

const makePathFromString = require('../makePathFromString')
const action = require('../actions')
const filesystem = require('../filesystem')
const CommandError = require('../errors')
const argparse = require('minimist')

exports.help = () => ({
  description: 'Create a new file',
  usage: 'put [filename] [content]'
})

exports.spec = () => ({
  boolean: ['amend', 'overwrite'],
  alias: {
    'a': 'amend',
    'c': 'overwrite'
  },
  default: {
    'amend': false,
    'overwrite': false
  }
})

exports.main = (args, print, state, dispatch) => {
  const opts = argparse(args, this.spec())
  const path = makePathFromString(opts._[0], state.currentLocation)
  const destination = path.slice(0, -1)
  if (!filesystem.isDirectory(state.fileTree, destination)) throw new CommandError.NotADirectory(destination)
  let content = ''
  if (opts.amend) {
    const previousContent = filesystem.find(state.fileTree, path)
    content = !previousContent ? '' : previousContent
  }
  if (opts.overwrite || opts.amend) dispatch(action.delete(path))
  content += opts._.slice(1).join(' ')
  dispatch(action.createFile(path, content))
}
