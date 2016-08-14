'use strict'

const assert = require('assert')
const su = require('../../../src/commands/su')
const createBuffer = require('../../../src/buffer/textBuffer')
const predefinedStore = require('../../predefinedStore')
const stack = require('../../../src/stack')

describe('#su (switch user)', () => {
  it('should switch the current user', () => {
    const buffer = createBuffer()
    const store = predefinedStore()
    const newUser = 'alice'
    su(newUser, buffer, store)
    const currentUser = stack.latest(store.getState().sessions)
    assert.strictEqual(newUser, currentUser)
  })

  it('should do nothing, if no username was given', () => {
    const buffer = createBuffer()
    const store = predefinedStore()
    const oldUser = stack.latest(store.getState().sessions)
    su('', buffer, store)
    const currentUser = stack.latest(store.getState().sessions)
    assert.strictEqual(oldUser, currentUser)
  })
})
