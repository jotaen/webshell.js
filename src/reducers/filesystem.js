'use strict'

const tree = require('../tree')

const handler = {}

handler.CHANGE_DIRECTORY = (state, action) => {
  const path = action.targetDir
  const target = tree.find(state.filesystem, path)
  if (! target) throw new Error('NOT_FOUND')
  if (! tree.isBranchPoint(target)) throw new Error('NOT_A_DIRECTORY')
  return Object.assign({}, state, {workingDir: path})
}

handler.CREATE_DIRECTORY = (state, action) => {
  const path = action.targetDir
  if (tree.find(state.filesystem, path)) throw new Error('ALREADY_EXISTS')
  const newTree = tree.insert(state.filesystem, path, {})
  return Object.assign({}, state, {filesystem: newTree})
}

handler.CREATE_FILE = (state, action) => {
  const path = action.targetDir
  if (tree.find(state.filesystem, path)) throw new Error('ALREADY_EXISTS')
  const newTree = tree.insert(state.filesystem, path, action.content)
  return Object.assign({}, state, {filesystem: newTree})
}

module.exports = (state, action) => {
  if (handler[action.type]) {
    return handler[action.type](state, action)
  }
  return state
}
