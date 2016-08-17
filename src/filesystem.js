'use strict'

const deepmerge = require('deepmerge')

exports.find = (tree, path) => {
  return path.reduce((tree, item) => {
    if (typeof tree === 'object') {
      if (typeof tree[item] === 'object' || typeof tree[item] === 'string') {
        return tree[item]
      }
    }
    return undefined
  }, tree)
}

exports.isFile = (tree, path) => {
  const branch = this.find(tree, path)
  return typeof branch === 'string'
}

exports.remove = (tree, path) => {
  const copy = Object.assign({}, tree)
  let last = path.length
  path.reduce((tr, item) => {
    last--
    if (tr === undefined || tr[item] === undefined) return undefined
    if (last === 0) delete tr[item]
    else return tr[item]
  }, copy)
  return copy
}

exports.isDirectory = (tree, path) => {
  const branch = this.find(tree, path)
  return typeof branch === 'object'
}

exports.insert = (tree, path, content) => {
  const branch = path.reverse().reduce((obj, key) => {
    const node = {}
    node[key] = obj
    return node
  }, content)
  return deepmerge(tree, branch)
}
