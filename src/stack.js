'use strict'

exports.latest = (stack) => {
  const name = stack[stack.length - 1]
  if (!name) return ''
  return name
}
