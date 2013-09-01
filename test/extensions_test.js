'use strict';

var getExtension = require('../lib/extensions').fileExtension;

exports.compile = {
  extracts_correct_extension: function(test) {
    test.expect(1);
    test.equal(getExtension('foo.js'), 'js');
    test.done();
  },
  empty_if_not_present: function(test) {
    test.expect(1);
    test.equal(getExtension('foo'), '');
    test.done();
  }
};