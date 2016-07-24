'use strict'

const assert = require('assert')
const filesystem = require('../../../src/reducers/filesystem')
const createStore = require('redux').createStore

const setup = () => {
  const initialState = {
    filesystemTree: {
      'bin': {},
      'etc': {},
      'usr': {},
      'var': {}
    },
    workingDirectory: '/'
  }
  return createStore(filesystem, initialState)
}

describe('#filesystem', () => {
  it('change the current working directory', () => {
    const store = setup()

    const newPath = '/bin'
    store.dispatch({
      type: 'CHANGE',
      workingDirectory: newPath
    })

    assert(store.getState().workingDirectory === newPath)
  })
})
