'use strict'

exports.find = (tree, path) => {
  return path.reduce((tree, item) => {
    if (typeof tree === 'object' && tree[item]) return tree[item]
    return undefined
  }, tree)
}

exports.isEndpoint = (obj) => {
  return typeof obj === 'string'
}

exports.isBranchPoint = (obj) => {
  return typeof obj === 'object'
}

exports.list = (tree) => {
  return Object.keys(tree).map((item) => {
    if (typeof tree[item] === 'object') return item + '/'
    return item
  })
}
