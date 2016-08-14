'use strict'

const assert = require('assert')
const ls = require('../../../src/commands/ls')
const createEnv = require('../../testingEnv')

describe('#ls (list)', () => {
  it('should list all items of the current location', () => {
    const env = createEnv()
    ls('', env.buffer, env.frozenState)
    const output = env.buffer.flush()
    const expect = 'bin/\netc/\nusr/\n'
    assert.strictEqual(output, expect)
  })

  it('should list all items of any location', () => {
    const env = createEnv()
    const input = '/bin'
    ls(input, env.buffer, env.frozenState)
    const output = env.buffer.flush()
    const expect = 'date\n'
    assert.strictEqual(output, expect)
  })

  it('should print error, if specified location does not exist', () => {
    const env = createEnv()
    const input = '/this/directory/does/not/exist'
    ls(input, env.buffer, env.frozenState)
    const output = env.buffer.flush()
    assert(/No such file or directory/.test(output))
  })

  it('should add trailing slashes to directories', () => {
    const env = createEnv()
    const input = '/bin'
    ls(input, env.buffer, env.frozenState)
    const output = env.buffer.flush()
    const expect = 'date\n'
    assert.strictEqual(output, expect)
  })

  it('should sort the output in alphabetic order', () => {
    const env = createEnv()
    const input = '/etc'
    ls(input, env.buffer, env.frozenState)
    const output = env.buffer.flush()
    const expect = 'hosts\npasswd\n'
    assert.strictEqual(output, expect)
  })
})
