'use strict'

const assert = require('assert')
const filesystem = require('../../../src/reducers/filesystem')
const predefinedStore = require('../../predefinedStore')
const action = require('../../../src/actions')

describe('#filesystem', () => {
  describe('#CHANGE_DIRECTORY', () => {
    it('should change the current working directory', () => {
      const store = predefinedStore.simple(filesystem)
      const newPath = ['bin']
      store.dispatch(action.changeDirectory(newPath))
      const result = store.getState().workingDir
      assert.deepEqual(result, newPath)
    })

    it('should not change the current working directory, if the target was not found', () => {
      const store = predefinedStore.simple(filesystem)
      const invalidPath = ['var', 'www']
      assert.throws(() => {
        store.dispatch(action.changeDirectory(invalidPath))
      }, /NOT_FOUND/)
      assert.deepEqual(store.getState().workingDir, [])
    })

    it('should not change the current working directory, if the target is not a directory', () => {
      const store = predefinedStore.simple(filesystem)
      const invalidPath = ['etc', 'hosts']
      assert.throws(() => {
        store.dispatch(action.changeDirectory(invalidPath))
      }, /NOT_A_DIRECTORY/)
      assert.deepEqual(store.getState().workingDir, [])
    })
  })

  describe('#CREATE_DIRECTORY', () => {
    it('should create a new directory in the filesystem', () => {
      const store = predefinedStore.simple(filesystem)
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
      assert.deepEqual(store.getState().filesystem, expect)
    })

    it('should not overwrite existing directories', () => {
      const store = predefinedStore.simple(filesystem)
      const original = Object.assign({}, store.getState().filesystem)
      const path = ['usr', 'local']
      assert.throws(() => {
        store.dispatch(action.createDirectory(path))
      }, /ALREADY_EXISTS/)
      assert.deepEqual(store.getState().filesystem, original)
    })
  })

  describe('#CREATE_FILE', () => {
    it('should create a new file in the filesystem', () => {
      const store = predefinedStore.simple(filesystem)
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
      assert.deepEqual(store.getState().filesystem, expect)
    })

    it('should not overwrite existing files', () => {
      const store = predefinedStore.simple(filesystem)
      const original = Object.assign({}, store.getState().filesystem)
      const path = ['etc', 'hosts']
      assert.throws(() => {
        store.dispatch(action.createFile(path))
      }, /ALREADY_EXISTS/)
      assert.deepEqual(store.getState().filesystem, original)
    })
  })
})
