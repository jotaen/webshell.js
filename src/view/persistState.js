exports.read = (id) => {
  const key = 'webshelljs_' + id
  const value = window.localStorage.getItem(key)
  if (!value) return undefined
  const result = JSON.parse(value)
  if (result.lastActivity) result.lastActivity = new Date(result.lastActivity)
  return result
}

exports.delete = (id) => {
  const key = 'webshelljs_' + id
  window.localStorage.removeItem(key)
}

exports.save = (id, state) => {
  const key = 'webshelljs_' + id
  const value = JSON.stringify(state)
  window.localStorage.setItem(key, value)
}
