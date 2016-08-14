'use strict'

const assert = require('assert')
const help = require('../../../src/commands/help')
const createEnv = require('../../testingEnv')

describe('#help', () => {
  it('should list all available commands', () => {
    const env = createEnv()
    help('', env.buffer, env.frozenState)
    const output = env.buffer.flush()
    const expect = /Commands:/
    assert(expect.test(output))
  })
})
