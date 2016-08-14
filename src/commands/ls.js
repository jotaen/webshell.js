'use strict'

const filesystem = require('../filesystem')
const makePathFromString = require('../makePathFromString')

module.exports = (input, terminal, state) => {
  const tree = state.fileTree
  const currentLocation = state.currentLocation
  let location = []
  if (input) location = makePathFromString(input, currentLocation)
  else location = currentLocation

  if (!filesystem.isDirectory(tree, location)) {
    const pathString = '/' + location.join('/')
    terminal.print('ls: ' + pathString + ': No such file or directory')
    return
  }

  const targetDirectory = filesystem.find(tree, location)
  Object.keys(targetDirectory).sort().forEach((node) => {
    terminal.print(node)
    if (typeof tree[node] === 'object') terminal.print('/')
    terminal.print('\n')
  })
}
