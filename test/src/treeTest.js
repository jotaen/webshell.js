'use strict'

const assert = require('assert')
const tree = require('../../src/tree')

describe('#tree', () => {
  describe('#find', () => {
    it('should return the subtree, if lookup is a directory', () => {
      const source = {
        'bin': {},
        'etc': {},
        'usr': {
          'local': {}
        }
      }
      const result = tree.find(source, ['usr'])
      const expect = {'local': {}}

      assert.deepEqual(result, expect)
    })

    it('should return the content, if lookup is a file', () => {
      const source = {
        'bin': {},
        'etc': {
          'hosts': '127.0.0.1 localhost'
        },
        'usr': {}
      }
      const result = tree.find(source, ['etc', 'hosts'])
      const expect = '127.0.0.1 localhost'

      assert(result === expect)
    })

    it('should return `undefined`, if an directory is not present', () => {
      const source = {
        'bin': {},
        'etc': {},
        'usr': {}
      }
      const lookup = ['var']
      const result = tree.find(source, lookup)

      assert(result === undefined)
    })

    it('should return `undefined`, if a file is not present', () => {
      const source = {
        'bin': {},
        'etc': {},
        'usr': {}
      }
      const lookup = ['c', 'windows', 'system.txt']
      const result = tree.find(source, lookup)

      assert(result === undefined)
    })

    it('should also find deeply nested items', () => {
      const source = {
        'bin': [],
        'etc': {
          'init.d': ['cron', 'mysql', 'supervisord']
        },
        'usr': []
      }
      const path = ['etc', 'init.d']
      const result = tree.find(source, path)
      const expect = ['cron', 'mysql', 'supervisord']

      assert.deepEqual(result, expect)
    })
  })

  describe('#isDir', () => {
    it('should return true, if an item is a directory', () => {
      const input = {
        'file.txt': 'Hello World',
        'file.html': '<html>Hello World</html>'
      }
      assert(tree.isDir(input) === true)
    })

    it('should return false, if an item is a directory containing folders', () => {
      const input = 'I am a file'
      assert(tree.isDir(input) === false)
    })
  })

  describe('#isFile', () => {
    it('should return true, if an item is a file', () => {
      const input = 'I am a file'
      assert(tree.isFile(input) === true)
    })

    it('should return false, if an item is a directory', () => {
      const input = {
        'file.txt': 'Hello World',
        'file.html': '<html>Hello World</html>'
      }
      assert(tree.isFile(input) === false)
    })
  })

  describe('#list', () => {
    it('should return a list with information on all items', () => {
      const input = {
        'documents': {
          'letter.txt': 'Hello John! How are you?',
          'todo-list.md': '- buy food\n- explore world'
        },
        'websites': {
          'my-site': {}
        },
        'README': 'Follow the instructions!',
        'LICENSE': 'public domain'
      }
      const result = tree.list(input)
      const expect = ['documents/', 'websites/', 'README', 'LICENSE']
      assert.deepEqual(result, expect)
    })
  })
})
