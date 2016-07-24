'use strict'

exports.changeDirectory = (targetDir) => ({
  type: 'CHANGE_DIRECTORY',
  targetDir: targetDir
})
