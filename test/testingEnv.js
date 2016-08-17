'use strict'

const createBuffer = require('../src/buffer.js')
const testingStore = require('./testingStore')

module.exports = () => {
  const store = testingStore()
  return {
    frozenState: Object.freeze(store.getState()),
    buffer: createBuffer(),
    dispatch: store.dispatch,
    store
  }
}
