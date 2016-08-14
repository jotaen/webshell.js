'use strict'

'use strict'

const assert = require('assert')
const stack = require('../../src/stack')

describe('#stack', () => {
  describe('#latest', () => {
    it('should return the latest element in a stack', () => {
      const users = ['first', 'second', 'third']
      const result = stack.latest(users)
      const expect = 'third'
      assert.strictEqual(expect, result)
    })

    it('should not modify the stack', () => {
      const original = ['first', 'second']
      const copy = original.slice(0) // copy array
      stack.latest(copy)
      assert.deepEqual(copy, original)
    })

    it('should return an empty string, if stack is empty', () => {
      const users = []
      const result = stack.latest(users)
      const expect = ''
      assert.strictEqual(expect, result)
    })
  })
})
