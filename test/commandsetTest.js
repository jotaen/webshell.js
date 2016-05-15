'use strict'

const assert = require('chai').assert
const commandset = require('../src/commandset.js')

describe('#list()', function() {
  it('should be empty after initialisation', function() {
    const cmds = commandset()
    assert.deepEqual(cmds.list(), {})
  })
})

describe('#register()', function() {
  it('should store commands', function() {
    const cmds = commandset()

    const foo = () => 1

    cmds.register('foo', foo)
    assert.deepEqual(cmds.list(), {
      foo: foo
    })
  })

  it('should throw an error, is `command` is not a function', function() {
    const cmds = commandset()
    assert.throws(() => {
      cmds.register('foo', {})
    })
  })

  it('should throw an error, is `name` is not a string', function() {
    const cmds = commandset()
    assert.throws(() => {
      cmds.register({}, () => 1)
    })
  })

  it('should override commands', function() {
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

describe('#lookup()', function() {
  it('should find a previously registered command', function() {
    const cmds = commandset()

    const foo = () => 1
    const baz = () => 2

    cmds.register('foo', foo)
    cmds.register('baz', baz)

    assert(cmds.lookup('foo') === foo)
    assert(cmds.lookup('baz') === baz)
  })

  it ('should return undefined when no command was found', function() {
    const cmds = commandset()

    const foo = () => 1
    cmds.register('foo', foo)

    assert(cmds.lookup('baz') === undefined)
  })
})
