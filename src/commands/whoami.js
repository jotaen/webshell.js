'use strict'

const stack = require('../stack')

module.exports = (args, print, state) => {
  const userName = stack.latest(state.sessions)
  print(userName)
}
