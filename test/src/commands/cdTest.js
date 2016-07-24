'use strict'

const assert = require('assert')
const cd = require('../../../src/commands/cd')
const createBuffer = require('../../buffer')
const filesystem = require('../../../src/reducers/filesystem')
const createStore = require('redux').createStore
const initialState = require('../../initialState')

describe('#cd (change filesystem)', () => {
  it('should change the current working filesystem', () => {
    const store = createStore(filesystem, initialState.simple())
    const buffer = createBuffer()
    const newPath = '/usr/local/'
    cd(newPath, buffer, store)
    const output = buffer.get()
    const result = store.getState().workingDir
    const expect = ['usr', 'local']
    assert(output === '')
    assert.deepEqual(result, expect)
  })

  it('should change the current working filesystem, even if input is "dirty"', () => {
    const store = createStore(filesystem, initialState.simple())
    const buffer = createBuffer()
    const newPath = '////usr///local//'
    cd(newPath, buffer, store)
    const output = buffer.get()
    const result = store.getState().workingDir
    const expect = ['usr', 'local']
    assert(output === '')
    assert.deepEqual(result, expect)
  })

  it('should not change the current working filesystem, if target does not exist', () => {
    const store = createStore(filesystem, initialState.simple())
    const buffer = createBuffer()
    const newPath = '/path/that/does/not/exist'
    cd(newPath, buffer, store)
    const output = buffer.get()
    assert(/No such file or directory/.test(output))
    assert.deepEqual(store.getState().workingDir, [])
  })

  it('should not change the current working filesystem, if target is a file', () => {
    const store = createStore(filesystem, initialState.simple())
    const buffer = createBuffer()
    const newPath = '/etc/hosts'
    cd(newPath, buffer, store)
    const output = buffer.get()
    assert(/Not a directory/.test(output))
    assert.deepEqual(store.getState().workingDir, [])
  })
})
