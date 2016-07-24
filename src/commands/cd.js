'use strict';

module.exports = (input, terminal, store) => {
  store.dispatch({
    type: 'CHANGE',
    workingDirectory: input
  })
}
