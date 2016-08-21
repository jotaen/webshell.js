'use strict'

const action = require('../actions')

exports.help = () => ({
  description: 'Terminate session of currently logged in user',
  usage: 'exit'
})

exports.main = (args, print, state, dispatch) => {
  dispatch(action.logout())
}
