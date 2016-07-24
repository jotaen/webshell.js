'use strict'

const assert = require('assert')
const pwd = require('../../src/commands/pwd')
const buffer = require('../buffer')
const createStore = require('redux').createStore

const voidReducer = (state) => state

describe('#pwd (print working directory)', () => {
  it('should print out the current directory', () => {
    const initialState = {
      workingDirectory: '/'
    }
    let store = createStore(voidReducer, initialState)

    pwd(undefined, buffer, store)
    assert(buffer.get() === initialState.workingDirectory)
  })
})
