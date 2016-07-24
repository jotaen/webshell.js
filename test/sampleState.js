'use strict'

const initialState = require('../src/initialState')

exports.simple = () => {
  const state = initialState()
  state.filesystem = {
    'bin': {
      'date': '2024-12-24T18:19:23Z'
    },
    'etc': {
      'hosts': '127.0.0.1 localhost',
      'passwd': '198azsf1i2hhAs8faz98ZHU'
    },
    'usr': {
      'local': {}
    }
  }
  return state
}
