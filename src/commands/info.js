'use strict'

exports.help = ({
  description: 'Print info about this system',
  usage: 'info'
})

exports.main = (args, print) => {
  print('                __         __         ____    _     ')
  print(' _      _____  / /_  _____/ /_  ___  / / /   (_)____')
  print('| | /| / / _ \\/ __ \\/ ___/ __ \\/ _ \\/ / /   / / ___/')
  print('| |/ |/ /  __/ /_/ (__  ) / / /  __/ / /   / (__  ) ')
  print('|__/|__/\\___/_.___/____/_/ /_/\\___/_/_(_)_/ /____/  ')
  print('                                       /___/        ')
  print('')
  print('webshell.js • The command line interpreter that runs in your browser')
  print('See: https://github.com/jotaen/webshell.js')
  print()
  print('Created by: Jan Heuermann • http://jotaen.net')
  print()
}
