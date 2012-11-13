# grunt-contrib-handlebars [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-handlebars.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-handlebars)

> Precompile Handlebars templates to JST file.


## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-contrib-handlebars --save-dev
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md


## Handlebars task
_Run this task with the `grunt handlebars` command._

### Overview

In your project's Gruntfile, add a section named `handlebars` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  handlebars: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```
### Options

#### files
Type: `Object`

This defines what files this task will process and should contain key:value pairs.

The key (destination) should be an unique filepath (supports [grunt.template](https://github.com/gruntjs/grunt/blob/master/docs/api_template.md)) and the value (source) should be a filepath or an array of filepaths (supports [minimatch](https://github.com/isaacs/minimatch)).

Note: Values are precompiled to the namespaced JST array in the order passed.

#### namespace
Type: `string`
Default: 'jst'

The namespace in which the precompiled templates will be assigned.  *Use dot notation (e.g. App.Templates) for nested namespaces.*

Example:
```js
options: {
  namespace: 'MyApp.Templates'
}
```

#### wrapped
Type: `Boolean`
Default: false

Determine if preprocessed template functions will be wrapped in Handlebars.template function.

#### processName
Type: `function`

This option accepts a function which takes one argument (the template filepath) and returns a string which will be used as the key for the precompiled template object.  The example below stores all templates on the default JST namespace in capital letters.

```js
options: {
  processName: function(filename) {
    return filename.toUpperCase();
  }
}
```

#### processPartialName
Type: ```function```

This option accepts a function which takes one argument (the partial filepath) and returns a string which will be used as the key for the precompiled partial object when it is registered in Handlebars.partials. The example below stores all partials using only the actual filename instead of the full path.

```js
options: {
  processPartialName: function(filePath) { // input:  templates/_header.hbs
    var pieces = filePath.split("/");
    return pieces[pieces.length - 1];      // output: _header.hbs
  }
}
````

Note: If processPartialName is not provided as an option the default assumes that partials will be stored by stripping trailing underscore characters and filename extensions. For example, the path *templates/_header.hbs* will become *header* and can be referenced in other templates as *{{> header}}*.

#### partialRegex
Type: `Regexp`
Default: /^_/

This option accepts a regex that defines the prefix character that is used to identify Handlebars partial files.

``` javascript
// assumes partial files would be prefixed with "par_" ie: "par_header.hbs"
options: {
  partialRegex: /^par_/
}
```

### Examples

```js
handlebars: {
  compile: {
    options: {
      namespace: "JST"
    },
    files: {
      "path/to/result.js": "path/to/source.hbs",
      "path/to/another.js": ["path/to/sources/*.hbs", "path/to/more/*.hbs"]
    }
  }
}
```

## Release History

 * 2012-10-11   v0.3.2   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-10-02   v0.3.1   Bugfix default processPartialName.
 * 2012-09-22   v0.3.0   Options no longer accepted from global config key.
 * 2012-09-15   v0.2.3   Support for nested namespaces.
 * 2012-09-11   v0.2.2   Escape single quotes in filenames.
 * 2012-09-09   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Tim Branyen](http://tbranyen.com)

*This file was generated on Tue Nov 13 2012 13:49:31.*
