this["JST"] = this["JST"] || {};

this["JST"]["test/fixtures/uses_helpers.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, escapeExpression=this.escapeExpression, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  buffer += "This template uses custom helpers: "
    + escapeExpression(helpers['my-helper'].call(depth0, "variable", {hash:{},data:data}))
    + " & ";
  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers['another-helper']) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0['another-helper']); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers['another-helper']) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "!\n";
  return buffer;
  });