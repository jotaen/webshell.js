'use strict'

const assert = require('assert')
const put = require('../../../src/commands/put')
const filesystem = require('../../../src/filesystem')
const createEnv = require('../../testingEnv')
const CommandError = require('../../../src/errors')

describe('#put (create file)', () => {
  it('should create a new file at the current location', () => {
    const env = createEnv()
    const filename = 'hello-world.txt'
    const args = [filename, 'Hello', 'World']
    put(args, env.buffer.print, env.frozenState, env.dispatch)
    const result = filesystem.find(env.store.getState().fileTree, [filename])
    assert.strictEqual(result, 'Hello World')
  })

  it('should create a new file at an arbitrary (existing) location', () => {
    const env = createEnv()
    const path = '/etc/config.json'
    const content = '{"something": true}'
    put([path, content], env.buffer.print, env.frozenState, env.dispatch)
    const result = filesystem.find(env.store.getState().fileTree, ['etc', 'config.json'])
    assert.strictEqual(result, content)
  })

  it('should create a blank file if no content was given', () => {
    const env = createEnv()
    const path = '/etc/blank_file.txt'
    put([path], env.buffer.print, env.frozenState, env.dispatch)
    const result = filesystem.find(env.store.getState().fileTree, ['etc', 'blank_file.txt'])
    console.log(result)
    assert.strictEqual(result, '')
  })

  it('shouldn’t create a file, when there is already one existing', () => {
    const env = createEnv()
    const path = '/etc/hosts'
    assert.throws(() => {
      put([path, 'foo'], env.buffer.print, env.frozenState, env.dispatch)
    }, CommandError.PathAlreadyExists)
  })

  it('shouldn’t create a file at non-existing locations', () => {
    const env = createEnv()
    const path = '/folder/is/not/existing/file.txt'
    assert.throws(() => {
      put([path, 'foo'], env.buffer.print, env.frozenState, env.dispatch)
    }, CommandError.PathNotExists)
  })
})
