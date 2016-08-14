'use strict'

const assert = require('assert')
const predefinedStore = require('../../predefinedStore')
const action = require('../../../src/actions')
const user = require('../../../src/user')

describe('#users', () => {
  describe('#LOGIN', () => {
    it('should login a new user', () => {
      const store = predefinedStore()
      const newUser = 'alice'
      store.dispatch(action.login(newUser))
      const result = user.name(store.getState().sessions)
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
      const newUser = 'alice'
      store.dispatch(action.login(newUser))
      const result = user.name(store.getState().sessions)
      assert.strictEqual(result, newUser)
    })

    it('should throw, if argument is empty', () => {
      const store = predefinedStore()
      assert.throws(() => {
        store.dispatch(action.login(''))
      }, /EMPTY_USERNAME/)
    })
  })
})
