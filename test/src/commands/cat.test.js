'use strict'

const assert = require('assert')
const cat = require('../../../src/commands/cat')
const createBuffer = require('../../buffer')
const predefinedStore = require('../../predefinedStore')

describe('#cat (concat, echo files)', () => {
  it('should print out the content of a file', () => {
    const store = predefinedStore()
    const buffer = createBuffer()
    const path = '/etc/hosts'
    cat(path, buffer, store)
    const output = buffer.get()
    const expect = '127.0.0.1 localhost'
    assert.strictEqual(output, expect)
  })

  it('should should print an error, when a directory was given', () => {
    const store = predefinedStore()
    const buffer = createBuffer()
    const path = '/usr'
    cat(path, buffer, store)
    const output = buffer.get()
    assert(/Not a file/.test(output))
  })

  it('should should print an error, when path was not found', () => {
    const store = predefinedStore()
    const buffer = createBuffer()
    const path = '/non/existing/path/filename.txt'
    cat(path, buffer, store)
    const output = buffer.get()
    assert(/Not a file/.test(output))
  })

  it('should print a `usage` text, if no input was given', () => {
    const store = predefinedStore()
    const buffer = createBuffer()
    const path = ''
    cat(path, buffer, store)
    const output = buffer.get()
    assert(/usage/.test(output))
  })
})
