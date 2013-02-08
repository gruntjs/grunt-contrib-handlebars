/*
 * grunt-contrib-handlebars
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tim Branyen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    handlebars: {
      compile: {
        options: {
          namespace: 'JST'
        },
        files: {
          'tmp/handlebars.js': ['test/fixtures/_partial.hbs', 'test/fixtures/one.hbs']
        }
      },
      compileNode: {
        options: {
          namespace: 'JST',
          node: true
        },
        files: {
          'tmp/handlebars-node.js': ['test/fixtures/_partial.hbs', 'test/fixtures/one.hbs']
        }
      },
      wrapcompile: {
        options: {
          namespace: 'JST',
          wrapped: true
        },
        files: {
          'tmp/handlebarswrap.js': ['test/fixtures/_partial.hbs', 'test/fixtures/one.hbs']
        }
      },
      uglyfile: {
        files: {
          'tmp/uglyfile.js': ['test/fixtures/*bad-filename*']
        }
      },
      ns_nested: {
        options: {
          namespace: 'MyApp.JST.Main'
        },
        files: {
          'tmp/ns_nested.js': ['test/fixtures/basic.hbs']
        }
      },
      ns_nested_this: {
        options: {
          namespace: 'this.MyApp.JST.Main'
        },
        files: {
          'tmp/ns_nested_this.js': ['test/fixtures/basic.hbs']
        }
      },
      no_namespace: {
        options: {
          namespace: false
        },
        files: {
          'tmp/no_namespace.js': ['test/fixtures/basic.hbs']
        }
      },
      processcontent: {
        options: {
          processContent: function(content) {
            content = content.replace(/^[\x20\t]+/mg, '').replace(/[\x20\t]+$/mg, '');
            content = content.replace(/^[\r\n]+/, '').replace(/[\r\n]+$/, '');
            return content;
          }
        },
        files: {
          'tmp/processcontent.js': ['test/fixtures/has-spaces.hbs']
        }
      },
      amd_compile: {
        options: {
          amd: true
        },
        files: {
          'tmp/amd_compile.js': ['test/fixtures/amd.html']
        }
      },
      amd_compile_direct: {
        options: {
          amd: true,
          namespace: false
        },
        files: {
          'tmp/amd_compile_direct.js': ['test/fixtures/amd.html']
        }
      }
    },
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'handlebars', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);

};
