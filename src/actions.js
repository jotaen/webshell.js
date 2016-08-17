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

exports.delete = (path) => ({
  type: 'REMOVE_PATH',
  path
})

exports.createFile = (path, content) => ({
  type: 'CREATE_PATH',
  path,
  content: content ? String(content) : ''
})

exports.login = (userName) => ({
  type: 'LOGIN',
  userName
})

exports.logout = () => ({
  type: 'LOGOUT'
})

exports.saveInput = (input) => ({
  type: 'SAVE_INPUT',
  input
})

exports.activity = () => ({
  type: 'ACTIVITY',
  timestamp: new Date()
})
