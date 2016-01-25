"use strict";

var Cli = function(document) {
  this._color = "#000000";
  this._weight = "normal";
  this._style = "normal";
};
module.exports = Cli;

Cli.prototype.out = (text) => {

  return this;
}

Cli.prototype.nl = (repeat) => {

  return this;
};
