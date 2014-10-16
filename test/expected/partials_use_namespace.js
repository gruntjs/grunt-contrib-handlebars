this["JST"] = this["JST"] || {};

Handlebars.registerPartial("partial", this["JST"]["partial"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<span>Canada</span>";
  },"useData":true}));



this["JST"]["test/fixtures/one.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<p>Hello, my name is "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + ". I live in ";
  stack1 = this.invokePartial(partials.partial, '', 'partial', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>";
},"usePartial":true,"useData":true});
