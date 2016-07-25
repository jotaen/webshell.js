'use strict'

const assert = require('assert')
const filesystem = require('../../../src/reducers/filesystem')
const createStore = require('redux').createStore
const sampleState = require('../../sampleState')
const action = require('../../../src/actions')

const setup = () => {
  return createStore(filesystem, sampleState.simple())
}

describe('#filesystem', () => {
  describe('#CHANGE_DIRECTORY', () => {
    it('should change the current working directory', () => {
      const store = setup()
      const newPath = ['bin']
      store.dispatch(action.changeDirectory(newPath))
      const result = store.getState().workingDir
      assert.deepEqual(result, newPath)
    })

    it('should not change the current working directory, if the target was not found', () => {
      const store = setup()
      const invalidPath = ['var', 'www']
      assert.throws(() => {
        store.dispatch(action.changeDirectory(invalidPath))
      }, /NOT_FOUND/)
      assert.deepEqual(store.getState().workingDir, [])
    })

    it('should not change the current working directory, if the target is not a directory', () => {
      const store = setup()
      const invalidPath = ['etc', 'hosts']
      assert.throws(() => {
        store.dispatch(action.changeDirectory(invalidPath))
      }, /NOT_A_DIRECTORY/)
      assert.deepEqual(store.getState().workingDir, [])
    })
  })

  describe('#CREATE_DIRECTORY', () => {
    it('should create a new directory in the filesystem', () => {
      const store = setup()
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
      const store = setup()
      const original = Object.assign({}, store.getState().filesystem)
      const path = ['usr', 'local']
      assert.throws(() => {
        store.dispatch(action.createDirectory(path))
      }, /ALREADY_EXISTS/)
      assert.deepEqual(store.getState().filesystem, original)
    })
  })
})
