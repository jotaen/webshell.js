'use strict'

const action = require('../actions')

module.exports = (args, print, state, dispatch) => {
  dispatch(action.logout())
}
