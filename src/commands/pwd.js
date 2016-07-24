'use strict';

module.exports = (input, terminal, store) => {
  const path = store.getState().workingDir
  const output = '/' + path.join('/')
  terminal.print(output)
}
