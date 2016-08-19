'use strict'

const printAll = (print, commands) => {
  const list = Object.keys(commands).sort()
  print('Commands:')
  print(list)
}

const printOne = (print, commands, name) => {
  const cmd = commands[name]
  if (!cmd || !cmd.help) {
    print('help: No topic found for command `' + name + '`')
    return
  }
  if (cmd.help.description) print(cmd.help.description)
  if (cmd.help.usage) print('usage: ' + cmd.help.usage)
}

exports.main = (args, print) => {
  const commands = require('./index')
  if (args.length === 0) printAll(print, commands)
  else printOne(print, commands, args[0])
}
