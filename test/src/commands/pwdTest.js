'use strict'

const assert = require('assert')
const pwd = require('../../../src/commands/pwd')
const createBuffer = require('../../buffer')
const sampleState = require('../../sampleState')
const createStore = require('redux').createStore

describe('#pwd (print working directory)', () => {
  it('should print out the current directory', () => {
    const buffer = createBuffer()
    const store = createStore((state) => state, sampleState.simple())

    pwd(undefined, buffer, store)
    const result = buffer.get()
    const expect = '/'
    assert(result === expect)
  })
})
