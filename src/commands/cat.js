'use strict'

const makePathFromString = require('../makePathFromString')
const filesystem = require('../filesystem')

module.exports = (input, terminal, store) => {
  if (input === '') {
    terminal.print('usage: cat [filename]')
    return
  }
  const tree = store.getState().fileTree
  const currentLocation = store.getState().currentLocation
  const path = makePathFromString(input, currentLocation)
  const node = filesystem.find(tree, path)
  if (filesystem.isFile(tree, path)) {
    terminal.print(node)
  } else {
    terminal.print('cat: ' + input + ': Not a file')
  }
}
