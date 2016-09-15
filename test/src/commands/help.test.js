'use strict'

const assert = require('assert')
const help = require('../../../src/commands/help').main
const createEnv = require('../../testingEnv')

describe('#help', () => {
  it('should list all available commands, if no argument was passed', () => {
    const env = createEnv()
    help([], env.buffer.print, env.frozenState)
    const output = env.buffer.get()
    const expect = /Commands:/
    assert(expect.test(output))
  })

  it('should print the help/usage for specific commands', () => {
    const env = createEnv()
    const args = ['echo']
    help(args, env.buffer.print, env.frozenState)
    const output = env.buffer.get()
    assert.strictEqual(output[0], 'Prints text on the console')
    assert.strictEqual(output[1], 'usage: echo [word, ...]')
  })

  it('should print an error for non-existing commands', () => {
    const env = createEnv()
    const args = ['nonExistingCommand']
    help(args, env.buffer.print, env.frozenState)
    const output = env.buffer.get()[0]
    const expect = 'help: No topic found for command `nonExistingCommand`'
    assert.strictEqual(output, expect)
  })
})
