'use strict'

const assert = require('assert')
const createEngine = require('../../../src/core/engine')

describe('#engine', () => {
  it('should dispatch a command', () => {
    let wasInvoked = false
    const commands = {
      something: () => {
        wasInvoked = true
      }
    }
    const reducers = () => {}
    const engine = createEngine(commands, reducers, {})
    engine.evaluate('something', {})
    assert.strictEqual(wasInvoked, true)
  })
})
