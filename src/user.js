'use strict'

exports.name = (sessions) => {
  const name = sessions[sessions.length - 1]
  if (!name) return ''
  return name
}
