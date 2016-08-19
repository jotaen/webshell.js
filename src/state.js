'use strict'

exports.default = () => ({
  currentLocation: [],
  fileTree: {},
  history: [],
  lastActivity: null,
  sessions: ['root']
})

exports.serialize = (state) => {
  return JSON.stringify(state)
}

exports.deserialize = (string) => {
  const state = JSON.parse(string)
  if (state.lastActivity) state.lastActivity = new Date(state.lastActivity)
  return state
}

exports.copy = (state) => {
  return this.deserialize(this.serialize(state))
}
