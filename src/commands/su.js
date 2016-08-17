'use strict'

const action = require('../actions')
const CommandError = require('../errors')

module.exports = (args, print, state, dispatch) => {
  if (args.length === 0) throw new CommandError.InvalidArgument()
  dispatch(action.login(args[0]))
}
