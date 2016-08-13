'use strict'

const filesystem = require('../filesystem')
const makePathFromString = require('../makePathFromString')

module.exports = (input, terminal, store) => {
  const tree = store.getState().fileTree
  const currentLocation = store.getState().currentLocation
  let location = []
  if (input) location = makePathFromString(input, currentLocation)
  else location = store.getState().currentLocation
  const targetDirectory = filesystem.find(tree, location)

  Object.keys(targetDirectory).sort().map((node) => {
    terminal.print(node)
    if (typeof tree[node] === 'object') terminal.print('/')
    terminal.print('\n')
  })
}
