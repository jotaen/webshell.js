'use strict'

const stack = require('../stack')

module.exports = (input, terminal, store) => {
  const userName = stack.latest(store.getState().sessions)
  terminal.print(userName)
}
