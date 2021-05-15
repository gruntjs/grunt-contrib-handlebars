# grunt-contrib-handlebars v2.0.0 [![Build Status](https://github.com/gruntjs/grunt-contrib-handlebars/workflows/Tests/badge.svg)](https://github.com/gruntjs/grunt-contrib-handlebars/actions?workflow=Tests)

> Precompile Handlebars templates to JST file.



## Getting Started

If you haven't used [Grunt](https://gruntjs.com/) before, be sure to check out the [Getting Started](https://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](https://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-handlebars --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-handlebars');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](https://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.3](https://github.com/gruntjs/grunt-contrib-handlebars/tree/grunt-0.3-stable).*



## Handlebars task
_Run this task with the `grunt handlebars` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](https://gruntjs.com/configuring-tasks) guide.
### Options

#### separator
Type: `String`  
Default: `linefeed + linefeed`

Concatenated files will be joined on this string.

#### namespace
Type: `String` or `false` or `function`  
Default: `'JST'`

The namespace in which the precompiled templates will be assigned. *Use dot notation (e.g. App.Templates) for nested namespaces or false for no namespace wrapping.* When false with `amd` or `commonjs` option set `true`, templates will be returned directly from the AMD/CommonJS wrapper.

Example:
```js
options: {
  namespace: 'MyApp.Templates'
}
```

You can generate nested namespaces based on the file system paths of your templates by providing a function. The function will be called with one argument (the template filepath). *The function must return a dot notation based on the filepath*.

Example:
```js
options: {
  namespace: function(filename) {
    var names = filename.replace(/modules\/(.*)(\/\w+\.hbs)/, '$1');
    return names.split('/').join('.');
  },
},
files: {
  'ns_nested_tmpls.js' : [ 'modules/**/*.hbs']
}
```

#### partialsUseNamespace
Type: `Boolean`  
Default: `false`

When set to `true`, partials will be registered in the `namespace` in addition to templates.

#### wrapped
Type: `Boolean`  
Default: `true`

Determine if preprocessed template functions will be wrapped in Handlebars.template function.

#### node
Type: `Boolean`  
Default: `false`

Enable the compiled file to be required on node.js by preppending and appending proper declarations. You can use the file safely on the front-end.

For this option to work you need to define the `namespace` option.

#### amd
Type: `Boolean` or `String` or `Array` or `Function`  
Default: `false`

Wraps the output file with an AMD define function and returns the compiled template namespace unless namespace has been explicitly set to false in which case the template function will be returned directly.

If `String` then that string will be used in the module definition `define(['your_amd_opt_here'])`

If `Array` then those strings will be used in the module definition. `'handlebars'` should always be the first item in the array, eg: `amd: ['handlebars', 'handlebars.helpers']`

If `Function` then it will be called per each module and returned string will be used in the module definition `"define(['" + options.amd(filename, ast, compiled) + "']"`

```js
define(['handlebars'], function(Handlebars) {
    //...//
    return this['[template namespace]'];
});
```

#### commonjs
Type: `Boolean`  
Default: `false`

Wraps the output file in a CommonJS module function, exporting the compiled templates. It will also add templates to the template namespace, unless `namespace` is explicitly set to `false`.

```js
module.exports = function(Handlebars) {
    //...//
    Handlebars.template(…);
    return this['[template namespace]'];
};
```

When requiring the module in a CommonJS environment, pass in your `Handlebars` object.

```js
var Handlebars = require('handlebars');
var templates = require('./templates')(Handlebars);
```

#### processContent
Type: `Function`

This option accepts a function which takes two arguments (the template file content, and the filepath) and returns a string which will be used as the source for the precompiled template object. The example below removes leading and trailing spaces to shorten templates.

```js
options: {
  processContent: function(content, filepath) {
    content = content.replace(/^[\x20\t]+/mg, '').replace(/[\x20\t]+$/mg, '');
    content = content.replace(/^[\r\n]+/, '').replace(/[\r\n]*$/, '\n');
    return content;
  }
}
```

#### processAST
Type: `Function`

This option accepts a function which takes one argument (the parsed Abstract Syntax Tree) and returns a modified version which will be used as the source for the precompiled template object. The example below removes any partial and replaces it with the text `foo`.

```js
options: {
  processAST: function(ast) {
    ast.statements.forEach(function(statement, i) {
      if (statement.type === 'partial') {
        ast.statements[i] = { type: 'content', string: 'foo' };
      }
    });
    return ast;
  }
}
```

#### processName
Type: `Function`

This option accepts a function which takes one argument (the template filepath) and returns a string which will be used as the key for the precompiled template object. The example below stores all templates on the default JST namespace in capital letters.

```js
options: {
  processName: function(filePath) {
    return filePath.toUpperCase();
  }
}
```

#### processPartialName
Type: `Function`

This option accepts a function which takes one argument (the partial filepath) and returns a string which will be used as the key for the precompiled partial object when it is registered in Handlebars.partials. The example below stores all partials using only the actual filename instead of the full path.

```js
options: {
  processPartialName: function(filePath) {  // input: templates/_header.hbs
    var pieces = filePath.split('/');
    return pieces[pieces.length - 1];       // output: _header.hbs
  }
}
````

Note: If processPartialName is not provided as an option the default assumes that partials will be stored by stripping trailing underscore characters and filename extensions. For example, the path *templates/_header.hbs* will become *header* and can be referenced in other templates as *{{> header}}*.

#### partialRegex
Type: `Regexp`  
Default: `/^_/`

This option accepts a regex that defines the prefix character that is used to identify Handlebars partial files.

```js
// assumes partial files would be prefixed with "par_" ie: "par_header.hbs"
options: {
  partialRegex: /^par_/
}
```

#### partialsPathRegex
Type: `Regexp`  
Default: `/./`

This option accepts a regex that defines the path to a directory of Handlebars partials files. The example below shows how to mark every file in a specific directory as a partial.

```js
options: {
  partialRegex: /.*/,
  partialsPathRegex: /\/partials\//
}
```

#### compilerOptions
Type `Object`  
Default: `{}`

This option allows you to specify a hash of options which will be passed directly to the Handlebars compiler.

```js
options: {
  compilerOptions: {
    knownHelpers: {
      'my-helper': true,
      'another-helper': true
    },
    knownHelpersOnly: true
  }
}
```

### Usage Examples

```js
handlebars: {
  compile: {
    options: {
      namespace: 'JST'
    },
    files: {
      'path/to/result.js': 'path/to/source.hbs',
      'path/to/another.js': ['path/to/sources/*.hbs', 'path/to/more/*.hbs']
    }
  }
}
```


## Release History

 * 2021-05-14   v3.0.0   Docs, CI and dependency updates. Requires node 12+.
 * 2019-09-30   v2.0.0   Docs, CI and dependency updates.
 * 2016-03-04   v1.0.0   Update docs and examples. Remove peerDeps and other fixes.
 * 2015-10-16   v0.11.0   Update to Handlebars 4.0.0.
 * 2015-04-21   v0.10.2   Added `options.amd` as a function.
 * 2015-03-23   v0.10.1   Documentation fix.
 * 2015-03-23   v0.10.0   Update to Handlebars 3.0.0.
 * 2015-02-04   v0.9.3   Fix issues with namespace declarations and `partialsUseNamespace`.
 * 2014-12-31   v0.9.2   More fixes for AMD namespacing.
 * 2014-11-09   v0.9.1   Fixes namespacing issues.
 * 2014-10-16   v0.9.0   Update to Handlebars 2.0.
 * 2014-04-15   v0.8.0   Less verbose output. New custom AMD path options.
 * 2014-03-03   v0.7.0   Update handlebars dep to ~1.3.0.
 * 2014-01-23   v0.6.1   Support function on `namespace` option.
 * 2013-11-11   v0.6.0   Update handlebars dep to ~1.1.2.
 * 2013-11-07   v0.5.12   Pass file path into `processContent`.
 * 2013-09-24   v0.5.11   Fix for broken partial pre-compilation.
 * 2013-07-14   v0.5.10   Add `commonjs` option.
 * 2013-05-30   v0.5.9   Allow passing `compilerOptions` to Handlebars compiler.
 * 2013-03-14   v0.5.8   Update handlebars dep to ~1.0.10.
 * 2013-03-11   v0.5.7   Fix regression with `wrapped` option.
 * 2013-03-07   v0.5.6   Add new `processAST` option.
 * 2013-02-27   v0.5.5   Add new `partialsUseNamespace`, `partialRegex`, `partialsPathRegex` options.
 * 2013-02-15   v0.5.4   First official release for Grunt 0.4.0.
 * 2013-02-08   v0.5.4rc7   When `namespace` is false and `amd` is true, return handlebars templates directly from AMD wrapper.
 * 2013-02-01   v0.5.3rc7   Add `node` option to produce dual Node.js / front-end compiled file.
 * 2013-01-29   v0.5.2rc7   Define handlebars as a dependency for AMD option.
 * 2013-01-28   v0.5.1rc7   Add AMD compilation option. Add `processContent` option. Do not generate templates into a namespaces when namespace option is false.
 * 2013-01-23   v0.5.0rc7   Updating grunt/gruntplugin dependencies to rc7. Changing in-development grunt/gruntplugin dependency versions from tilde version ranges to specific versions. Default `wrapped` option to `true`.
 * 2013-01-09   v0.4.0rc5   Updating to work with grunt v0.4.0rc5. Switching to `this.files` API.
 * 2012-11-21   v0.3.3   Reset for each target
 * 2012-10-12   v0.3.2   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-10-03   v0.3.1   Bugfix default `processPartialName`.
 * 2012-09-23   v0.3.0   Options no longer accepted from global config key.
 * 2012-09-16   v0.2.3   Support for nested namespaces.
 * 2012-09-12   v0.2.2   Escape single quotes in filenames.
 * 2012-09-10   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Tim Branyen](http://tbranyen.com)

*This file was generated on Fri May 14 2021 21:50:46.*
