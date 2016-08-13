'use strict'

const assert = require('assert')
const makePathFromString = require('../../src/makePathFromString')

describe('#path', () => {
  it('should ignore double/triple/… slashes', () => {
    const input = '///harr//////harrrr/harrrrrrrr////////////'
    const expect = ['harr', 'harrrr', 'harrrrrrrr']
    const result = makePathFromString(input)
    assert.deepEqual(expect, result)
  })

  it('should resolve two dots in absolute path', () => {
    const absolute = '/a/b/c/../..'
    const expect = ['a']
    const result = makePathFromString(absolute, [])
    assert.deepEqual(expect, result)
  })

  it('should resolve two dots in relative path', () => {
    const relative = '../..'
    const reference = ['a', 'b', 'c']
    const expect = ['a']
    const result = makePathFromString(relative, reference)
    assert.deepEqual(expect, result)
  })

  it('should “bump” at root in an absolute path', () => {
    const absolute = '../../../a'
    const expect = ['a']
    const result = makePathFromString(absolute, [])
    assert.deepEqual(expect, result)
  })

  it('should “bump” at root in a relative path', () => {
    const absolute = '../../../../../../../../a/b'
    const reference = ['a', 'b', 'c']
    const expect = ['a', 'b']
    const result = makePathFromString(absolute, reference)
    assert.deepEqual(expect, result)
  })

  it('should resolve one dot in absolute path', () => {
    const absolute = './a/./b/c'
    const expect = ['a', 'b', 'c']
    const result = makePathFromString(absolute, [])
    assert.deepEqual(expect, result)
  })

  it('should resolve one dot in relative path', () => {
    const relative = '././d'
    const reference = ['a', 'b', 'c']
    const expect = ['a', 'b', 'c', 'd']
    const result = makePathFromString(relative, reference)
    assert.deepEqual(expect, result)
  })

  it('should resolve a complicated relative path correctly', () => {
    const relative = '.././f/../../../d/./../../../../../../../a/b/.'
    const reference = ['a', 'b', 'c', 'd', 'e', 'f']
    const expect = ['a', 'b']
    const result = makePathFromString(relative, reference)
    assert.deepEqual(expect, result)
  })
})
