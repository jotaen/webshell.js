'use strict'

const tree = require('../tree')

module.exports = (state, action) => {
  switch(action.type) {
    case 'CHANGE_DIRECTORY':
      const path = action.targetDir
      const target = tree.find(state.filesystem, path)
      if (! target) throw new Error('NOT_FOUND')
      if (! tree.isBranchPoint(target)) throw new Error('NOT_A_DIRECTORY')
      return Object.assign({}, state, {workingDir: path})
    default:
      return state
  }
}
