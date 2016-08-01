'use strict'

const path = require('../path')
const action = require('../actions')

module.exports = (input, terminal, store) => {
  const location = path.split(input)
  try {
    store.dispatch(action.changeLocation(location))
  } catch (e) {
    const pathString = '/' + location.join('/')
    if (e.message === 'NOT_FOUND') terminal.print(pathString + ': No such file or directory')
    if (e.message === 'NOT_A_DIRECTORY') terminal.print(pathString + ': Not a directory')
  }
}
