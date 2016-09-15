'use strict'

const assert = require('assert')
const parse = require('../../../src/core/parse')

describe('#parse', () => {
  it('generate a list of commands', () => {
    const input = 'rm -rf test && echo "Hello \\"World\\" & other planets" | cat Hello\\ World.txt >> text.txt & ls . > ls.txt'
    const result = parse(input)
    const expect = [
      {
        command: 'rm',
        args: ['-rf', 'test'],
        wantsInput: false,
        stopOnFailure: true
      }, {
        command: 'echo',
        args: ['Hello "World" & other planets'],
        wantsInput: false,
        stopOnFailure: true
      }, { command: 'cat',
        args: ['Hello World.txt'],
        wantsInput: true,
        stopOnFailure: true
      }, { command: 'put',
        args: ['--amend', 'text.txt'],
        wantsInput: true,
        stopOnFailure: true
      }, {
        command: 'ls',
        args: ['.'],
        wantsInput: false,
        stopOnFailure: false
      }, {
        command: 'put',
        args: ['--overwrite', 'ls.txt'],
        wantsInput: true,
        stopOnFailure: true
      }
    ]
    assert.deepEqual(result, expect)
  })
})
