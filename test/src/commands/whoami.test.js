'use strict'

const assert = require('assert')
const whoami = require('../../../src/commands/whoami')
const createEnv = require('../../testingEnv')

describe('#whoami (who am i)', () => {
  it('should print out the name of the current logged in user', () => {
    const env = createEnv()
    whoami('', env.buffer, env.frozenState)
    const result = env.buffer.flush()
    const expect = 'alice'
    assert.strictEqual(result, expect)
  })
})
