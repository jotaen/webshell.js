'use strict'

const stack = require('../stack')

module.exports = (input, print, state) => {
  const userName = stack.latest(state.sessions)
  print(userName)
}
