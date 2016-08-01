'use strict'

const filesystem = require('../filesystem')
const path = require('../path')

module.exports = (input, terminal, store) => {
  const tree = store.getState().directoryStructure
  let location = []
  if (input) location = path.split(input)
  else location = store.getState().currentLocation
  const targetDirectory = filesystem.find(tree, location)

  Object.keys(targetDirectory).sort().map((node) => {
    terminal.print(node)
    if (typeof tree[node] === 'object') terminal.print('/')
    terminal.print('\n')
  })
}
