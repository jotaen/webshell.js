'use strict'

const assert = require('assert')
const mkdir = require('../../../src/commands/mkdir').main
const filesystem = require('../../../src/filesystem')
const createEnv = require('../../testingEnv')
const CommandError = require('../../../src/errors')

describe('#mkdir (make directory)', () => {
  it('should create a new directory at the current location', () => {
    const env = createEnv()
    const args = ['temp']
    mkdir(args, env.buffer.print, env.frozenState, env.dispatch)
    const result = filesystem.find(env.store.getState().fileTree, ['temp'])
    assert.deepEqual(result, {})
  })

  it('should create a new directory at an arbitrary (existing) location', () => {
    const env = createEnv()
    const args = ['/usr/local/bin']
    mkdir(args, env.buffer.print, env.frozenState, env.dispatch)
    const result = filesystem.find(env.store.getState().fileTree, ['usr', 'local', 'bin'])
    assert.deepEqual(result, {})
  })

  it('should create multiple directories', () => {
    const env = createEnv()
    const args = ['/usr/local/bin', '/asdf', 'etc/test']
    mkdir(args, env.buffer.print, env.frozenState, env.dispatch)
    const result1 = filesystem.find(env.store.getState().fileTree, ['usr', 'local', 'bin'])
    assert.deepEqual(result1, {})
    const result2 = filesystem.find(env.store.getState().fileTree, ['asdf'])
    assert.deepEqual(result2, {})
    const result3 = filesystem.find(env.store.getState().fileTree, ['etc', 'test'])
    assert.deepEqual(result3, {})
  })

  it('shouldn’t create a directory, when there is already one existing', () => {
    const env = createEnv()
    const args = ['/usr']
    assert.throws(() => {
      mkdir(args, env.buffer.print, env.frozenState, env.dispatch)
    }, CommandError.PathAlreadyExists)
  })

  it('shouldn’t create a directory at non-existing locations', () => {
    const env = createEnv()
    const args = ['/var/www']
    assert.throws(() => {
      mkdir(args, env.buffer.print, env.frozenState, env.dispatch)
    }, CommandError.PathNotExists)
  })
})
