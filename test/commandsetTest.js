'use strict'

const assert = require('chai').assert
const commandset = require('../src/commandset.js')

describe('#commandset', () => {
  describe('#list()', () => {
    it('should be empty after initialisation', () => {
      const cmds = commandset()
      assert.deepEqual(cmds.list(), {})
    })
  })

  describe('#register()', () => {
    it('should store commands', () => {
      const cmds = commandset()

      const foo = () => 1

      cmds.register('foo', foo)
      assert.deepEqual(cmds.list(), {
        foo: foo
      })
    })

    it('should throw an error, is `command` is not a function', () => {
      const cmds = commandset()
      assert.throws(() => {
        cmds.register('foo', {})
      })
    })

    it('should throw an error, is `name` is not a string', () => {
      const cmds = commandset()
      assert.throws(() => {
        cmds.register({}, () => 1)
      })
    })

    it('should override commands', () => {
      const cmds = commandset()

      const first = () => 1
      const second = () => 2

      cmds.register('first', first)
      cmds.register('first', second)

      assert.deepEqual(cmds.list(), {
        first: second
      })
    })
  })

  describe('#lookup()', () => {
    it('should find a previously registered command', () => {
      const cmds = commandset()

      const foo = () => 1
      const baz = () => 2

      cmds.register('foo', foo)
      cmds.register('baz', baz)

      assert(cmds.lookup('foo') === foo)
      assert(cmds.lookup('baz') === baz)
    })

    it ('should return undefined when no command was found', () => {
      const cmds = commandset()

      const foo = () => 1
      cmds.register('foo', foo)

      assert(cmds.lookup('baz') === undefined)
    })
  })
})
