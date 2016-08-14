'use strict'

const createStore = require('redux').createStore
const reducers = require('../src/reducers/index')
const action = require('../src/actions')
const defaultState = require('../src/defaultState')

module.exports = () => {
  const store = createStore(reducers, defaultState(reducers))
  store.dispatch(action.activity(new Date(1245151961)))
  store.dispatch(action.login('root'))
  store.dispatch(action.login('alice'))
  store.dispatch(action.createDirectory(['bin']))
  store.dispatch(action.createFile(['bin', 'date'], '2024-12-24T18:19:23Z'))
  store.dispatch(action.createDirectory(['etc']))
  store.dispatch(action.createFile(['etc', 'passwd'], '198azsf1i2hhAs8faz98ZHU'))
  store.dispatch(action.createFile(['etc', 'hosts'], '127.0.0.1 localhost'))
  store.dispatch(action.createDirectory(['usr']))
  store.dispatch(action.createDirectory(['usr', 'local']))
  return store
}
