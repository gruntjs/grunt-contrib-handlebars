var grunt = require('grunt');

exports['handlebars'] = {
  main: function(test) {
    'use strict';

    test.expect(5);

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

    expect = grunt.file.read("test/expected/ns_nested.js");
    result = grunt.file.read("tmp/ns_nested.js");
    test.equal(expect, result, "should define parts of nested namespaces");
    
    expect = grunt.file.read("test/expected/ns_nested.js"); // same as previous test
    result = grunt.file.read("tmp/ns_nested_this.js");
    test.equal(expect, result, "should define parts of nested namespaces, ignoring this.");
    
    test.done();
  }
};