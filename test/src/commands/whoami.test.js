'use strict'

const assert = require('assert')
const whoami = require('../../../src/commands/whoami').main
const createEnv = require('../../testingEnv')

describe('#whoami (who am i)', () => {
  it('should print out the name of the current logged in user', () => {
    const env = createEnv()
    whoami([], env.buffer.print, env.frozenState)
    const result = env.buffer.get()
    const expect = ['alice']
    assert.deepEqual(result, expect)
  })
})
