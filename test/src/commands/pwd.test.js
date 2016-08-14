'use strict'

const assert = require('assert')
const pwd = require('../../../src/commands/pwd')
const createEnv = require('../../testingEnv')

describe('#pwd (print working directory)', () => {
  it('should print out the current directory', () => {
    const env = createEnv()
    pwd('', env.buffer, env.frozenState)
    const result = env.buffer.flush()
    const expect = '/'
    assert.strictEqual(result, expect)
  })
})
