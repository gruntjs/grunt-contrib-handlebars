this["JST"] = this["JST"] || {};

this["JST"]["test/fixtures/uses_helper.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "This template uses a custom helper: ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['my-helper']),stack1 ? stack1.call(depth0, "variable", options) : helperMissing.call(depth0, "my-helper", "variable", options)))
    + "!\n";
  return buffer;
  });