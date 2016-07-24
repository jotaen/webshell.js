'use strict'

const tree = require('../tree')

module.exports = (state, action) => {
  switch(action.type) {
    case 'CHANGE_DIRECTORY':
      const path = action.targetDir
      if (tree.find(state.filesystem, path)) return Object.assign({}, state, {workingDir: path})
      return state
    default:
      return state
  }
}
