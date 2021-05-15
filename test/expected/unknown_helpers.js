this["JST"] = this["JST"] || {};

this["JST"]["test/fixtures/uses_helpers.hbs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = 
  "This template uses custom helpers: "
    + container.escapeExpression((lookupProperty(helpers,"my-helper")||(depth0 && lookupProperty(depth0,"my-helper"))||alias2).call(alias1,"variable",{"name":"my-helper","hash":{},"data":data,"loc":{"start":{"line":1,"column":35},"end":{"line":1,"column":59}}}))
    + " & ";
  stack1 = ((helper = (helper = lookupProperty(helpers,"another-helper") || (depth0 != null ? lookupProperty(depth0,"another-helper") : depth0)) != null ? helper : alias2),(options={"name":"another-helper","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":62},"end":{"line":1,"column":100}}}),(typeof helper === "function" ? helper.call(alias1,options) : helper));
  if (!lookupProperty(helpers,"another-helper")) { stack1 = container.hooks.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "!\n";
},"useData":true});