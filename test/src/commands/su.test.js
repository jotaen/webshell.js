'use strict'

const assert = require('assert')
const su = require('../../../src/commands/su')
const createBuffer = require('../../../src/buffer/textBuffer.js')
const predefinedStore = require('../../predefinedStore')

describe('#su (switch user)', () => {
  it('should switch the current user', () => {
    const buffer = createBuffer()
    const store = predefinedStore()
    const newUser = 'alice'
    su(newUser, buffer, store)
    const currentUser = store.getState().currentUser
    assert.strictEqual(newUser, currentUser)
  })

  it('should do nothing, if no username was given', () => {
    const buffer = createBuffer()
    const store = predefinedStore()
    const oldUser = store.getState().currentUser
    su('', buffer, store)
    const currentUser = store.getState().currentUser
    assert.strictEqual(oldUser, currentUser)
  })
})
