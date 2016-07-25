'use strict'

exports.changeLocation = (path) => ({
  type: 'CHANGE_LOCATION',
  path: path
})

exports.createDirectory = (path) => ({
  type: 'CREATE_PATH',
  path: path,
  content: {}
})

exports.createFile = (path, content) => ({
  type: 'CREATE_PATH',
  path: path,
  content: content
})
