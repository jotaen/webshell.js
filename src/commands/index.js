'use strict'

module.exports = {
  cat: require('./cat'),
  cd: require('./cd'),
  debug: require('./debug'),
  exit: require('./exit'),
  login: require('./su'), // alias
  logout: require('./exit'), // alias
  ls: require('./ls'),
  mkdir: require('./mkdir'),
  pwd: require('./pwd'),
  su: require('./su'),
  whoami: require('./whoami')
}
