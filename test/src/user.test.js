'use strict'

'use strict'

const assert = require('assert')
const user = require('../../src/user')

describe('#user', () => {
  describe('#name', () => {
    it('should return the current (latest logged-in) user', () => {
      const users = ['alice', 'bob']
      const result = user.name(users)
      const expect = 'bob'
      assert.strictEqual(expect, result)
    })

    it('should not modify the input array', () => {
      const original = ['alice', 'bob']
      const copy = original.slice(0) // copy array
      user.name(copy)
      assert.deepEqual(copy, original)
    })

    it('should return an empty string, if input array is empty', () => {
      const users = []
      const result = user.name(users)
      const expect = ''
      assert.strictEqual(expect, result)
    })
  })
})
