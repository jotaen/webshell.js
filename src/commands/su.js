'use strict'

const action = require('../actions')

module.exports = (input, print, state, dispatch) => {
  try {
    dispatch(action.login(input))
  } catch (e) {
    return
  }
}
