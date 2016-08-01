'use strict'

const assert = require('assert')
const path = require('../../src/path')

describe('#path', () => {
  describe('#split', () => {
    it('should split a path string into an array', () => {
      const input = 'a/b/c/d'
      const expect = ['a', 'b', 'c', 'd']
      const result = path.split(input)
      assert.deepEqual(expect, result)
    })

    it('should ignore leading/trailing slashes', () => {
      const input = '/absolute/path/'
      const expect = ['absolute', 'path']
      const result = path.split(input)
      assert.deepEqual(expect, result)
    })

    it('should ignore double/triple/… slashes', () => {
      const input = '///harr//////harrrr/harrrrrrrr////////////'
      const expect = ['harr', 'harrrr', 'harrrrrrrr']
      const result = path.split(input)
      assert.deepEqual(expect, result)
    })
  })

  describe('#resolve', () => {
    it('should resolve two dots (directory up)', () => {
      const input = ['a', '..', 'b', 'c', '..']
      const expect = ['b']
      const result = path.resolve(input)
      assert.deepEqual(expect, result)
    })

    it('should “bump” at the root path', () => {
      const input = ['..', '..', 'a']
      const expect = ['a']
      const result = path.resolve(input)
      assert.deepEqual(expect, result)
    })

    it('should resolve one dot (same directory)', () => {
      const input = ['.', 'a', '.', 'b', 'c']
      const expect = ['a', 'b', 'c']
      const result = path.resolve(input)
      assert.deepEqual(expect, result)
    })
  })
})
