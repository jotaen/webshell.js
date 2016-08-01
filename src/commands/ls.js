'use strict'

const filesystem = require('../filesystem')
const process = require('../process')

module.exports = (input, terminal, store) => {
  const tree = store.getState().directoryStructure
  let path = []
  if (input) path = process.path(input)
  else path = store.getState().currentLocation
  const targetDirectory = filesystem.find(tree, path)

  Object.keys(targetDirectory).sort().map((node) => {
    terminal.print(node)
    if (typeof tree[node] === 'object') terminal.print('/')
    terminal.print('\n')
  })
}
