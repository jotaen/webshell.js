'use strict'

module.exports = (state, action) => {
  switch(action.type) {
    case 'CHANGE':
      return Object.assign({}, state, {workingDirectory: action.workingDirectory})
    default:
      return state
  }
}
