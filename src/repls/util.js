'use strict'

const stack = require('../stack')

exports.prompt = (state) => {
  const userName = stack.latest(state.sessions)
  const path = '/' + state.currentLocation.join('/')
  return userName + '@' + path
}

exports.welcome = (state) => {
  const userName = stack.latest(state.sessions)
  const date = state.lastActivity
  let result = 'Hello ' + userName + '!'
  if (date instanceof Date) result += ' Last activity: ' + date.toLocaleString()
  return result
}
