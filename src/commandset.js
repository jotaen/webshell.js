'use strict'

const lookup = (list) => (name) => {
  if (list[name]) {
    return list[name]
  }
  return undefined
}

const register = (list) => (name, command) => {
  if (typeof name !== 'string') throw Error('First parameter of "register" must be a string')
  if (typeof command !== 'function') throw Error('Second parameter of "register" must be a function')
  list[name] = command
}

module.exports = () => {
  let list = {}
  return {
    lookup: lookup(list),
    register: register(list),
    list: () => list
  }
}
