'use strict';

const process = require('../process')

module.exports = (input, terminal, store) => {
  const path = process.path(input)
  store.dispatch({
    type: 'CHANGE_DIRECTORY',
    targetDir: path
  })
}
