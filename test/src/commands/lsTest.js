'use strict'

const assert = require('assert')
const ls = require('../../../src/commands/ls')
const createBuffer = require('../../buffer')
const predefinedStore = require('../../predefinedStore')

describe('#ls (list)', () => {
  it('should list all items of the current location', () => {
    const store = predefinedStore()
    const buffer = createBuffer()
    ls(undefined, buffer, store)
    const output = buffer.get()
    const expect = 'bin/\netc/\nusr/\n'
    assert.strictEqual(output, expect)
  })

  it('should list all items of any location', () => {
    const store = predefinedStore()
    const buffer = createBuffer()
    const input = '/bin'
    ls(input, buffer, store)
    const output = buffer.get()
    const expect = 'date\n'
    assert.strictEqual(output, expect)
  })

  it('should add trailing slashes to directories', () => {
    const store = predefinedStore()
    const buffer = createBuffer()
    const input = '/bin'
    ls(input, buffer, store)
    const output = buffer.get()
    const expect = 'date\n'
    assert.strictEqual(output, expect)
  })

  it('should sort the output in alphabetic order', () => {
    const store = predefinedStore()
    const buffer = createBuffer()
    const input = '/etc'
    ls(input, buffer, store)
    const output = buffer.get()
    const expect = 'hosts\npasswd\n'
    assert.strictEqual(output, expect)
  })
})
