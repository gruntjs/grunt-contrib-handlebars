var grunt = require('grunt');

exports['handlebars'] = {
  main: function(test) {
    'use strict';

    test.expect(2);

    var expect, result;

    expect = "this['JST'] = this['JST'] || {};\n\nHandlebars.registerPartial('partial', function (Handlebars,depth0,helpers,partials,data) {\n  helpers = helpers || Handlebars.helpers;\n  \n\n\n  return \"<span>Canada</span>\";});\n\nthis['JST']['test/fixtures/one.hbs'] = function (Handlebars,depth0,helpers,partials,data) {\n  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;\n  var buffer = \"\", stack1, foundHelper, functionType=\"function\", escapeExpression=this.escapeExpression, self=this;\n\n\n  buffer += \"<p>Hello, my name is \";\n  foundHelper = helpers.name;\n  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }\n  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }\n  buffer += escapeExpression(stack1) + \". I live in \";\n  stack1 = depth0;\n  stack1 = self.invokePartial(partials.partial, 'partial', stack1, helpers, partials);;\n  if(stack1 || stack1 === 0) { buffer += stack1; }\n  buffer += \"</p>\";\n  return buffer;};";
    result = grunt.file.read("tmp/handlebars.js");
    test.equal(expect, result, "should compile partials into Handlebars.partials and handlebars template into JST");

    expect = "this['JST'] = this['JST'] || {};\n\nHandlebars.registerPartial('partial', Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {\n  helpers = helpers || Handlebars.helpers;\n  \n\n\n  return \"<span>Canada</span>\";}));\n\nthis['JST']['test/fixtures/one.hbs'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {\n  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;\n  var buffer = \"\", stack1, foundHelper, functionType=\"function\", escapeExpression=this.escapeExpression, self=this;\n\n\n  buffer += \"<p>Hello, my name is \";\n  foundHelper = helpers.name;\n  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }\n  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }\n  buffer += escapeExpression(stack1) + \". I live in \";\n  stack1 = depth0;\n  stack1 = self.invokePartial(partials.partial, 'partial', stack1, helpers, partials);;\n  if(stack1 || stack1 === 0) { buffer += stack1; }\n  buffer += \"</p>\";\n  return buffer;});";
    result = grunt.file.read("tmp/handlebarswrap.js");
    test.equal(expect, result, "should compile partials into Handlebars.partials and handlebars template into JST");


    test.done();
  }
};