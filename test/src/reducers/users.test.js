'use strict'

const assert = require('assert')
const predefinedStore = require('../../predefinedStore')
const action = require('../../../src/actions')

describe('#users', () => {
  describe('#SWITCH_USER', () => {
    it('should switch the current user', () => {
      const store = predefinedStore()
      const newUser = 'alice'
      store.dispatch(action.switchUser(newUser))
      const result = store.getState().currentUser
      assert.strictEqual(result, newUser)
    })

    it('should throw, if argument is empty', () => {
      const store = predefinedStore()
      assert.throws(() => {
        store.dispatch(action.switchUser(''))
      }, /EMPTY_USERNAME/)
    })
  })
})
