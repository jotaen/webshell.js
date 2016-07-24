'use strict'

const assert = require('assert')
const tree = require('../../src/tree')

describe('#tree', () => {
  describe('#find', () => {
    it('should return the subtree, if `path` is a branch point', () => {
      const source = {
        'alpha': {},
        'beta': {},
        'gamma': {
          'gamma-1': {}
        }
      }
      const result = tree.find(source, ['gamma'])
      const expect = {'gamma-1': {}}

      assert.deepEqual(result, expect)
    })

    it('should return the content, if `path` is an endpoint', () => {
      const source = {
        'alpha': {},
        'beta': {
          'b1': 'BETA-B1'
        },
        'gamma': {}
      }
      const result = tree.find(source, ['beta', 'b1'])
      const expect = 'BETA-B1'

      assert(result === expect)
    })

    it('should return `undefined`, if a point is not present', () => {
      const source = {
        'alpha': {},
        'beta': {},
        'gamma': {}
      }
      const lookup = ['charly']
      const result = tree.find(source, lookup)

      assert(result === undefined)
    })

    it('should also find deeply nested endpoints', () => {
      const source = {
        'alpha': [],
        'beta': {
          'b1': {
            'b1-1': '',
            'b1-2': '',
            'b1-3': 'BETA-B1-B'
          }
        },
        'gamma': []
      }
      const path = ['beta', 'b1', 'b1-3']
      const result = tree.find(source, path)
      const expect = 'BETA-B1-B'

      assert.deepEqual(result, expect)
    })
  })

  describe('#isBranchPoint', () => {
    it('should return true, if an item is a branch point', () => {
      const input = {
        'alpha': 'AAA',
        'beta': 'BBB'
      }
      assert(tree.isBranchPoint(input) === true)
    })

    it('should return false, if an item is an endpoint', () => {
      const input = 'SOMETHING'
      assert(tree.isBranchPoint(input) === false)
    })
  })

  describe('#isEndpoint', () => {
    it('should return true, if an item is an endpoint', () => {
      const input = 'SOMETHING'
      assert(tree.isEndpoint(input) === true)
    })

    it('should return false, if an item is a branch point', () => {
      const input = {
        'alpha': 'AAA',
        'beta': 'BBB'
      }
      assert(tree.isEndpoint(input) === false)
    })
  })

  describe('#list', () => {
    it('should return a list with information on all items', () => {
      const input = {
        'alpha': {
          'a1': 'AAA111',
          'a2': 'AAA222'
        },
        'beta': {
          'b1': {}
        },
        'gamma': 'CCC',
        'delta': 'DDD'
      }
      const result = tree.list(input)
      const expect = ['alpha/', 'beta/', 'gamma', 'delta']
      assert.deepEqual(result, expect)
    })
  })
})
