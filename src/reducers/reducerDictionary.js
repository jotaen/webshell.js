'use strict'

exports.combine = (reducerArray) => {
  return reducerArray.reduce((prev, curr) => {
    return Object.assign(prev, curr)
  }, {})
}

exports.dict = (dict) => (state, action) => {
  if (dict[action.type]) {
    return dict[action.type](state, action)
  }
  return state
}
