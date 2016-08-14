'use strict'

exports.SWITCH_USER = (state, action) => {
  if (action.userName === '') throw Error('EMPTY_USERNAME')
  return Object.assign({}, state, {currentUser: String(action.userName)})
}
