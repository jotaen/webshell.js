'use strict'

const assert = require('assert')
const cat = require('../../../src/commands/cat')
const createEnv = require('../../testingEnv')

describe('#cat (concat, echo files)', () => {
  it('should print out the content of a file', () => {
    const env = createEnv()
    const path = '/etc/hosts'
    cat(path, env.buffer, env.frozenState)
    const output = env.buffer.flush()
    const expect = '127.0.0.1 localhost'
    assert.strictEqual(output, expect)
  })

  it('should should print an error, when a directory was given', () => {
    const env = createEnv()
    const path = '/usr'
    cat(path, env.buffer, env.frozenState)
    const output = env.buffer.flush()
    assert(/Not a file/.test(output))
  })

  it('should should print an error, when path was not found', () => {
    const env = createEnv()
    const path = '/non/existing/path/filename.txt'
    cat(path, env.buffer, env.frozenState)
    const output = env.buffer.flush()
    assert(/Not a file/.test(output))
  })

  it('should print a `usage` text, if no input was given', () => {
    const env = createEnv()
    const path = ''
    cat(path, env.buffer, env.frozenState)
    const output = env.buffer.flush()
    assert(/usage/.test(output))
  })
})
