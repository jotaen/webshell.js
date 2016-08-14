'use strict'

exports.LOGIN = (state, action) => {
  if (action.userName === '') throw Error('EMPTY_USERNAME')
  const sessions = state.sessions.concat([String(action.userName)])
  return Object.assign({}, state, {sessions})
}

exports.LOGOUT = (state, action) => {
  const sessions = state.sessions.slice(0, -1)
  return Object.assign({}, state, {sessions})
}
