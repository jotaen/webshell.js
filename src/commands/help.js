'use strict'

module.exports = (input, terminal) => {
  terminal.print('Commands:')
  terminal.print('\n')
  const commands = require('./index')
  const list = Object.keys(commands).sort()
  terminal.print(list.join(', '))
}
