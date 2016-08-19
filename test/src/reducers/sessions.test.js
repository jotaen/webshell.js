'use strict'

const assert = require('assert')
const testingStore = require('../../testingStore')
const action = require('../../../src/actions')
const stack = require('../../../src/stack')
const CommandError = require('../../../src/errors')

describe('#users', () => {
  describe('#LOGIN', () => {
    it('should login a new user', () => {
      const store = testingStore()
      const newUser = 'alice'
      store.dispatch(action.login(newUser))
      const result = stack.latest(store.getState().sessions)
      assert.strictEqual(result, newUser)
    })

    it('should throw, if argument is empty', () => {
      const store = testingStore()
      assert.throws(() => {
        store.dispatch(action.login(''))
      }, CommandError.InvalidArgument)
    })

    it('should throw, if argument was not provided', () => {
      const store = testingStore()
      assert.throws(() => {
        store.dispatch(action.login())
      }, CommandError.InvalidArgument)
    })
  })

  describe('#LOGOUT', () => {
    it('should logout the current user', () => {
      const store = testingStore()
      store.dispatch(action.logout())
      const result = stack.latest(store.getState().sessions)
      const expect = 'root'
      assert.strictEqual(expect, result)
    })

    it('should do nothing, if no user is logged in', () => {
      const store = testingStore()
      store.dispatch(action.logout())
      store.dispatch(action.logout())
      store.dispatch(action.logout())
      store.dispatch(action.logout())
      store.dispatch(action.logout())
      const result = stack.latest(store.getState().sessions)
      const expect = ''
      assert.strictEqual(expect, result)
    })
  })
})
