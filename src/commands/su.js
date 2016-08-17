'use strict'

const action = require('../actions')

module.exports = (input, print, state, dispatch) => {
  dispatch(action.login(input))
}
