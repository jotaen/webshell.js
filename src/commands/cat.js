'use strict'

const makePathFromString = require('../makePathFromString')
const filesystem = require('../filesystem')

module.exports = (input, print, state) => {
  if (input === '') {
    print('usage: cat [filename]')
    return
  }
  const tree = state.fileTree
  const currentLocation = state.currentLocation
  const path = makePathFromString(input, currentLocation)
  const node = filesystem.find(tree, path)
  if (filesystem.isFile(tree, path)) {
    print(node)
  } else {
    print('cat: ' + input + ': Not a file')
  }
}
