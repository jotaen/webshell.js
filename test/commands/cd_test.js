"use strict";

let chai = require("chai");
let assert = chai.assert;

let cd = require("../src/commands/cd.js");
let terminal = require("../src/terminal.js");

describe("#main()", () => {
  it("should exist", () => {
    cd.main("test", terminal);
  });
});
