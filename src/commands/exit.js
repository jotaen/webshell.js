'use strict'

const action = require('../actions')

module.exports = (input, buffer, state, dispatch) => {
  dispatch(action.logout())
}
