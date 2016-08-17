'use strict'

module.exports = (args, print) => {
  print('Commands:')
  print('\n')
  const commands = require('./index')
  const list = Object.keys(commands).sort()
  print(list.join(', '))
}
