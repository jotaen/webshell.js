'use strict'

const path = require('../path')
const action = require('../actions')
const filesystem = require('../filesystem')

module.exports = (input, terminal, store) => {
  const location = path.split(input)
  const tree = store.getState().directoryStructure
  const destination = location.slice(0, -1)
  if (!filesystem.isDirectory(tree, destination)) {
    const pathString = '/' + location.join('/')
    terminal.print(pathString + ': No such file or directory')
    return
  }
  try {
    store.dispatch(action.createDirectory(location))
  } catch (e) {
    const pathString = '/' + location.join('/')
    if (e.message === 'ALREADY_EXISTS') terminal.print(pathString + ': File or folder already exists')
  }
}
