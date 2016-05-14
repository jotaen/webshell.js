'use strict';

var Commandset = function() {
  this._list = {};
};
module.exports = Commandset;

Commandset.prototype.lookup = function(name) {
  if (this._list[name]) {
    return this._list[name];
  }
  return undefined;
};

Commandset.prototype.register = function(name, command) {
  if (! this._list.name) {
    this._list[name] = command;
  }
};

Commandset.prototype.list = function() {
  return this._list;
};
