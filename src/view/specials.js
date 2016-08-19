'use strict'

const stack = require('../stack')

exports.prompt = (state) => {
  const userName = stack.latest(state.sessions)
  const path = '/' + state.currentLocation.join('/')
  const html = [
    '<span class="text-green">' + userName + '</span>',
    '<span class="text-lightgray">@</span>',
    '<span class="text-yellow">' + path + '</span>'
  ]
  return html.join('')
}

exports.welcome = (state) => {
  const userName = stack.latest(state.sessions)
  const date = state.lastActivity
  let result = 'Hello ' + userName + '!'
  if (date instanceof Date) {
    result += ' Last activity: ' + date.toLocaleString()
    result += '<br>Reset the shell to its default state by <a class="text text-lightgray" href="?refresh">clicking here</a>'
  }
  return result
}
