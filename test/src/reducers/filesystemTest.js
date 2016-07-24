'use strict'

const assert = require('assert')
const filesystem = require('../../../src/reducers/filesystem')
const createStore = require('redux').createStore
const initialState = require('../../initialState')

const setup = () => {
  return createStore(filesystem, initialState.simple())
}

describe('#filesystem', () => {
  it('change the current working directory', () => {
    const store = setup()
    const newPath = ['bin']
    store.dispatch({
      type: 'CHANGE_DIRECTORY',
      targetDir: newPath
    })
    const result = store.getState().workingDir
    assert.deepEqual(result, newPath)
  })

  it('not change the current working directory, if the target was not found', () => {
    const store = setup()
    const invalidPath = ['etc', 'init.d']
    store.dispatch({
      type: 'CHANGE_DIRECTORY',
      targetDir: invalidPath
    })
    const result = store.getState().workingDir
    assert.deepEqual(result, [])
  })
})
