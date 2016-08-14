'use strict'

exports.SAVE_INPUT = (state, action) => {
  const sanitizedInput = action.input.trim()
  if (sanitizedInput === '') return state
  const history = state.history.concat([String(sanitizedInput)])
  return Object.assign({}, state, {history})
}
