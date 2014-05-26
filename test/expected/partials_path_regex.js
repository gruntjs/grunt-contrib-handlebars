this["JST"] = this["JST"] || {};

Handlebars.registerPartial("partial", Handlebars.template({
  "compiler":[5,">= 2.0.0"],
  "main":function(depth0,helpers,partials,data) {
    return "<span>Canada</span>";
  },
  "useData":true
}));

this["JST"]["test/fixtures/one.hbs"] = Handlebars.template({
  "compiler":[5,">= 2.0.0"],
  "main":function(depth0,helpers,partials,data) {
    var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<p>Hello, my name is "
      + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
      + ". I live in ";
    stack1 = this.invokePartial(partials.partial, 'partial', depth0, undefined, helpers, partials, data);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    return buffer + "</p>";
  },
  "usePartial":true,
  "useData":true
});
