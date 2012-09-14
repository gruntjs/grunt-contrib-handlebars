# grunt-contrib-handlebars
> Precompile Handlebars templates to JST file (part of the [grunt-contrib](https://github.com/gruntjs/grunt-contrib) collection).  Submitted by [Tim Branyen](/tbranyen).

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-contrib-handlebars`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-contrib-handlebars');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

### Overview

Inside your `grunt.js` file, add a section named `handlebars`. This section specifies the files to compile and the options used with [handlebars](http://handlebarsjs.com/).

##### files ```object```

This defines what files this task will process and should contain key:value pairs.

The key (destination) should be an unique filepath (supports [grunt.template](https://github.com/cowboy/grunt/blob/master/docs/api_template.md)) and the value (source) should be a filepath or an array of filepaths (supports [minimatch](https://github.com/isaacs/minimatch)).

Note: Values are precompiled to the namespaced JST array in the order passed.

##### options ```object```

This controls how this task operates and should contain key:value pairs, see options below.

#### Options

##### namespace ```string```

The namespace, in dot notation, in which the resulting JST templates are assigned to. The example below assigns templates to the `MyApp.Templates` namespace:

Example:
``` javascript
options: {
  namespace: 'MyApp.Templates'
}
```

##### wrapped ```boolean```

Determine if preprocessed template functions will be wrapped in Handlebars.template function (default is false).

##### processName ```function```

This option accepts a function which takes one argument (the template filepath) and returns a string which will be used as the key for the precompiled template object.  The example below stores all templates on the default JST namespace in capital letters.

``` javascript
options: {
  processName: function(filename) {
    return filename.toUpperCase();
  }
}
```

##### processPartialName ```function```

This option accepts a function which takes one argument (the partial filepath) and returns a string which will be used as the key for the precompiled partial object when it is registered in Handlebars.partials. The example below stores all partials using only the actual filename instead of the full path.

``` javascript
options: {
  processPartialName: function(filePath) { // input:  templates/_header.hbs
    var pieces = filePath.split("/");
    return pieces[pieces.length - 1];      // output: _header.hbs
  }
}
````

Note: If processPartialName is not provided as an option the default assumes that partials will be stored by stripping trailing underscore characters and filename extensions. For example, the path *templates/_header.hbs* will become *header* and can be referenced in other templates as *{{> header}}*.

##### partialRegex ```regex```

This option accepts a regex that defines the prefix character that is used to identify Handlebars partial files. (The default is _).

``` javascript
options: {
  partialRegex: /^par_/ // assumes partial files would be prefixed with "par_" ie: "par_header.hbs"
}
```

#### Config Example

``` javascript
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

* 2012/08/12 - v0.2.2 - Escape single quotes in filenames.
* 2012/08/10 - v0.2.0 - Refactored from grunt-contrib into individual repo.