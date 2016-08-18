'use strict'

const assert = require('assert')
const ls = require('../../../src/commands/ls')
const createEnv = require('../../testingEnv')
const CommandError = require('../../../src/errors')

describe('#ls (list)', () => {
  it('should list all items of the current location', () => {
    const env = createEnv()
    ls([], env.buffer.print, env.frozenState)
    const output = env.buffer.get()
    const expect = [['bin/', 'etc/', 'usr/']]
    assert.deepEqual(output, expect)
  })

  it('should list all items of any location', () => {
    const env = createEnv()
    const input = '/bin'
    ls([input], env.buffer.print, env.frozenState)
    const output = env.buffer.get()
    const expect = [['date']]
    assert.deepEqual(output, expect)
  })

  it('should print error, if specified location does not exist', () => {
    const env = createEnv()
    const input = '/this/directory/does/not/exist'
    assert.throws(() => {
      ls([input], env.buffer.print, env.frozenState)
    }, CommandError.PathNotFound)
  })

  it('should print error, if specified location is not a directory', () => {
    const env = createEnv()
    const input = '/etc/hosts'
    assert.throws(() => {
      ls([input], env.buffer.print, env.frozenState)
    }, CommandError.NotADirectory)
  })

  it('should add trailing slashes to directories', () => {
    const env = createEnv()
    const input = '/bin'
    ls([input], env.buffer.print, env.frozenState)
    const output = env.buffer.get()
    const expect = [['date']]
    assert.deepEqual(output, expect)
  })

  it('should sort the output in alphabetic order', () => {
    const env = createEnv()
    const input = '/etc'
    ls([input], env.buffer.print, env.frozenState)
    const output = env.buffer.get()
    const expect = [['hosts', 'passwd']]
    assert.deepEqual(output, expect)
  })
})
