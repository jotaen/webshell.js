'use strict'

const assert = require('assert')
const exit = require('../../../src/commands/exit')
const createBuffer = require('../../../src/buffer/textBuffer')
const predefinedStore = require('../../predefinedStore')
const user = require('../../../src/user')

describe('#exit (exit current session)', () => {
  it('should terminate the session of the current user', () => {
    const buffer = createBuffer()
    const store = predefinedStore()
    exit('', buffer, store)
    const currentUser = user.name(store.getState().sessions)
    const expect = 'root'
    assert.strictEqual(expect, currentUser)
  })

  it('should do nothing, if no user is logged-in', () => {
    const buffer = createBuffer()
    const store = predefinedStore()
    exit('', buffer, store)
    exit('', buffer, store)
    exit('', buffer, store)
    exit('', buffer, store)
    exit('', buffer, store)
    const currentUser = user.name(store.getState().sessions)
    assert.strictEqual('', currentUser)
  })
})
