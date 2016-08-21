'use strict'

const {compose} = require('redux')

module.exports = compose(
  // Redux DevTools Extension:
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)
