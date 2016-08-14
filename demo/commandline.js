'use strict'

const webshell = require('../src/repls/commandline')

const initialState = {
  sessions: ['cli'],
  fileTree: {
    var: {
      www: {}
    }
  },
  currentLocation: ['var', 'www']
}
webshell(process.stdin, process.stdout, initialState)
