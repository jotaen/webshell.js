'use strict'

const assert = require('assert')
const renderHtml = require('../../../src/render/html')
const renderText = require('../../../src/render/plainText')

describe('#render', () => {
  it('should render undefined empty and line breaking', () => {
    const input = undefined
    const html = renderHtml(input)
    const text = renderText(input)
    assert.strictEqual(html, '<div>&nbsp;</div>')
    assert.strictEqual(text, '\n')
  })

  it('should render a string as single line', () => {
    const input = 'Hello World'
    const html = renderHtml(input)
    const text = renderText(input)
    assert.strictEqual(html, '<span>Hello World</span>')
    assert.strictEqual(text, 'Hello World')
  })

  it('should render an array of string to a list', () => {
    const input = ['a', 'b', 'c']
    const html = renderHtml(input)
    const text = renderText(input)
    assert.strictEqual(html, '<ul class="webshell-list"><li class="webshell-list-item">a</li><li class="webshell-list-item">b</li><li class="webshell-list-item">c</li></ul>')
    assert.strictEqual(text, 'a\nb\nc\n')
  })
})
