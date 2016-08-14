'use strict'

const user = require('../user')

module.exports = (input, terminal, store) => {
  const userName = user.name(store.getState().sessions)
  terminal.print(userName)
}
