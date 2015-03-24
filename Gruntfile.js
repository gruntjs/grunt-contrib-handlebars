/*
 * grunt-contrib-handlebars
 * http://gruntjs.com/
 *
 * Copyright (c) 2015 Tim Branyen, contributors
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

    jscs: {
      src: ['tasks/**/*.js', 'test/*.js', 'Gruntfile.js'],
      options: {
        config: '.jscsrc'
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
      nowrap: {
        options: {
          namespace: 'JST',
          wrapped: false
        },
        files: {
          'tmp/handlebarsnowrap.js': ['test/fixtures/_partial.hbs', 'test/fixtures/one.hbs']
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
      process_ast: {
        options: {
          processAST: function(ast) {
            ast.body.forEach(function(statement, i) {
              if (statement.type === 'PartialStatement') {
                ast.body[i] = {type: 'ContentStatement', string: 'Fooville'};
              }
            });
            return ast;
          }
        },
        files: {
          'tmp/process_ast.js': ['test/fixtures/one.hbs']
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
      },
      amd_compile_string_path: {
        options: {
          amd: 'lib/handlebars',
          namespace: false
        },
        files: {
          'tmp/amd_compile_string_path.js': ['test/fixtures/amd.html']
        }
      },
      amd_compile_string_deps: {
        options: {
          amd: 'handlebars\', \'handlebars.helpers',
          namespace: false
        },
        files: {
          'tmp/amd_compile_string_deps.js': ['test/fixtures/amd.html']
        }
      },
      amd_compile_array: {
        options: {
          amd: ['handlebars', 'handlebars.helpers'],
          namespace: false
        },
        files: {
          'tmp/amd_compile_array.js': ['test/fixtures/amd.html']
        }
      },
      amd_namespace: {
        options: {
          amd: ['handlebars', 'handlebars.helpers'],
          namespace: 'foo'
        },
        files: {
          'tmp/amd_namespace.js': ['test/fixtures/amd.html']
        }
      },
      amd_partials_use_namespace: {
        options: {
          amd: ['handlebars'],
          partialsUseNamespace: true
        },
        files: {
          'tmp/amd_partials_use_namespace.js': ['test/fixtures/_partial.hbs', 'test/fixtures/one.hbs']
        }
      },
      amd_partials_no_namespace: {
        options: {
          amd: ['handlebars'],
          partialsUseNamespace: false
        },
        files: {
          'tmp/amd_partials_no_namespace.js': ['test/fixtures/_partial.hbs', 'test/fixtures/one.hbs']
        }
      },
      amd_namespace_as_function: {
        options: {
          amd: ['handlebars', 'handlebars.helpers'],
          processName: function(filename) {
            return filename.replace(/.*\/(\w+)\.hbs/, '$1');
          },
          namespace: function(filename) {
            var names = filename.replace(/.*modules\/(.*)(\/\w+\.hbs)/, '$1');
            return 'JST.' + names.split('/').join('.');
          }
        },
        files: {
          'tmp/amd_namespace_as_function.js' : ['test/fixtures/modules/**/*.hbs']
        }
      },
      commonjs_compile: {
        options: {
          commonjs: true
        },
        files: {
          'tmp/commonjs_compile.js': ['test/fixtures/commonjs.html']
        }
      },
      commonjs_compile_direct: {
        options: {
          commonjs: true,
          namespace: false
        },
        files: {
          'tmp/commonjs_compile_direct.js': ['test/fixtures/commonjs.html']
        }
      },
      custom_separator: {
        options: {
          separator: ';;;;;'
        },
        files: {
          'tmp/custom_separator.js': ['test/fixtures/basic.hbs']
        }
      },
      processname: {
        options: {
          processName: function(filename) {
            return filename.toUpperCase();
          }
        },
        files: {
          'tmp/processname.js': ['test/fixtures/basic.hbs']
        }
      },
      process_partial_name: {
        options: {
          processPartialName: function(filepath) {
            return filepath.replace('test/fixtures/_weird_prefix_', '').replace('.hbs', '');
          }
        },
        files: {
          'tmp/process_partial_name.js': ['test/fixtures/_weird_prefix_partial.hbs', 'test/fixtures/one.hbs']
        }
      },
      partial_regex: {
        options: {
          partialRegex: /^par_/,
          processPartialName: function(filepath) {
            return filepath.replace('test/fixtures/par_', '').replace('.hbs', '');
          }
        },
        files: {
          'tmp/partial_regex.js': ['test/fixtures/par_partial.hbs', 'test/fixtures/one.hbs']
        }
      },
      partials_use_namespace: {
        options: {
          partialsUseNamespace: true
        },
        files: {
          'tmp/partials_use_namespace.js': ['test/fixtures/_partial.hbs', 'test/fixtures/one.hbs']
        }
      },
      partials_use_namespace_multiple_templates: {
        options: {
          partialsUseNamespace: true
        },
        files: {
          'tmp/partials_use_namespace_multiple_templates.js': ['test/fixtures/has-spaces.hbs',
            'test/fixtures/_partial.hbs', 'test/fixtures/one.hbs']
        }
      },
      partials_path_regex: {
        options: {
          partialRegex: /.*/,
          partialsPathRegex: /\/partials\//
        },
        files: {
          'tmp/partials_path_regex.js': ['test/fixtures/partials/partial.hbs', 'test/fixtures/one.hbs']
        }
      },
      unknown_helpers: {
        files: {
          'tmp/unknown_helpers.js': ['test/fixtures/uses_helpers.hbs']
        }
      },
      known_helpers: {
        options: {
          compilerOptions: {
            knownHelpers: {
              'my-helper': true
            }
          }
        },
        files: {
          'tmp/known_helpers.js': ['test/fixtures/uses_helpers.hbs']
        }
      },
      only_known_helpers: {
        options: {
          compilerOptions: {
            knownHelpers: {
              'my-helper': true,
              'another-helper': true
            },
            knownHelpersOnly: true
          }
        },
        files: {
          'tmp/only_known_helpers.js': ['test/fixtures/uses_helpers.hbs']
        }
      },
      namespace_as_function: {
        options: {
          processName: function(filename) {
            return filename.replace(/.*\/(\w+)\.hbs/, '$1');
          },
          namespace: function(filename) {
            var names = filename.replace(/.*modules\/(.*)(\/\w+\.hbs)/, '$1');
            return 'JST.' + names.split('/').join('.');
          }
        },
        files: {
          'tmp/namespace_as_function.js' : ['test/fixtures/modules/**/*.hbs']
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
  grunt.loadNpmTasks('grunt-jscs');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['jshint', 'jscs', 'clean', 'handlebars', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test', 'build-contrib']);

};
