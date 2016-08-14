'use strict'

const assert = require('assert')
const createHtmlBuffer = require('../../../src/buffer/htmlBuffer')
const createTextBuffer = require('../../../src/buffer/textBuffer')

const testAll = (callback) => {
  [
    createHtmlBuffer(),
    createTextBuffer()
  ].forEach(callback)
}

describe('#buffers', () => {
  it('#print() should return `this` (for enabling a call-chain)', () => {
    testAll((buffer) => {
      const result = buffer.print('')
      assert.strictEqual(result, buffer)
    })
  })

  it('#flush() should return a string (for enabling a call-chain)', () => {
    testAll((buffer) => {
      const result = buffer.flush()
      assert.strictEqual(typeof result, 'string')
    })
  })

  it('#color() should return `this` (for enabling a call-chain)', () => {
    testAll((buffer) => {
      const result = buffer.color()
      assert.strictEqual(result, buffer)
    })
  })

  it('#style() should return `this` (for enabling a call-chain)', () => {
    testAll((buffer) => {
      const result = buffer.style()
      assert.strictEqual(result, buffer)
    })
  })

  it('#weight() should return `this` (for enabling a call-chain)', () => {
    testAll((buffer) => {
      const result = buffer.weight()
      assert.strictEqual(result, buffer)
    })
  })
})
