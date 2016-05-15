'use strict'

const assert = require('chai').assert
const output = require('../src/output.js')

describe('#output()', () => {
  describe('#text()', () => {
    it('should wrap the text into span tags', () => {
      const result = output.text('Hello World', '#ff0000')
      assert(result === '<span style="color:#ff0000">Hello World</span>')
    })
  })

  describe('#startLine()', () => {
    it('should open a new div', () => {
      const result = output.startLine()
      assert(result === '<div>')
    })
  })

  describe('#endLine()', () => {
    it('should close a div', () => {
      const result = output.endLine()
      assert(result === '</div>')
    })
  })
})
