'use strict'

const info = require('../../../src/commands/info').main
const assert = require('assert')
const createEnv = require('../../testingEnv')

describe('#info', () => {
  it('should print an infotext, that contains info about the project', () => {
    const env = createEnv()
    const args = []
    info(args, env.buffer.print)
    const output = env.buffer.get()
    const text = output.join('\n')
    const expect = /webshell\.js/
    assert.ok(expect.test(text))
  })
})
