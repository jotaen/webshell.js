'use strict'

const assert = require('assert')
const filesystem = require('../../src/filesystem')

describe('#filesystem', () => {
  describe('#find', () => {
    it('should return the subtree, if `path` is a branch point', () => {
      const tree = {
        'bin': {},
        'etc': {},
        'usr': {
          'lib': {},
          'local': {}
        }
      }
      const path = ['usr']
      const result = filesystem.find(tree, path)
      const expect = {'local': {}, 'lib': {}}
      assert.deepEqual(result, expect)
    })

    it('should return the content, if `path` is an endpoint', () => {
      const tree = {
        'bin': {},
        'etc': {
          'hosts': '127.0.0.1 localhost'
        },
        'usr': {}
      }
      const path = ['etc', 'hosts']
      const result = filesystem.find(tree, path)
      const expect = '127.0.0.1 localhost'
      assert(result === expect)
    })

    it('should return `undefined`, if a point is not present', () => {
      const tree = {
        'bin': {},
        'etc': {},
        'usr': {}
      }
      const path = ['opt']
      const result = filesystem.find(tree, path)
      assert(result === undefined)
    })

    it('should find deeply nested endpoints', () => {
      const tree = {
        'etc': [],
        'usr': {
          'local': {
            'bin': {},
            'lib': {},
            'LICENSE.txt': 'Public domain'
          }
        }
      }
      const path = ['usr', 'local', 'LICENSE.txt']
      const result = filesystem.find(tree, path)
      const expect = 'Public domain'
      assert.deepEqual(result, expect)
    })
  })

  describe('#isDirectory', () => {
    it('should return true, if a node is a directory', () => {
      const tree = {
        'usr': {
          'bin': {}
        }
      }
      const path = ['usr', 'bin']
      const result = filesystem.isDirectory(tree, path)
      assert(result === true)
    })

    it('should return false, if a node is not a directory (but a file)', () => {
      const tree = {
        'usr': {
          'README.txt': 'Hello!'
        }
      }
      const path = ['usr', 'README.txt']
      const result = filesystem.isDirectory(tree, path)
      assert(result === false)
    })

    it('should return false, if a node does not exist', () => {
      const tree = {
        'bin': {},
        'usr': {}
      }
      const path = ['etc']
      const result = filesystem.isDirectory(tree, path)
      assert(result === false)
    })
  })

  describe('#isFile', () => {
    it('should return true, if a node is a file', () => {
      const tree = {
        'etc': {
          'hosts': '8.8.8.8 GOOGLE'
        }
      }
      const path = ['etc', 'hosts']
      const result = filesystem.isFile(tree, path)
      assert(result === true)
    })

    it('should return false, if a node is not a file (but a directory)', () => {
      const tree = {
        'usr': {
          'local': {}
        }
      }
      const path = ['usr', 'local']
      const result = filesystem.isFile(tree, path)
      assert(result === false)
    })

    it('should return false, if a node does not exist', () => {
      const tree = {
        'bin': {},
        'usr': {}
      }
      const path = ['README.txt']
      const result = filesystem.isFile(tree, path)
      assert(result === false)
    })
  })

  describe('#insert', () => {
    it('should insert a new endpoint into an empty filesystem', () => {
      const initialTree = {}
      const path = ['www']
      const node = {'index.txt': 'Hello World!'}
      const result = filesystem.insert(initialTree, path, node)
      const expect = {
        'www': {'index.txt': 'Hello World!'}
      }
      assert.deepEqual(result, expect)
    })

    it('should leave the rest of the original filesystem intact', () => {
      const initialTree = {
        'etc': {
          'hosts': '8.8.4.4 google.dns',
          'apache2': {
            'httpd.conf': ''
          }
        },
        'sbin': {
          'md5': '172cc879a248ecb9e8f9d809a'
        },
        'README.txt': 'Some important information'
      }
      const result = filesystem.insert(initialTree, ['etc', 'nfs.conf'], '### NFS CONFIG ###')
      const expect = {
        'etc': {
          'hosts': '8.8.4.4 google.dns',
          'apache2': {
            'httpd.conf': ''
          },
          'nfs.conf': '### NFS CONFIG ###'
        },
        'sbin': {
          'md5': '172cc879a248ecb9e8f9d809a'
        },
        'README.txt': 'Some important information'
      }
      assert.deepEqual(result, expect)
    })
  })
})
