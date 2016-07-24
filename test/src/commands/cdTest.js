'use strict'

const assert = require('assert')
const cd = require('../../../src/commands/cd')
const buffer = require('../../buffer')
const filesystem = require('../../../src/reducers/filesystem')
const createStore = require('redux').createStore
const initialState = require('../../initialState')

describe('#cd (change filesystem)', () => {
  it('change the current working filesystem', () => {
    const store = createStore(filesystem, initialState.simple())
    const newPath = '/usr/local/'
    cd(newPath, buffer, store)
    assert.deepEqual(store.getState().workingDir, ['usr', 'local'])
  })
})
