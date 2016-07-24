'use strict'

exports.find = (tree, path) => {
  return path.reduce((tree, item) => {
    if (typeof tree === 'object' && tree[item]) return tree[item]
    return undefined
  }, tree)
}

exports.isFile = (obj) => {
  return typeof obj === 'string'
}

exports.isDir = (obj) => {
  return typeof obj === 'object'
}

exports.list = (tree) => {
  return Object.keys(tree).map((item) => {
    if (typeof tree[item] === 'object') return item + '/'
    return item
  })
}
