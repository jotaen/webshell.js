'use strict'

const action = require('../actions')

module.exports = (input, buffer, store) => {
  store.dispatch(action.logout())
}
