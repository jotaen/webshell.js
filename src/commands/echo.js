'use strict'

exports.help = ({
  description: 'Prints text on the console',
  usage: 'echo [word, ...]'
})

exports.main = (args, print) => {
  const text = args.join(' ')
  print(text)
}
