'use strict'

const rd = require('./reducerDictionary')
const filesystem = require('./filesystem')

module.exports = rd.dict(rd.combine([
  filesystem
]))
