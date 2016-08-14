'use strict'

const assert = require('assert')
const whoami = require('../../../src/commands/whoami')
const createBuffer = require('../../../src/buffer/textBuffer.js')
const predefinedStore = require('../../predefinedStore')

describe('#whoami (who am i)', () => {
  it('should print out the name of the current logged in user', () => {
    const buffer = createBuffer()
    const store = predefinedStore()
    whoami('', buffer, store)
    const result = buffer.get()
    const expect = 'root'
    assert.strictEqual(result, expect)
  })
})
