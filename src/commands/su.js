'use strict'

const action = require('../actions')

module.exports = (input, buffer, store) => {
  try {
    store.dispatch(action.login(input))
  } catch (e) {
    return
  }
}
