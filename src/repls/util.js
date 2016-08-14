'use strict'

const stack = require('../stack')

exports.prompt = (buffer, state) => {
  const userName = stack.latest(state.sessions)
  const path = '/' + state.currentLocation.join('/')
  buffer
    .color('green').print(userName)
    .color('light-gray').print('@')
    .color('yellow').print(path)
}

exports.welcome = (buffer, state) => {
  const userName = stack.latest(state.sessions)
  const date = state.lastActivity
  buffer.print('Hello ' + userName + '!')
  if (date instanceof Date) buffer.print(' Last activity: ' + date.toLocaleString())
}
