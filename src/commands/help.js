'use strict'

module.exports = (args, print) => {
  print('Commands:')
  const commands = require('./index')
  const list = Object.keys(commands).sort()
  print(list)
}
