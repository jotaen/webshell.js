'use strict'

const printAll = (print, commands) => {
  const list = Object.keys(commands).sort()
  print('Commands:')
  print(list)
}

const printOne = (print, commands, name) => {
  const cmd = commands[name]
  if (!cmd || typeof cmd.help !== 'function') {
    print('help: No topic found for command `' + name + '`')
    return
  }
  const help = cmd.help()
  if (help.description) print(help.description)
  if (help.usage) print('usage: ' + help.usage)
}

exports.help = () => ({
  description: 'Displays help messages',
  usage: 'help [command]'
})

exports.main = (args, print) => {
  const commands = require('./index')
  if (args.length === 0) printAll(print, commands)
  else printOne(print, commands, args[0])
}
