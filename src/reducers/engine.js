'use strict'

exports.SAVE_INPUT = (state, action) => {
  const sanitizedInput = action.input.trim()
  if (sanitizedInput === '') return state
  const history = state.history.concat([String(sanitizedInput)])
  return Object.assign({}, state, {history})
}

exports.ACTIVITY = (state, action) => {
  return Object.assign({}, state, {lastActivity: action.timestamp})
}
