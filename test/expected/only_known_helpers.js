this["JST"] = this["JST"] || {};

this["JST"]["test/fixtures/uses_helpers.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "This template uses custom helpers: "
    + this.escapeExpression(helpers['my-helper'].call(depth0,"variable",{"name":"my-helper","hash":{},"data":data}))
    + " & "
    + ((stack1 = helpers['another-helper'].call(depth0,{"name":"another-helper","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "!\n";
},"useData":true});