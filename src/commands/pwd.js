'use strict';

module.exports = (input, terminal, store) => {
  terminal.print(store.getState().workingDirectory)
}
