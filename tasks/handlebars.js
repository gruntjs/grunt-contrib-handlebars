/*
 * grunt-contrib-handlebars
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Tim Branyen, contributors
 * Licensed under the MIT license.
 */

'use strict';
var chalk = require('chalk');

module.exports = function(grunt) {
  var _ = grunt.util._;
  var helpers = require('grunt-lib-contrib').init(grunt);

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

    // assign regex for partials directory detection
    var partialsPathRegex = options.partialsPathRegex || /./;

    // assign regex for partial detection
    var isPartial = options.partialRegex || /^_/;

    // assign transformation functions
    var processContent = options.processContent || defaultProcessContent;
    var processName = options.processName || defaultProcessName;
    var processPartialName = options.processPartialName || defaultProcessPartialName;
    var processAST = options.processAST || defaultProcessAST;
    var useNamespace = options.namespace !== false;

    var namespaceInfo = _.memoize(function(filepath) {
      if (!useNamespace) {return undefined;}
      if (_.isFunction(options.namespace)) {
        return helpers.getNamespaceDeclaration(options.namespace(filepath));
      } else {
        return helpers.getNamespaceDeclaration(options.namespace);
      }
    });

    // assign compiler options
    var compilerOptions = options.compilerOptions || {};

    this.files.forEach(function(f) {
      var partials = [];
      var templates = [];
      var nsDeclarations = {};
      var nsInfo;

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
        var src = processContent(grunt.file.read(filepath), filepath);
        nsInfo = namespaceInfo(filepath);
        if (nsInfo) {
          // save a map of declarations so we can put them at the top of the file later
          nsDeclarations[nsInfo.namespace] = nsInfo.declaration;
        }

        var Handlebars = require('handlebars');
        var ast, compiled, filename;
        try {
          // parse the handlebars template into it's AST
          ast = processAST(Handlebars.parse(src));
          compiled = Handlebars.precompile(ast, compilerOptions);

          // if configured to, wrap template in Handlebars.template call
          if (options.wrapped === true) {
            compiled = 'Handlebars.template('+compiled+')';
          }
        } catch (e) {
          grunt.log.error(e);
          grunt.fail.warn('Handlebars failed to compile '+filepath+'.');
        }

        // register partial or add template to namespace
        if (partialsPathRegex.test(filepath) && isPartial.test(_.last(filepath.split('/')))) {
          filename = processPartialName(filepath);
          if (options.partialsUseNamespace === true) {
            partials.push('Handlebars.registerPartial('+JSON.stringify(filename)+', '+nsInfo.namespace+'['+JSON.stringify(filename)+'] = '+compiled+');');
          } else {
            partials.push('Handlebars.registerPartial('+JSON.stringify(filename)+', '+compiled+');');
          }
        } else {
          if(options.amd && !useNamespace) {
            compiled = 'return ' + compiled;
          }
          filename = processName(filepath);
          if (useNamespace) {
            templates.push(nsInfo.namespace+'['+JSON.stringify(filename)+'] = '+compiled+';');
          } else if (options.commonjs === true) {
            templates.push('templates['+JSON.stringify(filename)+'] = '+compiled+';');
          } else {
            templates.push(compiled);
          }
        }
      });

      var output = partials.concat(templates);
      if (output.length < 1) {
        grunt.log.warn('Destination not written because compiled files were empty.');
      } else {
        if (useNamespace) {
          var declarations = _.values(nsDeclarations).join(options.separator);
          output.unshift(declarations);

          if (options.node) {
            output.unshift('Handlebars = glob.Handlebars || require(\'handlebars\');');
            output.unshift('var glob = (\'undefined\' === typeof window) ? global : window,');

            var nodeExport = 'if (typeof exports === \'object\' && exports) {';
            nodeExport += 'module.exports = ' + nsInfo.namespace + ';}';

            output.push(nodeExport);
          }

        }

        if (options.amd) {
          // Wrap the file in an AMD define fn.
          output.unshift("define(['handlebars'], function(Handlebars) {");
          if (useNamespace) {
            // Namespace has not been explicitly set to false; the AMD
            // wrapper will return the object containing the template.
            output.push("return "+nsInfo.namespace+";");
          }
          output.push("});");
        }

        if (options.commonjs) {
          if (useNamespace) {
            output.push("return "+nsInfo.namespace+";");
          } else {
            output.unshift('var templates = {};');
            output.push("return templates;");
          }
          // Export the templates object for CommonJS environments.
          output.unshift("module.exports = function(Handlebars) {");
          output.push("};");
        }

        grunt.file.write(f.dest, output.join(grunt.util.normalizelf(options.separator)));
        grunt.log.writeln('File ' + chalk.cyan(f.dest) + ' created.');
      }
    });

  });

};
