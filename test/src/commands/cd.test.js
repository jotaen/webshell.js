'use strict'

const assert = require('assert')
const cd = require('../../../src/commands/cd')
const createEnv = require('../../testingEnv')

describe('#cd (change directory)', () => {
  it('should change the current working directory', () => {
    const env = createEnv()
    const newPath = '/usr/local/'
    cd(newPath, env.buffer, env.frozenState, env.dispatch)
    const output = env.buffer.flush()
    const result = env.store.getState().currentLocation
    const expect = ['usr', 'local']
    assert.strictEqual(output, '')
    assert.deepEqual(result, expect)
  })

  it('should change the current working directory, even if input is "dirty"', () => {
    const env = createEnv()
    const newPath = '////usr///local//'
    cd(newPath, env.buffer, env.frozenState, env.dispatch)
    const output = env.buffer.flush()
    const result = env.store.getState().currentLocation
    const expect = ['usr', 'local']
    assert.strictEqual(output, '')
    assert.deepEqual(result, expect)
  })

  it('should not change the current working directory, if target does not exist', () => {
    const env = createEnv()
    const newPath = '/path/that/does/not/exist'
    cd(newPath, env.buffer, env.frozenState, env.dispatch)
    const output = env.buffer.flush()
    assert(/No such file or directory/.test(output))
    assert.deepEqual(env.store.getState().currentLocation, [])
  })

  it('should not change the current working directory, if target is a file', () => {
    const env = createEnv()
    const newPath = '/etc/hosts'
    cd(newPath, env.buffer, env.frozenState, env.dispatch)
    const output = env.buffer.flush()
    assert(/Not a directory/.test(output))
    assert.deepEqual(env.store.getState().currentLocation, [])
  })
})
