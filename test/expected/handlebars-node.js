var Handlebars = Handlebars || require('Handlebars');

this["JST"] = this["JST"] || {};

Handlebars.registerPartial("partial", function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<span>Canada</span>";});

this["JST"]["test/fixtures/one.hbs"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "<p>Hello, my name is ";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + ". I live in ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.partial, 'partial', stack1, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>";
  return buffer;};

if (typeof exports === 'object' && exports) {module.exports = this["JST"];}