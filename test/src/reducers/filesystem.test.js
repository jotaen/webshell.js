'use strict'

const assert = require('assert')
const testingStore = require('../../testingStore')
const action = require('../../../src/actions')
const CommandError = require('../../../src/errors')

describe('#filesystem', () => {
  describe('#CHANGE_LOCATION', () => {
    it('should change the current location', () => {
      const store = testingStore()
      const newPath = ['bin']
      store.dispatch(action.changeLocation(newPath))
      const result = store.getState().currentLocation
      assert.deepEqual(result, newPath)
    })

    it('should not change the current location, if the target was not found', () => {
      const store = testingStore()
      const invalidPath = ['var', 'www']
      assert.throws(() => {
        store.dispatch(action.changeLocation(invalidPath))
      }, CommandError.PathNotFound)
      assert.deepEqual(store.getState().currentLocation, [])
    })

    it('should not change the current location, if the target is not a directory', () => {
      const store = testingStore()
      const invalidPath = ['etc', 'hosts']
      assert.throws(() => {
        store.dispatch(action.changeLocation(invalidPath))
      }, CommandError.NotADirectory)
      assert.deepEqual(store.getState().currentLocation, [])
    })
  })

  describe('#CREATE_DIRECTORY', () => {
    it('should create a new directory in the filesystem', () => {
      const store = testingStore()
      const path = ['var', 'www', 'html']
      store.dispatch(action.createDirectory(path))
      const expect = {
        'bin': {
          'date': '2024-12-24T18:19:23Z'
        },
        'etc': {
          'hosts': '127.0.0.1 localhost',
          'passwd': '198azsf1i2hhAs8faz98ZHU'
        },
        'usr': {
          'local': {}
        },
        'var': {
          'www': {
            'html': {}
          }
        }
      }
      assert.deepEqual(store.getState().fileTree, expect)
    })

    it('should not overwrite existing directories', () => {
      const store = testingStore()
      const original = Object.assign({}, store.getState().fileTree)
      const path = ['usr', 'local']
      assert.throws(() => {
        store.dispatch(action.createDirectory(path))
      }, CommandError.PathAlreadyExists)
      assert.deepEqual(store.getState().fileTree, original)
    })
  })

  describe('#CREATE_FILE', () => {
    it('should create a new file in the filesystem', () => {
      const store = testingStore()
      const path = ['var', 'www', 'index.html']
      store.dispatch(action.createFile(path, '<html>Hello World</html>'))
      const expect = {
        'bin': {
          'date': '2024-12-24T18:19:23Z'
        },
        'etc': {
          'hosts': '127.0.0.1 localhost',
          'passwd': '198azsf1i2hhAs8faz98ZHU'
        },
        'usr': {
          'local': {}
        },
        'var': {
          'www': {
            'index.html': '<html>Hello World</html>'
          }
        }
      }
      assert.deepEqual(store.getState().fileTree, expect)
    })

    it('should not overwrite existing files', () => {
      const store = testingStore()
      const original = Object.assign({}, store.getState().fileTree)
      const path = ['etc', 'hosts']
      assert.throws(() => {
        store.dispatch(action.createFile(path))
      }, CommandError.PathAlreadyExists)
      assert.deepEqual(store.getState().fileTree, original)
    })

    it('should always cast the content to type string', () => {
      const store = testingStore()
      const path = ['etc', 'test123']
      store.dispatch(action.createFile(path, 5))
      assert.strictEqual(store.getState().fileTree.etc.test123, '5')
    })

    it('should create an empty string, if no content was given', () => {
      const store = testingStore()
      const path = ['etc', 'foobar']
      store.dispatch(action.createFile(path))
      assert.strictEqual(store.getState().fileTree.etc.foobar, '')
    })
  })

  describe('#REMOVE_PATH', () => {
    it('should remove a file from the filesystem', () => {
      const store = testingStore()
      const path = ['etc', 'hosts']
      store.dispatch(action.delete(path))
      const expect = {
        'bin': {
          'date': '2024-12-24T18:19:23Z'
        },
        'etc': {
          'passwd': '198azsf1i2hhAs8faz98ZHU'
        },
        'usr': {
          'local': {}
        }
      }
      assert.deepEqual(store.getState().fileTree, expect)
    })
  })
})
