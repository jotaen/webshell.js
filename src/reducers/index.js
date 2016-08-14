'use strict'

const dict = Object.assign({},
  require('./engine'),
  require('./filesystem'),
  require('./sessions')
)

module.exports = (state, action) => {
  if (dict[action.type]) {
    return dict[action.type](state, action)
  }
  return state
}
