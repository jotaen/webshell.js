'use strict'

const assert = require('assert')
const cd = require('../../../src/commands/cd')
const buffer = require('../../buffer')
const filesystem = require('../../../src/reducers/filesystem')
const createStore = require('redux').createStore

describe('#cd (change filesystem)', () => {
  it('change the current working filesystem', () => {
    const initialState = {
      workingDirectory: '/'
    }
    let store = createStore(filesystem, initialState)
    const newPath = '/new/path'

    cd(newPath, buffer, store)

    assert(store.getState().workingDirectory === newPath)
  })
})
