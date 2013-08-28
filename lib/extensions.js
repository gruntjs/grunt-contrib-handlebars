/* globals module: false */

module.exports = (function() {
  'use strict';

  // returns the file extension for a given path
  // == Examples
  //  /path/to/foo.js -> 'js'
  //  /path/to/log    -> ''
  return function (filePath) {
    var i = filePath.lastIndexOf('.');
    return (i < 0) ? '' : filePath.substr(i+1);
  }
})();