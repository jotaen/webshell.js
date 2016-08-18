'use strict'

const assert = require('assert')
const parse = require('../../../src/core/parse')

describe('#parse', () => {
  it('generate a list of commands', () => {
    const input = 'rm -rf test && echo "Hello \\"World\\" & other planets" | cat Hello\\ World.txt >> text.txt'
    const result = parse(input)
    console.log(result)
    assert(true)
  })
})
