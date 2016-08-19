'use strict'

const stack = require('../stack')

exports.help = ({
  description: 'Print out name of currently logged in user',
  usage: 'whoami'
})

exports.main = (args, print, state) => {
  const userName = stack.latest(state.sessions)
  print(userName)
}
