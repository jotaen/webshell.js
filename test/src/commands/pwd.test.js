'use strict'

const assert = require('assert')
const pwd = require('../../../src/commands/pwd')
const createBuffer = require('../../../src/buffer/textBuffer.js')
const predefinedStore = require('../../predefinedStore')

describe('#pwd (print working directory)', () => {
  it('should print out the current directory', () => {
    const buffer = createBuffer()
    const store = predefinedStore()
    pwd('', buffer, store)
    const result = buffer.get()
    const expect = '/'
    assert(result === expect)
  })
})
