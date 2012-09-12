/*
 * grunt-contrib-handlebars
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tim Branyen, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-contrib-handlebars/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'tasks/*.js', '<config:nodeunit.tasks>']
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    handlebars: {
      compile: {
        options: {
          namespace: "JST"
        },
        files: {
          "tmp/handlebars.js": ["test/fixtures/_partial.hbs", "test/fixtures/one.hbs"]
        }
      },
      wrapcompile: {
        options: {
          namespace: "JST",
          wrapped: true
        },
        files: {
          "tmp/handlebarswrap.js": ["test/fixtures/*.hbs"]
        }
      },
      uglyfile: {
        files: {
          "tmp/uglyfile.js": ["test/fixtures/*bad*"]
        }
      },
      namespace_this: {
        options: {
          namespace: "this.JST"
        },
        files: {
          "tmp/namespace_this.js": ["test/fixtures/ns-test.hbs"]
        }
      },
      namespace_globalvar: {
        options: {
          namespace: "data-templates"
        },
        files: {
          "tmp/namespace_globalvar.js": ["test/fixtures/ns-test.hbs"]
        }
      },
      namespace_nested: {
        options: {
          namespace: "GUI.JST.MainTemplates"
        },
        files: {
          "tmp/namespace_nested.js": ["test/fixtures/ns-test.hbs"]
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tasks: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // The clean plugin helps in testing.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.renameTask('test', 'nodeunit');
  grunt.registerTask('test', 'clean handlebars nodeunit');

  // By default, lint and run all tests.
  grunt.registerTask('default', 'lint test');
};