'use strict'

const assert = require('assert')
const mkdir = require('../../../src/commands/mkdir')
const filesystem = require('../../../src/filesystem')
const createEnv = require('../../testingEnv')
const CommandError = require('../../../src/errors')

describe('#mkdir (make directory)', () => {
  it('should create a new directory at the current location', () => {
    const env = createEnv()
    const newPath = 'temp'
    mkdir(newPath, env.buffer.print, env.frozenState, env.dispatch)
    const result = filesystem.find(env.store.getState().fileTree, ['temp'])
    assert.deepEqual(result, {})
  })

  it('should create a new directory at an arbitrary (existing) location', () => {
    const env = createEnv()
    const newPath = '/usr/local/bin'
    mkdir(newPath, env.buffer.print, env.frozenState, env.dispatch)
    const result = filesystem.find(env.store.getState().fileTree, ['usr', 'local', 'bin'])
    assert.deepEqual(result, {})
  })

  it('shouldn’t create a directory, when there is already one existing', () => {
    const env = createEnv()
    const newPath = '/usr'
    assert.throws(() => {
      mkdir(newPath, env.buffer.print, env.frozenState, env.dispatch)
    }, CommandError.PathAlreadyExists)
  })

  it('shouldn’t create a directory at non-existing locations', () => {
    const env = createEnv()
    const newPath = '/var/www'
    assert.throws(() => {
      mkdir(newPath, env.buffer.print, env.frozenState, env.dispatch)
    }, CommandError.PathNotExists)
  })
})
