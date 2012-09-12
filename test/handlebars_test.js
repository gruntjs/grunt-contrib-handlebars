var grunt = require('grunt');

exports['handlebars'] = {
  main: function(test) {
    'use strict';

    test.expect(9);

    var expect, result;

    expect = grunt.file.read("test/expected/handlebars.js");
    result = grunt.file.read("tmp/handlebars.js");
    test.equal(expect, result, "should compile partials into Handlebars.partials and handlebars template into JST");

    expect = grunt.file.read("test/expected/handlebarswrap.js");
    result = grunt.file.read("tmp/handlebarswrap.js");
    test.equal(expect, result, "should compile partials into Handlebars.partials and handlebars template into JST");

    // Ugly filename with singlequotes
    expect = grunt.file.read("test/expected/uglyfile.js");
    result = grunt.file.read("tmp/uglyfile.js");
    test.equal(expect, result, "should escape single quotes in filenames");

    // Namespace tests
    expect = grunt.file.read("test/expected/namespace_this.js");
    result = grunt.file.read("tmp/namespace_this.js");
    test.equal(expect, result, "should not attempt to declare this");

    expect = grunt.file.read("test/expected/namespace_nested.js");
    result = grunt.file.read("tmp/namespace_nested.js");
    test.equal(expect, result, "should declare all parts of nested namespace");

    expect = grunt.file.read("test/expected/namespace_globalvar.js");
    result = grunt.file.read("tmp/namespace_globalvar.js");
    test.equal(expect, result, "should declare global vars with var");

    // With square brackets
    expect = grunt.file.read("test/expected/namespace_this_square.js");
    result = grunt.file.read("tmp/namespace_this_square.js");
    test.equal(expect, result, "should declare this with square brackets correctly");

    expect = grunt.file.read("test/expected/namespace_nested_square.js");
    result = grunt.file.read("tmp/namespace_nested_square.js");
    test.equal(expect, result, "should declare nested namespaces with square brackets correctly");
    
    expect = grunt.file.read("test/expected/namespace_globalvar_square.js");
    result = grunt.file.read("tmp/namespace_globalvar_square.js");
    test.equal(expect, result, "should declare global vars with square brackets inside of this");
    
    test.done();
  }
};