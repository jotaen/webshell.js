'use strict'

const action = require('../actions')

module.exports = (input, buffer, store) => {
  try {
    store.dispatch(action.switchUser(input))
  } catch (e) {
    return
  }
}
