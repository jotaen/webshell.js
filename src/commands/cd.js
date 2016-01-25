"use strict";

exports.main = (args, c) => {
  c.style({color: "red", fontWeight: "bold"})
  .out(args)
  .nl();
};
