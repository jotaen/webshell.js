'use strict'

module.exports = (input, terminal, store) => {
  const user = store.getState().currentUser
  terminal.print(user)
}
