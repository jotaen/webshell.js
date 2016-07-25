'use strict'

const assert = require('assert')
const tree = require('../../src/tree')

describe('#tree', () => {
  describe('#find', () => {
    it('should return the subtree, if `path` is a branch point', () => {
      const source = {
        'alpha': {},
        'bravo': {},
        'charly': {
          'charly-1': {}
        }
      }
      const result = tree.find(source, ['charly'])
      const expect = {'charly-1': {}}

      assert.deepEqual(result, expect)
    })

    it('should return the content, if `path` is an endpoint', () => {
      const source = {
        'alpha': {},
        'bravo': {
          'b1': 'BETA-B1'
        },
        'charly': {}
      }
      const result = tree.find(source, ['bravo', 'b1'])
      const expect = 'BETA-B1'

      assert(result === expect)
    })

    it('should return `undefined`, if a point is not present', () => {
      const source = {
        'alpha': {},
        'bravo': {},
        'charly': {}
      }
      const lookup = ['yankee']
      const result = tree.find(source, lookup)

      assert(result === undefined)
    })

    it('should also find deeply nested endpoints', () => {
      const source = {
        'alpha': [],
        'bravo': {
          'b1': {
            'b1-1': '',
            'b1-2': '',
            'b1-3': 'BETA-B1-B'
          }
        },
        'charly': []
      }
      const path = ['bravo', 'b1', 'b1-3']
      const result = tree.find(source, path)
      const expect = 'BETA-B1-B'

      assert.deepEqual(result, expect)
    })
  })

  describe('#isBranchPoint', () => {
    it('should return true, if an item is a branch point', () => {
      const input = {
        'alpha': 'AAA',
        'bravo': 'BBB'
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
        'bravo': 'BBB'
      }
      assert(tree.isEndpoint(input) === false)
    })
  })

  describe('#insert', () => {
    it('should insert a new endpoint into an empty tree', () => {
      const initial = {}
      const result = tree.insert(initial, ['alpha'], {'a1': 'AAA111'})
      const expect = {
        'alpha': {'a1': 'AAA111'}
      }
      assert.deepEqual(result, expect)
    })

    it('should leave the rest of the original tree intact', () => {
      const initial = {
        'alpha': {
          'a1': 'AAA111'
        },
        'bravo': 'BBB'
      }
      const result = tree.insert(initial, ['alpha', 'a2'], 'AAA222')
      const expect = {
        'alpha': {
          'a1': 'AAA111',
          'a2': 'AAA222'
        },
        'bravo': 'BBB'
      }
      assert.deepEqual(result, expect)
    })

    it('should insert a node deeply', () => {
      const initial = {
        'alpha': {}
      }
      const result = tree.insert(initial, ['alpha', 'a1', 'AAA'], 'FFF111')
      const expect = {
        'alpha': {
          'a1': {
            'AAA': 'FFF111'
          }
        }
      }
      assert.deepEqual(result, expect)
    })
  })
})
