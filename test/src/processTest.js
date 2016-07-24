'use strict'

const assert = require('assert')
const process = require('../../src/process')

describe('#process', () => {
  describe('#path', () => {
    it('should split a path string into an array', () => {
      const input = 'a/b/c/d'
      const expect = ['a', 'b', 'c', 'd']
      const result = process.path(input)
      assert.deepEqual(expect, result)
    })

    it('should ignore leading/trailing slashes', () => {
      const input = '/absolute/path/'
      const expect = ['absolute', 'path']
      const result = process.path(input)
      assert.deepEqual(expect, result)
    })

    it('should ignore double/triple/… slashes', () => {
      const input = '///harr//////harrrr/harrrrrrrr////////////'
      const expect = ['harr', 'harrrr', 'harrrrrrrr']
      const result = process.path(input)
      assert.deepEqual(expect, result)
    })
  })
})
