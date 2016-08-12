'use strict'

const sanitize = (pathString) => {
  return pathString.split('/').filter((node) => {
    return node !== ''
  })
}

const resolveDots = (path, referencePath) => {
  return path.reduce((result, node) => {
    if (node === '..') return result.slice(0, -1)
    else if (node === '.') return result
    else return result.concat(node)
  }, referencePath)
}

const isAbsolutePath = (pathString) => (pathString.substr(0, 1) === '/')

module.exports = (pathString, referenceLocation) => {
  let ref = []
  if (!isAbsolutePath(pathString)) ref = ref.concat(referenceLocation)
  const path = sanitize(pathString)
  return resolveDots(path, ref)
}
