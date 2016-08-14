const webshellReadState = (name) => {
  const key = 'webshelljs_' + name
  const value = window.localStorage.getItem(key)
  if (!value) return {}
  const result = JSON.parse(value)
  if (result.lastActivity) result.lastActivity = new Date(result.lastActivity)
  return result
}

const webshellDeleteState = (name) => {
  const key = 'webshelljs_' + name
  window.localStorage.removeItem(key)
}

const webshellDefaultState = () => ({
  currentLocation: ['var', 'www'],
  fileTree: {
    var: {
      www: {}
    }
  },
  sessions: ['browser']
})
