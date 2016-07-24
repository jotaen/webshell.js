'use strict';

module.exports = (input, terminal, store) => {
  const path = store.getState().workingDirectory
  const output = '/' + path.join('/')
  terminal.print(output)
}
