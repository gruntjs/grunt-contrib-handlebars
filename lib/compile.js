/* globals module: false */
module.exports = (function() {
  'use strict';
  var glob = require('glob');
  var getExtension = require('./extensions');

  return function(grunt, options) {
    var _ = grunt.util._;
    var helpers = require('grunt-lib-contrib').init(grunt);

    var nsInfo;
    if (options.namespace !== false) {
      nsInfo = helpers.getNamespaceDeclaration(options.namespace);
    }

    var existingFile = function(filepath) {
      // Warn on and remove invalid source files (if nonull was set).
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');
        return false;
      } else {
        return true;
      }
    };

    var processFile = function(partials, templates) {
      return function(filepath) {
        var src = options.processContent(grunt.file.read(filepath));
        var Handlebars = require('handlebars');
        var ast, compiled, filename;
        try {
          // parse the handlebars template into it's AST
          ast = options.processAST(Handlebars.parse(src));
          compiled = Handlebars.precompile(ast, options.compilerOptions);

          // if configured to, wrap template in Handlebars.template call
          if (options.wrapped === true) {
            compiled = 'Handlebars.template('+compiled+')';
          }
        } catch (e) {
          grunt.log.error(e);
          grunt.fail.warn('Handlebars failed to compile '+filepath+'.');
        }

        // register partial or add template to namespace
        if (options.partialsPathRegex.test(filepath) && options.partialRegex.test(_.last(filepath.split('/')))) {
          filename = options.processPartialName(filepath);
          if (options.partialsUseNamespace === true) {
            partials.push('Handlebars.registerPartial('+JSON.stringify(filename)+', '+nsInfo.namespace+'['+JSON.stringify(filename)+'] = '+compiled+');');
          } else {
            partials.push('Handlebars.registerPartial('+JSON.stringify(filename)+', '+compiled+');');
          }
        } else {
          if(options.amd && options.namespace === false) {
            compiled = 'return ' + compiled;
          }
          filename = options.processName(filepath);
          if (options.namespace !== false) {
            templates.push(nsInfo.namespace+'['+JSON.stringify(filename)+'] = '+compiled+';');
          } else if (options.commonjs === true) {
            templates.push('templates['+JSON.stringify(filename)+'] = '+compiled+';');
          } else {
            templates.push(compiled);
          }
        }
      }
    };

    var process = function(partials, templates) {
      var output = partials.concat(templates);
      if (output.length < 1) {
        return output;
      }

      if (options.namespace !== false) {
        output.unshift(nsInfo.declaration);

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
        if (options.namespace !== false) {
          // Namespace has not been explicitly set to false; the AMD
          // wrapper will return the object containing the template.
          output.push("return "+nsInfo.namespace+";");
        }
        output.push("});");
      }

      if (options.commonjs) {
        if (options.namespace === false) {
          output.unshift('var templates = {};');
          output.push("return templates;");
        } else {
          output.push("return "+nsInfo.namespace+";");
        }
        // Export the templates object for CommonJS environments.
        output.unshift("module.exports = function(Handlebars) {");
        output.push("};");
      }

      return output;
    }

    var compileTemplate = function (f) {
      var partials = [];
      var templates = [];

      // iterate files, processing partials and templates separately
      f.src.filter(existingFile).forEach(processFile(partials, templates));

      var output = process(partials, templates);
      if (output.length < 1) {
        grunt.log.warn('Destination not written because compiled files were empty.');
      } else {
        grunt.file.write(f.dest, output.join(grunt.util.normalizelf(options.separator)));
        grunt.log.writeln('File "' + f.dest + '" created.');
      }
    }

    var compileFiles = function(files) {
      files.forEach(function(f) {
        if (f.src !== undefined && f.dest !== undefined) {
          compileTemplate(f);
        } else {
          glob.sync(f.pattern, {})
            .forEach(function (filePath) {
              var dest = f.dest + filePath.replace(f.base, '');
              dest = dest.replace(getExtension(dest), f.ext || 'js');

              compileTemplate({
                src: [filePath],
                dest: dest
              })
            });
        }
      });
    };
    return compileFiles;
  }
})();