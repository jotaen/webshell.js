'use strict'

const assert = require('assert')
const put = require('../../../src/commands/put').main
const filesystem = require('../../../src/filesystem')
const createEnv = require('../../testingEnv')
const CommandError = require('../../../src/errors')

describe('#put (create file)', () => {
  it('should create a new file at the current location', () => {
    const env = createEnv()
    const pathString = 'hello-world.txt'
    const args = [pathString, 'Hello', 'World']
    put(args, env.buffer.print, env.frozenState, env.dispatch)
    const result = filesystem.find(env.store.getState().fileTree, [pathString])
    assert.strictEqual(result, 'Hello World')
  })

  it('should create a new file at an arbitrary (existing) location', () => {
    const env = createEnv()
    const pathString = '/etc/config.json'
    const path = ['etc', 'config.json']
    const content = '{"something": true}'
    put([pathString, content], env.buffer.print, env.frozenState, env.dispatch)
    const result = filesystem.find(env.store.getState().fileTree, path)
    assert.strictEqual(result, content)
  })

  it('should create a blank file if no content was given', () => {
    const env = createEnv()
    const pathString = '/etc/blank_file.txt'
    const path = ['etc', 'blank_file.txt']
    put([pathString], env.buffer.print, env.frozenState, env.dispatch)
    const result = filesystem.find(env.store.getState().fileTree, path)
    console.log(result)
    assert.strictEqual(result, '')
  })

  it('shouldn’t create a file, when there is already one existing', () => {
    const env = createEnv()
    const pathString = '/etc/hosts'
    assert.throws(() => {
      put([pathString, 'foo'], env.buffer.print, env.frozenState, env.dispatch)
    }, CommandError.PathAlreadyExists)
  })

  it('shouldn’t create a file at non-existing locations', () => {
    const env = createEnv()
    const pathString = '/folder/is/not/existing/file.txt'
    assert.throws(() => {
      put([pathString, 'foo'], env.buffer.print, env.frozenState, env.dispatch)
    }, CommandError.PathNotExists)
  })

  it('should overwrite an existing file with the --overwrite option', () => {
    const env = createEnv()
    const pathString = '/etc/hosts'
    const path = ['etc', 'hosts']
    const args = ['--overwrite', pathString, 'New file content']
    put(args, env.buffer.print, env.frozenState, env.dispatch)
    const result = filesystem.find(env.store.getState().fileTree, path)
    assert.strictEqual(result, 'New file content')
  })

  it('should amend to an existing file with the --amend option', () => {
    const env = createEnv()
    const pathString = '/etc/hosts'
    const path = ['etc', 'hosts']
    const args = ['--amend', pathString, '#Additional file content']
    put(args, env.buffer.print, env.frozenState, env.dispatch)
    const result = filesystem.find(env.store.getState().fileTree, path)
    assert.strictEqual(result, '127.0.0.1 localhost#Additional file content')
  })

  it('should amend to non-existing files with the --amend option', () => {
    const env = createEnv()
    const pathString = '/etc/config'
    const path = ['etc', 'config']
    const args = ['--amend', pathString, 'Some file content']
    put(args, env.buffer.print, env.frozenState, env.dispatch)
    const result = filesystem.find(env.store.getState().fileTree, path)
    assert.strictEqual(result, 'Some file content')
  })
})
