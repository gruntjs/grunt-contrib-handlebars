/*
 * grunt-contrib-handlebars
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tim Branyen, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-contrib-handlebars/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {
  "use strict";

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  var _ = grunt.util._;

  // filename conversion for templates
  var defaultProcessName = function(name) { return name; };

  // filename conversion for partials
  var defaultProcessPartialName = function(filePath) {
    var pieces = _.last(filePath.split("/")).split(".");
    var name   = _(pieces).without(_.last(pieces)).join("."); // strips file extension
    return name.substr(1, name.length);                       // strips leading _ character
  };

  var matchSquareBrackets = /\[|\]/;
  
  var escapeQuote = function(name) { return name.replace("'","\\'"); };
   
  function getRootNs(ns, squareBrackets) {
    if (squareBrackets) {
      if (matchSquareBrackets.test(ns)) { // error out if namespace contains square brackets already
        grunt.log.error('Handlebars options.namespace must be defined with dot notation');
        grunt.fail.warn("Handlebars failed to compile.");
      }
      var parts = ns.split('.');
      ns = 'this';
      parts.forEach(function(str, index) {
        if (str === 'this') {
          return;
        }
        ns += "['"+escapeQuote(str)+"']";
      });
    }
    return ns;
  }
  
  function getPartInfo(nsPart, index, squareBrackets) {
    if (nsPart === 'this') {
      return { prefix: '', part: nsPart };
    }

    var info = {
      prefix: '',
      part: nsPart
    };

    if (squareBrackets) {
      info.part = "['"+escapeQuote(info.part)+"']";
    }
    
    if (index === 0) {
      info.prefix = 'var ';
      if (squareBrackets) {
        info.prefix = '';
        info.part = 'this'+info.part;
      }
    }

    return info;
  }

  function defineNs(ns, squareBrackets) {
    if (ns === 'this') {	// No declaraction required for this
      return '';
    }

    var output = [];
    var nsParts = ns.split('.');
    var curPath = '';

    // Loop on each part and make sure it's declared
    nsParts.forEach(function(curPart, index) {
      // Get the prefix and escaped path part
      var partInfo = getPartInfo(curPart, index, squareBrackets);

      // Add the previous path
      curPath += partInfo.part;

      // Add the declaraction for this part of the namespace path
      if (curPart !== 'this') {
        output.push(partInfo.prefix+curPath + ' = ' + curPath + ' || {};');
      }

      // When not using square brackets, we need to add a .
      if (!squareBrackets) {
        curPath += '.';
      }
    });

    return output.join('\n');
  }

  grunt.registerMultiTask("handlebars", "Compile handlebars templates and partials.", function() {

    var helpers = require('grunt-contrib-lib').init(grunt);
    var options = helpers.options(this, {namespace: "JST", squareBrackets: true});

    grunt.verbose.writeflags(options, "Options");

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

    var compiled, srcFiles, src, filename;
    var partials = [];
    var templates = [];
    var output = [];
    var namespace = options.namespace;
    
    // get the root namespace we'll add templates to
    var rootNamespace = getRootNs(options.namespace, options.squareBrackets);

    // assign regex for partial detection
    var isPartial = options.partialRegex || /^_/;

    // assign filename transformation functions
    var processName = options.processName || defaultProcessName;
    var processPartialName = options.processName || defaultProcessPartialName;

    // iterate files, processing partials and templates separately
    this.files.forEach(function(files) {
      srcFiles = grunt.file.expandFiles(files.src);
      srcFiles.forEach(function(file) {
        src = grunt.file.read(file);

        try {
          compiled = require("handlebars").precompile(src);
          // if configured to, wrap template in Handlebars.template call
          if(options.wrapped) {
            compiled = "Handlebars.template("+compiled+")";
          }
        } catch (e) {
          grunt.log.error(e);
          grunt.fail.warn("Handlebars failed to compile "+file+".");
        }

        // register partial or add template to namespace
        if(isPartial.test(_.last(file.split("/")))) {
          filename = escapeQuote(processPartialName(file));
          partials.push("Handlebars.registerPartial('"+filename+"', "+compiled+");");
        } else {
          filename = escapeQuote(processName(file));
          templates.push(rootNamespace+"['"+filename+"'] = "+compiled+";");
        }
      });
      output = output.concat(partials, templates);

      if (output.length > 0) {
        output.unshift(defineNs(namespace, options.squareBrackets));
        grunt.file.write(files.dest, output.join("\n\n"));
        grunt.log.writeln("File '" + files.dest + "' created.");
      }
    });
  });

};
