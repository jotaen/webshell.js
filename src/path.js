'use strict'

exports.split = (path) => {
  return path.split('/').filter((item) => {
    return item !== ''
  })
}
