'use strict'

const assert = require('assert')
const filesystem = require('../../../src/reducers/filesystem')
const createStore = require('redux').createStore
const sampleState = require('../../sampleState')
const action = require('../../../src/actions')

const setup = () => {
  return createStore(filesystem, sampleState.simple())
}

describe('#filesystem', () => {
  it('change the current working directory', () => {
    const store = setup()
    const newPath = ['bin']
    store.dispatch(action.changeDirectory(newPath))
    const result = store.getState().workingDir
    assert.deepEqual(result, newPath)
  })

  it('not change the current working directory, if the target was not found', () => {
    const store = setup()
    const invalidPath = ['var', 'www']
    assert.throws(() => {
      store.dispatch(action.changeDirectory(invalidPath))
    }, /NOT_FOUND/)
    assert.deepEqual(store.getState().workingDir, [])
  })

  it('not change the current working directory, if the target is not a directory', () => {
    const store = setup()
    const invalidPath = ['etc', 'hosts']
    assert.throws(() => {
      store.dispatch(action.changeDirectory(invalidPath))
    }, /NOT_A_DIRECTORY/)
    assert.deepEqual(store.getState().workingDir, [])
  })
})
