'use strict'

const assert = require('assert')
const predefinedStore = require('../../predefinedStore')
const action = require('../../../src/actions')

describe('#engine', () => {
  describe('#SAVE_INPUT', () => {
    it('should store inputs in history', () => {
      const store = predefinedStore()
      store.dispatch(action.saveInput('help'))
      store.dispatch(action.saveInput('ls -la'))
      store.dispatch(action.saveInput('ssh admin@127.0.0.1 -i ~/.ssh/myKey'))
      const result = store.getState().history
      const expect = [
        'help',
        'ls -la',
        'ssh admin@127.0.0.1 -i ~/.ssh/myKey'
      ]
      assert.deepEqual(result, expect)
    })

    it('should not store blank/empty inputs', () => {
      const store = predefinedStore()
      store.dispatch(action.saveInput(''))
      store.dispatch(action.saveInput(' '))
      store.dispatch(action.saveInput('        '))
      const result = store.getState().history
      assert.deepEqual(result.length, 0)
    })
  })
})
