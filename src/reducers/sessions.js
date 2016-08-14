'use strict'

exports.LOGIN = (state, action) => {
  if (action.userName === '') throw Error('EMPTY_USERNAME')
  const sessions = state.sessions.concat([String(action.userName)])
  return Object.assign({}, state, {sessions})
}

