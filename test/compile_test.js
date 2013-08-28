'use strict';

var path = require('path');
var grunt = require('grunt');

exports.compile = {
  truethy: function(test) {
    test.expect(1);
    test.equal(true, true);
    test.done();
  }
};