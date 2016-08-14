'use strict'

const assert = require('assert')
const help = require('../../../src/commands/help')
const createBuffer = require('../../../src/buffer/textBuffer.js')
const predefinedStore = require('../../predefinedStore')

describe('#help', () => {
  it('should list all available commands', () => {
    const store = predefinedStore()
    const buffer = createBuffer()
    help('', buffer, store)
    const output = buffer.flush()
    const expect = /Commands:/
    assert.ok(expect.test(output))
  })
})
