'use strict';

const process = require('../process')
const action = require('../actions')

module.exports = (input, terminal, store) => {
  const path = process.path(input)
  try {
    store.dispatch(action.changeDirectory(path))
  } catch(e) {
    const pathString = '/' + path.join('/')
    if (e.message === 'NOT_FOUND') terminal.print(pathString + ': No such file or directory')
    if (e.message === 'NOT_A_DIRECTORY') terminal.print(pathString + ': Not a directory')
  }
}
