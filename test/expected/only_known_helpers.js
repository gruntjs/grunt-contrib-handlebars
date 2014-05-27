this["JST"] = this["JST"] || {};

this["JST"]["test/fixtures/uses_helpers.hbs"] = Handlebars.template({
  "1":function(depth0,helpers,partials,data) {
    return "";
  },
  "compiler":[5,">= 2.0.0"],
  "main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = "This template uses custom helpers: "
      + escapeExpression(helpers['my-helper'].call(depth0, "variable", {"name":"my-helper","hash":{},"data":data}))
      + " & ";
    stack1 = helpers['another-helper'].call(depth0, {"name":"another-helper","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    return buffer + "!\n";
  },
  "useData":true
});
