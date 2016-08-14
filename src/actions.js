'use strict'

exports.changeLocation = (path) => ({
  type: 'CHANGE_LOCATION',
  path
})

exports.createDirectory = (path) => ({
  type: 'CREATE_PATH',
  path,
  content: {}
})

exports.createFile = (path, content) => ({
  type: 'CREATE_PATH',
  path,
  content: content
})

exports.login = (userName) => ({
  type: 'LOGIN',
  userName
})
