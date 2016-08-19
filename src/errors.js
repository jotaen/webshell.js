'use strict'

exports.PathNotFound = PathNotFound
exports.PathAlreadyExists = PathAlreadyExists
exports.NotADirectory = NotADirectory
exports.NotAFile = NotAFile
exports.InvalidParameter = InvalidParameter

function PathNotFound (path) {
  this.name = 'PathNotFound'
  this.message = '/' + path.join('/') + ': No such file or directory'
  this.stack = (new Error()).stack
}
PathNotFound.prototype = Object.create(Error.prototype)
PathNotFound.prototype.constructor = PathNotFound

function PathAlreadyExists (path) {
  this.name = 'PathAlreadyExists'
  this.message = '/' + path.join('/') + ': File or directory does already exist'
  this.stack = (new Error()).stack
}
PathAlreadyExists.prototype = Object.create(Error.prototype)
PathAlreadyExists.prototype.constructor = PathAlreadyExists

function NotADirectory (path) {
  this.name = 'NotADirectory'
  this.message = '/' + path.join('/') + ': Is not a directory'
  this.stack = (new Error()).stack
}
NotADirectory.prototype = Object.create(Error.prototype)
NotADirectory.prototype.constructor = NotADirectory

function NotAFile (path) {
  this.name = 'NotAFile'
  this.message = '/' + path.join('/') + ': Is not a file'
  this.stack = (new Error()).stack
}
NotAFile.prototype = Object.create(Error.prototype)
NotAFile.prototype.constructor = NotAFile

function InvalidParameter (parameter) {
  this.name = 'InvalidParameter'
  if (!parameter) this.message = 'Empty parameter not allowed'
  else this.message = parameter + ': Invalid argument'
  this.stack = (new Error()).stack
}
InvalidParameter.prototype = Object.create(Error.prototype)
InvalidParameter.prototype.constructor = InvalidParameter
