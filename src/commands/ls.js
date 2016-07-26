'use strict';

const process = require('../process')
const action = require('../actions')

// WIP

module.exports = (input, terminal, store) => {
  const path = process.path(input)

  Object.keys(tree).map((item) => {
    if (typeof tree[item] === 'object') return item + '/'
    return item
  })
}
