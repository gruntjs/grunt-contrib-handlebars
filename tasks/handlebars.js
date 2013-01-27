/*
 * grunt-contrib-handlebars
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tim Branyen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var _ = grunt.util._;
  var helpers = require('grunt-lib-contrib').init(grunt);

  // filename conversion for templates
  var defaultProcessName = function(name) { return name; };

  // filename conversion for partials
  var defaultProcessPartialName = function(filePath) {
    var pieces = _.last(filePath.split('/')).split('.');
    var name   = _(pieces).without(_.last(pieces)).join('.'); // strips file extension
    return name.substr(1, name.length);                       // strips leading _ character
  };

  grunt.registerMultiTask('handlebars', 'Compile handlebars templates and partials.', function() {
    var options = this.options({
      namespace: 'JST',
      separator: grunt.util.linefeed + grunt.util.linefeed,
      wrapped: true
    });
    grunt.verbose.writeflags(options, 'Options');

    var nsInfo = helpers.getNamespaceDeclaration(options.namespace);

    // assign regex for partial detection
    var isPartial = options.partialRegex || /^_/;

    // assign filename transformation functions
    var processName = options.processName || defaultProcessName;
    var processPartialName = options.processPartialName || defaultProcessPartialName;

    this.files.forEach(function(f) {
      var partials = [];
      var templates = [];

      // iterate files, processing partials and templates separately
      f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      })
      .forEach(function(filepath) {
        var src = grunt.file.read(filepath);
        var compiled, filename;
        try {
          compiled = require('handlebars').precompile(src);
          // if configured to, wrap template in Handlebars.template call
          if (options.wrapped) {
            compiled = 'Handlebars.template('+compiled+')';
          }
        } catch (e) {
          grunt.log.error(e);
          grunt.fail.warn('Handlebars failed to compile '+filepath+'.');
        }

        // register partial or add template to namespace
        if (isPartial.test(_.last(filepath.split('/')))) {
          filename = processPartialName(filepath);
          partials.push('Handlebars.registerPartial('+JSON.stringify(filename)+', '+compiled+');');
        } else {
          filename = processName(filepath);
          templates.push(nsInfo.namespace+'['+JSON.stringify(filename)+'] = '+compiled+';');
        }
      });

      var output = partials.concat(templates);
      if (output.length < 1) {
        grunt.log.warn('Destination not written because compiled files were empty.');
      } else {
        output.unshift(nsInfo.declaration);
        grunt.file.write(f.dest, output.join(grunt.util.normalizelf(options.separator)));
        grunt.log.writeln('File "' + f.dest + '" created.');
      }
    });

  });

};
