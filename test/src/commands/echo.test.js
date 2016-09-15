'use strict'

const echo = require('../../../src/commands/echo').main
const assert = require('assert')
const createEnv = require('../../testingEnv')

describe('#echo', () => {
  it('should print any given text', () => {
    const env = createEnv()
    const args = ['Hello', 'World']
    echo(args, env.buffer.print)
    const output = env.buffer.get()
    const expect = 'Hello World'
    assert.strictEqual(output.length, 1)
    assert.strictEqual(output[0], expect)
  })
})
