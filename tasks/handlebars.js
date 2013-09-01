/*
 * grunt-contrib-handlebars
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Tim Branyen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var compileFactory = require('../lib/compile');
  var _ = grunt.util._;

  // content conversion for templates
  var defaultProcessContent = function(content) { return content; };

  // AST processing for templates
  var defaultProcessAST = function(ast) { return ast; };

  // filename conversion for templates
  var defaultProcessName = function(name) { return name; };

  // filename conversion for partials
  var defaultProcessPartialName = function(filePath) {
    var pieces = _.last(filePath.split('/')).split('.');
    var name   = _(pieces).without(_.last(pieces)).join('.'); // strips file extension
    if (name.charAt(0) === '_') {
      name = name.substr(1, name.length); // strips leading _ character
    }
    return name;
  };

  grunt.registerMultiTask('handlebars', 'Compile handlebars templates and partials.', function() {
    var options = this.options({
      namespace: 'JST',
      separator: grunt.util.linefeed + grunt.util.linefeed,
      wrapped: true,
      amd: false,
      commonjs: false,
      knownHelpers: [],
      knownHelpersOnly: false
    });
    grunt.verbose.writeflags(options, 'Options');

    // prepare options for compilation to take place

    // assign regex for partials directory detection
    options.partialsPathRegex = options.partialsPathRegex || /./;

    // assign regex for partial detection
    options.partialRegex = options.partialRegex || /^_/;

    // assign transformation functions
    options.processContent = options.processContent || defaultProcessContent;
    options.processName = options.processName || defaultProcessName;
    options.processPartialName = options.processPartialName || defaultProcessPartialName;
    options.processAST = options.processAST || defaultProcessAST;

    // assign compiler options
    options.compilerOptions = options.compilerOptions || {};

    var process = compileFactory(grunt, options);
    process(this.files);
  });

};
