"use strict";

var assert = require("chai").assert;
var Commandset = require("../src/commandset.js");

describe("#list()", function() {
  it("should be empty after initialisation", function() {
    var cmds = new Commandset();
    assert.deepEqual(cmds.list(), {});
  });
});

describe("#register()", function() {
  it("should store list", function() {
    var cmds = new Commandset();

    var foo = function() {
      return 1;
    };

    cmds.register("foo", foo);
    assert.deepEqual(cmds.list(), {
      foo: foo
    });
  });

  it("should override command", function() {
    var cmds = new Commandset();

    var foo = function() {
      return "foo";
    };
    var baz = function() {
      return "baz";
    };
    cmds.register("foo", foo);
    cmds.register("foo", baz);

    assert.deepEqual(cmds.list(), {
      foo: baz
    });
  });
});

describe("#lookup()", function() {
  it("should find a previously registered command", function() {
    var cmds = new Commandset();

    var foo = function() {
      return "foo";
    };
    var baz = function() {
      return "baz";
    };
    cmds.register("foo", foo);
    cmds.register("baz", baz);

    assert.equal(cmds.lookup("foo"), foo);
    assert.equal(cmds.lookup("baz"), baz);
  });

  it ("should return undefined when no command was found", function() {
    var cmds = new Commandset();

    var foo = function() {
      return "foo";
    };
    cmds.register("foo", foo);

    assert.isUndefined(cmds.lookup("baz"));
  });
});
