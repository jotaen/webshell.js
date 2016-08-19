'use strict'

const assert = require('assert')
const state = require('../../src/state')

describe('#stack', () => {
  describe('#default', () => {
    it('should provide all keys in alphabetic order', () => {
      const keys = Object.keys(state.default())
      const expect = ['currentLocation', 'fileTree', 'history', 'lastActivity', 'sessions']
      assert.deepEqual(keys, expect)
    })
  })

  describe('#serialize', () => {
    it('should make a JSON out of the state', () => {
      const result = state.serialize(state.default())
      const expect = '{"currentLocation":[],"fileTree":{},"history":[],"lastActivity":null,"sessions":["root"]}'
      assert.deepEqual(result, expect)
    })

    it('should make an empty JSON, when undefined is passed', () => {
      const result = state.serialize(undefined)
      const expect = '{}'
      assert.deepEqual(result, expect)
    })
  })

  describe('#deserialize', () => {
    it('should unserialize a JSON', () => {
      const json = '{"currentLocation":[],"fileTree":{},"history":[],"lastActivity":null,"sessions":["root"]}'
      const result = state.deserialize(json)
      assert.deepEqual(result, state.default())
    })

    it('should restore the dates properly', () => {
      const json = '{"currentLocation":[],"fileTree":{},"history":[],"lastActivity":"2010-01-02T19:00:00Z","sessions":["root"]}'
      const result = state.deserialize(json)
      assert.ok(result.lastActivity instanceof Date)
    })
  })

  describe('#copy', () => {
    it('should copy the state', () => {
      const original = state.default()
      const copy = state.copy(original)
      assert.deepEqual(original, copy)
    })

    it('should create a fresh and entirely unrelated object', () => {
      const original = state.default()
      const copy = state.copy(original)
      assert.notStrictEqual(original, copy)
      original.sessions.push('admin')
      assert.notDeepEqual(original, copy)
    })
  })
})
