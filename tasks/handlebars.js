/*
 * grunt-contrib-handlebars
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tim Branyen, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-contrib-less/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {
  "use strict";

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  var _ = grunt.util._;
  var helpers = require('grunt-contrib-lib').init(grunt);

  // filename conversion for templates
  var defaultProcessName = function(name) { return name; };

  // filename conversion for partials
  var defaultProcessPartialName = function(filePath) {
    var pieces = _.last(filePath.split("/")).split(".");
    var name   = _(pieces).without(_.last(pieces)).join("."); // strips file extension
    return name.substr(1, name.length);                       // strips leading _ character
  };

  // full template compilation
  var templateFn = function(source, filepath, namespace) {
    try {
      var output = "Handlebars.template(" + require("handlebars").precompile(source) + ");";
      return namespace + "['" + filepath + "'] = " + output;
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn("Handlebars failed to compile.");
    }
  };

  // partial template compilation
  var partialFn = function(source, filepath, namespace) {
    try {
      return "Handlebars.registerPartial('" + filepath + "', " + "Handlebars.template(" + require("handlebars").precompile(source) + "));";
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn("Handlebars failed to compile partial.");
    }
  };

  grunt.registerMultiTask("handlebars", "Compile handlebars templates and partials.", function() {
    var options = helpers.options(this, {namespace: "JST"});

    grunt.verbose.writeflags(options, "Options");

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

    var srcFiles, src, filename;
    var partials = [];
    var templates = [];
    var output = [];
    var namespace = "this['" + options.namespace + "']";
    var isPartial = options.partialRegex || /^_/;
    var processName = options.processName || defaultProcessName;
    var processPartialName = options.processName || defaultProcessPartialName;

    this.files.forEach(function(files) {

      srcFiles = grunt.file.expandFiles(files.src);

      srcFiles.forEach(function(file) {
        src = grunt.file.read(file);
        console.log(src);

        if(isPartial.test(_.last(file.split("/")))) {
          filename = processPartialName(file);
          partials.push(partialFn(src, filename, namespace));
        } else {
          filename = processName(file);
          templates.push(templateFn(src, filename, namespace));
        }
      });
      output = output.concat(partials, templates);

      if (output.length > 0) {
        output.unshift(namespace + " = " + namespace + " || {};");
        grunt.file.write(files.dest, output.join("\n\n"));
        grunt.log.writeln("File '" + files.dest + "' created.");
      }
    });
  });

};
