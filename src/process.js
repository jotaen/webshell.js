'use strict'

exports.path = (path) => {
  return path.split('/').filter((item) => {
    return item !== ''
  })
}
