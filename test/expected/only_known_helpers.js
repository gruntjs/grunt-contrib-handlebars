this["JST"] = this["JST"] || {};

this["JST"]["test/fixtures/uses_helpers.hbs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "This template uses custom helpers: "
    + container.escapeExpression(lookupProperty(helpers,"my-helper").call(alias1,"variable",{"name":"my-helper","hash":{},"data":data,"loc":{"start":{"line":1,"column":35},"end":{"line":1,"column":59}}}))
    + " & "
    + ((stack1 = lookupProperty(helpers,"another-helper").call(alias1,{"name":"another-helper","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":62},"end":{"line":1,"column":100}}})) != null ? stack1 : "")
    + "!\n";
},"useData":true});