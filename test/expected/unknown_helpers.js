this["JST"] = this["JST"] || {};

this["JST"]["test/fixtures/uses_helpers.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {

  var buffer = "";
  return buffer;
  }

  buffer += "This template uses custom helpers: ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['my-helper'] || depth0['my-helper']),stack1 ? stack1.call(depth0, "variable", options) : helperMissing.call(depth0, "my-helper", "variable", options)))
    + " & ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack2 = helpers['another-helper']) { stack2 = stack2.call(depth0, options); }
  else { stack2 = depth0['another-helper']; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if (!helpers['another-helper']) { stack2 = blockHelperMissing.call(depth0, stack2, options); }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "!\n";
  return buffer;
  });
