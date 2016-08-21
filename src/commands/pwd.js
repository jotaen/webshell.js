'use strict'

exports.help = () => ({
  description: 'Print current working directory',
  usage: 'pwd'
})

exports.main = (args, print, state) => {
  const location = state.currentLocation
  const output = '/' + location.join('/')
  print(output)
}
