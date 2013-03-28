'use strict';

var vm = require('vm');
var path = require('path');
var grunt = require('grunt');
var Handlebars = require('handlebars');

// Helper for testing result of template
function testhbs(filename, fn) {
  var script = vm.createScript(grunt.file.read(path.join('tmp', filename)));
  fn(script.runInNewContext({
    Handlebars: Handlebars,
    global: {Handlebars: Handlebars},
  }, path.basename(filename)));
}

// Helper for getting files without whitespace
function filesAreEqual(actual, expected, fn) {
  if (typeof expected === 'function') {
    fn = expected;
    expected = actual;
  }
  fn(
    String(grunt.file.read(path.join('tmp', actual))).replace(/\s/g, ''),
    String(grunt.file.read(path.join('test', 'expected', expected))).replace(/\s/g, '')
  );
}

exports.handlebars = {
  compile: function(test) {
    test.expect(1);

    testhbs('handlebars.js', function(tpl) {
      var actual = tpl({name: 'Dude'});
      var expected = '<p>Hello, my name is Dude. I live in <span>Canada</span></p>';
      test.equal(actual, expected, 'should compile partials into Handlebars.partials and handlebars template into JST');
      test.done();
    });
  },
  compileNode: function(test) {
    test.expect(1);

    testhbs('handlebars-node.js', function(tpl) {
      var actual = tpl({name: 'Dude'});
      var expected = '<p>Hello, my name is Dude. I live in <span>Canada</span></p>';
      test.equal(actual, expected, 'should compile as per compile test and also have node directives prepended and appended');
      test.done();
    });
  },
  nowrap: function(test) {
    test.expect(1);

    filesAreEqual('handlebarsnowrap.js', function(actual, expected) {
      test.equal(actual, expected, 'should compile partials into Handlebars.partials and handlebars template into JST');
      test.done();
    });
  },
  uglyfile: function(test) {
    test.expect(1);

    testhbs('uglyfile.js', function(tpl) {
      var actual = tpl({name: 'Dude'});
      var expected = 'Why would you name your file like this?';
      test.equal(actual, expected, 'should escape single quotes in filenames');
      test.done();
    });
  },
  ns_nested: function(test) {
    test.expect(1);

    testhbs('ns_nested.js', function(tpl) {
      var actual = tpl({name: 'Dude'});
      var expected = 'Basic template that does nothing.';
      test.equal(actual, expected, 'should define parts of nested namespaces');
      test.done();
    });
  },
  ns_nested_this: function(test) {
    test.expect(1);

    filesAreEqual('ns_nested_this.js', 'ns_nested.js', function(actual, expected) {
      test.equal(actual, expected, 'should define parts of nested namespaces, ignoring this.');
      test.done();
    });
  },
  no_namespace:function(test) {
    test.expect(1);

    filesAreEqual('no_namespace.js', function(actual, expected) {
      test.equal(actual, expected, 'should skip the creation of a namespace array around the generated template file');
      test.done();
    });
  },
  processcontent: function(test) {
    test.expect(1);

    testhbs('processcontent.js', function(tpl) {
      var actual = tpl({name: 'Dude'});
      var expected = '<div>\n<span>this template has many spaces</span>\n</div>';
      test.equal(actual, expected, 'should remove leading and trailing spaces');
      test.done();
    });
  },
  process_ast: function(test) {
    test.expect(1);

    testhbs('process_ast.js', function(tpl) {
      var actual = tpl({name: 'Dude'});
      var expected = '<p>Hello, my name is Dude. I live in Fooville</p>';
      test.equal(actual, expected, 'should allow the AST to be modified before compilation');
      test.done();
    });
  },
  amd_compile: function(test) {
    test.expect(1);

    filesAreEqual('amd_compile.js', function(actual, expected) {
      test.equal(actual, expected, 'should wrap everything with an AMD define block.');
      test.done();
    });
  },
  amd_compile_direct: function(test) {
    test.expect(1);

    filesAreEqual('amd_compile_direct.js', function(actual, expected) {
      test.equal(actual, expected, 'should wrap everything with an AMD define block and directly return the template.');
      test.done();
    });
  },
  commonjs_compile: function(test) {
    test.expect(1);

    filesAreEqual('commonjs_compile.js', function(actual, expected) {
      test.equal(actual, expected, 'should wrap everything with a CommonJS module.');
      test.done();
    });
  },
  commonjs_compile_direct: function(test) {
    test.expect(1);

    filesAreEqual('commonjs_compile_direct.js', function(actual, expected) {
      test.equal(actual, expected, 'should wrap everything with a CommonJS and directly return the template.');
      test.done();
    });
  },
  custom_separator: function(test) {
    test.expect(1);

    filesAreEqual('custom_separator.js', function(actual, expected) {
      test.equal(actual, expected, 'should use custom file separators as specified.');
      test.done();
    });
  },
  processname: function(test) {
    test.expect(1);

    filesAreEqual('processname.js', function(actual, expected) {
      test.equal(actual, expected, 'should convert template name to upper case.');
      test.done();
    });
  },
  process_partial_name: function(test) {
    test.expect(1);

    testhbs('process_partial_name.js', function(tpl) {
      var actual = tpl({name: 'Dude'});
      var expected = '<p>Hello, my name is Dude. I live in <span>Canada</span></p>';
      test.equal(actual, expected, 'should support custom handling of partial naming conventions.');
      test.done();
    });
  },
  partial_regex: function(test) {
    test.expect(1);

    testhbs('partial_regex.js', function(tpl) {
      var actual = tpl({name: 'Dude'});
      var expected = '<p>Hello, my name is Dude. I live in <span>Canada</span></p>';
      test.equal(actual, expected, 'should support custom file name identifiers for partials.');
      test.done();
    });
  },
  partials_use_namespace: function(test) {
    test.expect(1);

    filesAreEqual('partials_use_namespace.js', function(actual, expected) {
      test.equal(actual, expected, 'should allow partials to be added to template namespace.');
      test.done();
    });
  },
  partials_path: function(test) {
    test.expect(1);

    filesAreEqual('partials_path_regex.js', function(actual, expected) {
      test.equal(actual, expected, 'should support custom path to partials.');
      test.done();
    });
  },
  unknown_helpers: function(test) {
    test.expect(1);

    filesAreEqual('unknown_helpers.js', function(actual, expected) {
      test.equal(actual, expected, 'should wrap unknown helpers by default.');
      test.done();
    });
  },
  known_helpers: function(test) {
    test.expect(1);

    filesAreEqual('known_helpers.js', function(actual, expected) {
      test.equal(actual, expected, 'should support specifying known helpers.');
      test.done();
    });
  },
  only_known_helpers: function(test) {
    test.expect(1);

    filesAreEqual('only_known_helpers.js', function(actual, expected) {
      test.equal(actual, expected, 'should support `knownHelpersOnly`.');
      test.done();
    });
  }
};
