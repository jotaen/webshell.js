'use strict'

const assert = require('assert')
const createEvaluator = require('../../../src/engine/evaluator')

describe('#evaluator', () => {
  it('should dispatch a command', () => {
    let wasInvoked = false
    const commands = {
      something: () => {
        wasInvoked = true
      }
    }
    const reducers = () => {}
    const evaluator = createEvaluator(commands, reducers, {})
    evaluator('something', {})
    assert.strictEqual(wasInvoked, true)
  })
})
