'use strict'

exports.changeDirectory = (targetDir) => ({
  type: 'CHANGE_DIRECTORY',
  targetDir: targetDir
})

exports.createDirectory = (targetDir) => ({
  type: 'CREATE_DIRECTORY',
  targetDir: targetDir
})

exports.createFile = (targetDir, content) => ({
  type: 'CREATE_FILE',
  targetDir: targetDir,
  content: content
})
