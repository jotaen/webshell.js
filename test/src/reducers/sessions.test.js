'use strict'

const assert = require('assert')
const predefinedStore = require('../../predefinedStore')
const action = require('../../../src/actions')
const stack = require('../../../src/stack')

describe('#users', () => {
  describe('#LOGIN', () => {
    it('should login a new user', () => {
      const store = predefinedStore()
      const newUser = 'alice'
      store.dispatch(action.login(newUser))
      const result = stack.latest(store.getState().sessions)
      assert.strictEqual(result, newUser)
    })

    it('should throw, if argument is empty', () => {
      const store = predefinedStore()
      assert.throws(() => {
        store.dispatch(action.login(''))
      }, /EMPTY_USERNAME/)
    })
  })

  describe('#LOGOUT', () => {
    it('should logout the current user', () => {
      const store = predefinedStore()
      store.dispatch(action.logout())
      const result = stack.latest(store.getState().sessions)
      const expect = 'root'
      assert.strictEqual(expect, result)
    })

    it('should do nothing, if no user is logged in', () => {
      const store = predefinedStore()
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
