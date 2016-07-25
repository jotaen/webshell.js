'use strict';

const process = require('../process')
const action = require('../actions')
const tree = require('../tree')

module.exports = (input, terminal, store) => {
  const path = process.path(input)
  const targetDir = tree.find(store.getState().filesystem, path.slice(0, -1))
  if (!tree.isBranchPoint(targetDir)) {
    const pathString = '/' + path.join('/')
    terminal.print(pathString + ': No such file or directory')
    return
  }
  try {
    store.dispatch(action.createDirectory(path))
  } catch(e) {
    const pathString = '/' + path.join('/')
    if (e.message === 'ALREADY_EXISTS') terminal.print(pathString + ': File or folder already exists')
  }
}
