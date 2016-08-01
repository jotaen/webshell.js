'use strict'

exports.split = (pathString) => {
  return pathString.split('/').filter((node) => {
    return node !== ''
  })
}

exports.resolve = (pathArray) => {
  return pathArray.reduce((result, node) => {
    if (node === '..') return result.slice(0, -1)
    else if (node === '.') return result
    else return result.concat(node)
  }, [])
}
