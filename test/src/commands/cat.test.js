'use strict'

const assert = require('assert')
const cat = require('../../../src/commands/cat').main
const createEnv = require('../../testingEnv')
const CommandError = require('../../../src/errors')

describe('#cat (concat, echo files)', () => {
  it('should print out the content of a file', () => {
    const env = createEnv()
    const args = ['/etc/hosts']
    cat(args, env.buffer.print, env.frozenState)
    const output = env.buffer.get()
    const expect = ['127.0.0.1 localhost']
    assert.deepEqual(output, expect)
  })

  it('should should print an error, when a directory was given', () => {
    const env = createEnv()
    const args = ['/usr']
    assert.throws(() => {
      cat(args, env.buffer.print, env.frozenState)
    }, CommandError.NotAFile)
  })

  it('should should print an error, when path was not found', () => {
    const env = createEnv()
    const args = ['/non/existing/path/filename.txt']
    assert.throws(() => {
      cat(args, env.buffer.print, env.frozenState)
    }, CommandError.PathNotFound)
  })

  it('should concat the contents of multiple files', () => {
    const env = createEnv()
    const args = ['/etc/hosts', '/etc/passwd']
    cat(args, env.buffer.print, env.frozenState)
    const output = env.buffer.get()
    const expect = ['127.0.0.1 localhost198azsf1i2hhAs8faz98ZHU']
    assert.deepEqual(output, expect)
  })

  it('should print a `usage` text, if no input was given', () => {
    const env = createEnv()
    assert.throws(() => {
      cat([], env.buffer.print, env.frozenState)
    }, CommandError.InvalidArgument)
  })
})
