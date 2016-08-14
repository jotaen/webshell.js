'use strict'

const webshell = require('../src/repls/commandline')

const initialState = {
  currentUser: 'cli',
  fileTree: {
    var: {
      www: {}
    }
  },
  currentLocation: ['var', 'www']
}
webshell(process.stdin, process.stdout, initialState)
