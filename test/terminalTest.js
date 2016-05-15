'use strict'

const assert = require('chai').assert
const terminal = require('../src/terminal.js')

describe('#terminal', () => {
  it('should print out a simple text with default style', () => {
    const t = terminal()
    const expect = '<div><span style="color:#000000">Hello World</span>'
    const result = t.print('Hello World').flush()
    assert(result === expect)
  })

  it('should terminate a line with a closing </div>', () => {
    const t = terminal()
    const expect = '<div><span style="color:#000000">Hello World</span></div>'
    const result = t.print('Hello World').nl().flush()
    assert(result === expect)
  })

  it('should set colors correctly', () => {
    const t = terminal()
    const expect = '<div><span style="color:#9e9e9e">Hello World</span></div>'
    const result = t.color('#9e9e9e').print('Hello World').nl().flush()
    assert(result === expect)
  })

  it('should reset the color back to the default (#000000)', () => {
    const t = terminal()
    const expect = '<div><span style="color:#cfcfcf">Hello</span><span style="color:#000000">World</span></div>'
    const result = t.color('#cfcfcf').print('Hello').reset().print('World').nl().flush()
    assert(result === expect)
  })

  it('should be empty after flush', () => {
    const t = terminal()
    t.print('Hello World').flush() // buffer should be clear hereafter
    const expect = '<div><span style="color:#000000">Bazinga!</span>'
    const result = t.print('Bazinga!').flush()
    assert(result === expect)
  })
})
