'use strict'

const action = require('../actions')

module.exports = (input, buffer, state, dispatch) => {
  try {
    dispatch(action.login(input))
  } catch (e) {
    return
  }
}
