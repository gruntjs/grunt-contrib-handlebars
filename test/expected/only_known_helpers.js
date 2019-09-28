this["JST"] = this["JST"] || {};

this["JST"]["test/fixtures/uses_helpers.hbs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {});

  return "This template uses custom helpers: "
    + container.escapeExpression(helpers["my-helper"].call(alias2,"variable",{"name":"my-helper","hash":{},"data":data}))
    + " & "
    + ((stack1 = helpers["another-helper"].call(alias2,{"name":"another-helper","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "!\n";
},"useData":true});