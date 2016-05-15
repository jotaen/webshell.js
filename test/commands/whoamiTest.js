'use strict'

const assert = require('chai').assert
const whoami = require('../../src/commands/whoami')
const terminal = require('../../src/terminal')

describe('#whoami', () => {
  it('should print out "Jan"', () => {
    const t = terminal()
    whoami(t)
    const result = t.flush()
    assert(result.indexOf('Jan') !== -1)
  })
})
