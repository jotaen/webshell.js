'use strict'

const assert = require('assert')
const tokenize = require('../../../src/core/tokenize')

describe('#tokenize', () => {
  it('should split simple statements', () => {
    const input = 'mkdir -p var/www/website'
    const result = tokenize(input)
    const expect = [
      {kind: 'symbol', content: 'mkdir'},
      {kind: 'symbol', content: '-p'},
      {kind: 'symbol', content: 'var/www/website'}
    ]
    assert.deepEqual(result, expect)
  })

  it('should recognize quoted strings as one token', () => {
    const input = 'echo "Hello World"'
    const result = tokenize(input)
    const expect = [
      {kind: 'symbol', content: 'echo'},
      {kind: 'string', content: 'Hello World'}
    ]
    assert.deepEqual(result, expect)
  })

  it('should recognize sequences with escaped spaces as one token', () => {
    const input = 'echo Hello\\ World'
    const result = tokenize(input)
    const expect = [
      {kind: 'symbol', content: 'echo'},
      {kind: 'symbol', content: 'Hello World'}
    ]
    assert.deepEqual(result, expect)
  })

  it('should ignore escaped quotes in quoted strings', () => {
    const input = 'cat "Ronny \\"The Ace\\" O’Sullivan"'
    const result = tokenize(input)
    const expect = [
      {kind: 'symbol', content: 'cat'},
      {kind: 'string', content: 'Ronny "The Ace" O’Sullivan'}
    ]
    assert.deepEqual(result, expect)
  })

  it('should recognize the bash operators', () => {
    const input = '& && | > >>'
    const result = tokenize(input)
    const expect = [
      {kind: 'operator', content: '&'},
      {kind: 'operator', content: '&&'},
      {kind: 'operator', content: '|'},
      {kind: 'operator', content: '>'},
      {kind: 'operator', content: '>>'}
    ]
    assert.deepEqual(result, expect)
  })

  it('should split complex statements', () => {
    const input = 'rm -rf test && echo "Hello \\"World\\" & other planets" | cat Hello\\ World.txt >> text.txt'
    const result = tokenize(input)
    const expect = [
      {kind: 'symbol', content: 'rm'},
      {kind: 'symbol', content: '-rf'},
      {kind: 'symbol', content: 'test'},
      {kind: 'operator', content: '&&'},
      {kind: 'symbol', content: 'echo'},
      {kind: 'string', content: 'Hello "World" & other planets'},
      {kind: 'operator', content: '|'},
      {kind: 'symbol', content: 'cat'},
      {kind: 'symbol', content: 'Hello World.txt'},
      {kind: 'operator', content: '>>'},
      {kind: 'symbol', content: 'text.txt'}
    ]
    assert.deepEqual(result, expect)
  })
})
