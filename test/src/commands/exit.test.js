'use strict'

const assert = require('assert')
const exit = require('../../../src/commands/exit').main
const createEnv = require('../../testingEnv')
const stack = require('../../../src/stack')

describe('#exit (exit current session)', () => {
  it('should terminate the session of the current user', () => {
    const env = createEnv()
    exit([], env.buffer.print, env.frozenState, env.dispatch)
    const currentUser = stack.latest(env.store.getState().sessions)
    const expect = 'root'
    assert.strictEqual(currentUser, expect)
  })

  it('should do nothing, if no user is logged-in', () => {
    const env = createEnv()
    exit([], env.buffer.print, env.frozenState, env.dispatch)
    exit([], env.buffer.print, env.frozenState, env.dispatch)
    exit([], env.buffer.print, env.frozenState, env.dispatch)
    exit([], env.buffer.print, env.frozenState, env.dispatch)
    exit([], env.buffer.print, env.frozenState, env.dispatch)
    const currentUser = stack.latest(env.store.getState().sessions)
    assert.strictEqual(currentUser, '')
  })
})
