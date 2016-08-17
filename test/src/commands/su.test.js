'use strict'

const assert = require('assert')
const su = require('../../../src/commands/su')
const createEnv = require('../../testingEnv')
const stack = require('../../../src/stack')
const CommandError = require('../../../src/errors')

describe('#su (switch user)', () => {
  it('should switch the current user', () => {
    const env = createEnv()
    const newUser = 'alice'
    su(newUser, env.buffer.print, env.frozenState, env.dispatch)
    const currentUser = stack.latest(env.store.getState().sessions)
    assert.strictEqual(newUser, currentUser)
  })

  it('should do nothing, if no username was given', () => {
    const env = createEnv()
    const oldUser = stack.latest(env.store.getState().sessions)
    assert.throws(() => {
      su('', env.buffer.print, env.frozenState, env.dispatch)
    }, CommandError.InvalidArgument)
    const currentUser = stack.latest(env.store.getState().sessions)
    assert.strictEqual(oldUser, currentUser)
  })
})
