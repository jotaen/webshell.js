'use strict'

const assert = require('assert')
const mkdir = require('../../../src/commands/mkdir')
const filesystem = require('../../../src/filesystem')
const createBuffer = require('../../buffer')
const predefinedStore = require('../../predefinedStore')

describe('#mkdir (make directory)', () => {
  it('should create a new directory at the current location', () => {
    const store = predefinedStore()
    const newPath = '/temp'
    mkdir([newPath], createBuffer(), store)
    const result = filesystem.find(store.getState().directoryStructure, ['temp'])
    assert.deepEqual(result, {})
  })

  it('should create a new directory at an arbitrary (existing) location', () => {
    const store = predefinedStore()
    const newPath = '/usr/local/bin'
    mkdir([newPath], createBuffer(), store)
    const result = filesystem.find(store.getState().directoryStructure, ['usr', 'local', 'bin'])
    assert.deepEqual(result, {})
  })

  it('shouldn’t create a directory at non-existing locations', () => {
    const buffer = createBuffer()
    const store = predefinedStore()
    const newPath = '/var/www'
    mkdir([newPath], buffer, store)
    const output = buffer.get()
    assert(/No such file or directory/.test(output))
  })
})
