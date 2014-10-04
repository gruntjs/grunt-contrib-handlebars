this["JST"] = this["JST"] || {};

this["JST"]["test/fixtures/uses_helpers.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", blockHelperMissing=helpers.blockHelperMissing, buffer = "This template uses custom helpers: "
    + escapeExpression(((helpers['my-helper'] || (depth0 && depth0['my-helper']) || helperMissing).call(depth0, "variable", {"name":"my-helper","hash":{},"data":data})))
    + " & ";
  stack1 = ((helper = (helper = helpers['another-helper'] || (depth0 != null ? depth0['another-helper'] : depth0)) != null ? helper : helperMissing),(options={"name":"another-helper","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers['another-helper']) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "!\n";
},"useData":true});
