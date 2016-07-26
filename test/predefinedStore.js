'use strict'

const createStore = require('redux').createStore
const initialState = require('../src/initialState')
const action = require('../src/actions')
const reducers = require('../src/reducers/index')

module.exports = () => {
  const store = createStore(reducers, initialState(reducers))
  store.dispatch(action.createDirectory(['bin']))
  store.dispatch(action.createFile(['bin', 'date'], '2024-12-24T18:19:23Z'))
  store.dispatch(action.createDirectory(['etc']))
  store.dispatch(action.createFile(['etc', 'passwd'], '198azsf1i2hhAs8faz98ZHU'))
  store.dispatch(action.createFile(['etc', 'hosts'], '127.0.0.1 localhost'))
  store.dispatch(action.createDirectory(['usr']))
  store.dispatch(action.createDirectory(['usr', 'local']))
  return store
}
