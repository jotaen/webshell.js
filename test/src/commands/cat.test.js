'use strict'

const assert = require('assert')
const cat = require('../../../src/commands/cat')
const createEnv = require('../../testingEnv')
const CommandError = require('../../../src/errors')

describe('#cat (concat, echo files)', () => {
  it('should print out the content of a file', () => {
    const env = createEnv()
    const path = '/etc/hosts'
    cat([path], env.buffer.print, env.frozenState)
    const output = env.buffer.get()
    const expect = ['127.0.0.1 localhost']
    assert.deepEqual(output, expect)
  })

  it('should should print an error, when a directory was given', () => {
    const env = createEnv()
    const path = '/usr'
    assert.throws(() => {
      cat([path], env.buffer.print, env.frozenState)
    }, CommandError.NotAFile)
  })

  it('should should print an error, when path was not found', () => {
    const env = createEnv()
    const path = '/non/existing/path/filename.txt'
    assert.throws(() => {
      cat([path], env.buffer.print, env.frozenState)
    }, CommandError.PathNotFound)
  })

  it('should print a `usage` text, if no input was given', () => {
    const env = createEnv()
    cat([], env.buffer.print, env.frozenState)
    const output = env.buffer.get()
    assert(/usage/.test(output))
  })
})
