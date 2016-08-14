'use strict'

const stack = require('../stack')

module.exports = (input, terminal, state) => {
  const userName = stack.latest(state.sessions)
  terminal.print(userName)
}
