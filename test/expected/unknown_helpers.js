this["JST"] = this["JST"] || {};

this["JST"]["test/fixtures/uses_helpers.hbs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "";
},"compiler":[7,">=4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, buffer = 
  "This template uses custom helpers: "
    + container.escapeExpression((helpers["my-helper"] || (depth0 && depth0["my-helper"]) || alias1).call(depth0,"variable",{"name":"my-helper","hash":{},"data":data}))
    + " & ";
  stack1 = ((helper = (helper = helpers["another-helper"] || (depth0 != null ? depth0["another-helper"] : depth0)) != null ? helper : alias1),(options={"name":"another-helper","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers["another-helper"]) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "!\n";
},"useData":true});
