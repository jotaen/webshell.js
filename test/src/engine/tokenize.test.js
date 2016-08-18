'use strict'

const assert = require('assert')
const tokenize = require('../../../src/engine/tokenize')

describe('#tokenize', () => {
  it('tokenize', () => {
    const input = 'rm -rf test && echo "Hello \\"World\\" & other planets" | cat Hello\\ World.txt >> text.txt'
    console.log(input)
    const result = tokenize(input)
    console.log(result)
  })
})
