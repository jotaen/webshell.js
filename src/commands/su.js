'use strict'

const action = require('../actions')

exports.help = ({
  description: 'Switch current user',
  usage: 'su [username]'
})

exports.main = (args, print, state, dispatch) => {
  dispatch(action.login(args[0]))
}
