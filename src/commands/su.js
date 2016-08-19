'use strict'

const action = require('../actions')
const CommandError = require('../errors')

exports.help = ({
  description: 'Switch current user',
  usage: 'su [username]'
})

exports.main = (args, print, state, dispatch) => {
  if (args.length === 0) throw new CommandError.InvalidArgument()
  dispatch(action.login(args[0]))
}
