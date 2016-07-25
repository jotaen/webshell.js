'use strict'

const tree = require('../tree')

module.exports = (state, action) => {
  const path = action.targetDir
  switch(action.type) {
    case 'CHANGE_DIRECTORY':
      const target = tree.find(state.filesystem, path)
      if (! target) throw new Error('NOT_FOUND')
      if (! tree.isBranchPoint(target)) throw new Error('NOT_A_DIRECTORY')
      return Object.assign({}, state, {workingDir: path})
    case 'CREATE_DIRECTORY':
      if (tree.find(state.filesystem, path)) throw new Error('ALREADY_EXISTS')
      const newTree = tree.insert(state.filesystem, path, {})
      return Object.assign({}, state, {filesystem: newTree})
    default:
      return state
  }
}
