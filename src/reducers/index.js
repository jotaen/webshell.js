'use strict'

const rd = require('./reducerDictionary')

module.exports = rd.dict(rd.combine([
  require('./filesystem'),
  require('./sessions')
]))
