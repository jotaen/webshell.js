'use strict'

const assert = require('assert')
const mkdir = require('../../../src/commands/mkdir')
const tree = require('../../../src/tree')
const createBuffer = require('../../buffer')
const filesystem = require('../../../src/reducers/filesystem')
const predefinedStore = require('../../predefinedStore')

describe('#mkdir (make directory)', () => {
  it('should create a new directory at the current location', () => {
    const store = predefinedStore.simple(filesystem)
    const newPath = '/temp'
    mkdir(newPath, createBuffer(), store)
    const result = tree.find(store.getState().filesystem, ['temp'])
    assert.deepEqual(result, {})
  })

  it('should create a new directory at an arbitrary (existing) location', () => {
    const store = predefinedStore.simple(filesystem)
    const newPath = '/usr/local/bin'
    mkdir(newPath, createBuffer(), store)
    const result = tree.find(store.getState().filesystem, ['usr', 'local', 'bin'])
    assert.deepEqual(result, {})
  })

  it('shouldn’t create a directory at non-existing locations', () => {
    const buffer = createBuffer()
    const store = predefinedStore.simple(filesystem)
    const newPath = '/var/www'
    mkdir(newPath, buffer, store)
    const output = buffer.get()
    assert(/No such file or directory/.test(output))
  })
})
