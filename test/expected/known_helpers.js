this["JST"] = this["JST"] || {};

this["JST"]["test/fixtures/uses_helper.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "This template uses a custom helper: "
    + escapeExpression(helpers['my-helper'].call(depth0, "variable", {hash:{},data:data}))
    + "!\n";
  return buffer;
  });