/* globals module: false */
'use strict';

module.exports = {
  // predicate to check if a particular file exists.
  // emits a warning if the file does not exist
  fileExists: function(grunt, filepath) {
    if (!grunt.file.exists(filepath)) {
      grunt.log.warn('Source file "' + filepath + '" not found.');

      return false;
    } else {
      return true;
    }
  },

  // returns the file extension for a given path
  // == Examples
  //  /path/to/foo.js -> 'js'
  //  /path/to/log    -> ''
  fileExtension: function (filePath) {
    var i = filePath.lastIndexOf('.');
    return (i < 0) ? '' : filePath.substr(i+1);
  }
};