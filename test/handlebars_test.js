var grunt = require('grunt');

exports['handlebars'] = {
  main: function(test) {
    'use strict';

    test.expect(6);

    var expect, result;

    expect = grunt.file.read("test/expected/handlebars.js");
    result = grunt.file.read("tmp/handlebars.js");
    test.equal(expect, result, "should compile partials into Handlebars.partials and handlebars template into JST");

    expect = grunt.file.read("test/expected/handlebarswrap.js");
    result = grunt.file.read("tmp/handlebarswrap.js");
    test.equal(expect, result, "should compile partials into Handlebars.partials and handlebars template into JST");

    expect = grunt.file.read("test/expected/uglyfile.js");
    result = grunt.file.read("tmp/uglyfile.js");
    test.equal(expect, result, "should escape single quotes in filenames");

    expect = grunt.file.read("test/expected/namespace_this.js");
    result = grunt.file.read("tmp/namespace_this.js");
    test.equal(expect, result, "should not attempt to declare this");

    expect = grunt.file.read("test/expected/namespace_nested.js");
    result = grunt.file.read("tmp/namespace_nested.js");
    test.equal(expect, result, "should declare all parts of nested namespace");

    expect = grunt.file.read("test/expected/namespace_globalvar.js");
    result = grunt.file.read("tmp/namespace_globalvar.js");
    test.equal(expect, result, "should declare global vars with var");

    test.done();
  }
};