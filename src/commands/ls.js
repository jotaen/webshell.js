'use strict'

const filesystem = require('../filesystem')
const makePathFromString = require('../makePathFromString')

module.exports = (args, terminal, store) => {
  const tree = store.getState().directoryStructure
  const currentLocation = store.getState().currentLocation
  let location = []
  if (args[0]) location = makePathFromString(args[0], currentLocation)
  else location = store.getState().currentLocation
  const targetDirectory = filesystem.find(tree, location)

  Object.keys(targetDirectory).sort().map((node) => {
    terminal.print(node)
    if (typeof tree[node] === 'object') terminal.print('/')
    terminal.print('\n')
  })
}
