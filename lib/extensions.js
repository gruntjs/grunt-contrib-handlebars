/* globals module: false */

module.exports = (function() {
  'use strict';
  return function (filePath) {
    var i = filePath.lastIndexOf('.');
    return (i < 0) ? '' : filePath.substr(i+1);
  }
})();