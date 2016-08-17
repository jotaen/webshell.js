'use strict'

const filesystem = require('../filesystem')
const makePathFromString = require('../makePathFromString')

module.exports = (input, print, state) => {
  const tree = state.fileTree
  const currentLocation = state.currentLocation
  let location = []
  if (input) location = makePathFromString(input, currentLocation)
  else location = currentLocation

  if (!filesystem.isDirectory(tree, location)) {
    const pathString = '/' + location.join('/')
    print('ls: ' + pathString + ': No such file or directory')
    return
  }

  const targetDirectory = filesystem.find(tree, location)
  Object.keys(targetDirectory).sort().forEach((node) => {
    let suffix = ''
    if (typeof tree[node] === 'object') suffix = '/'
    print(node + suffix)
  })
}
