this["JST"] = this["JST"] || {};

this["JST"]["test/fixtures/inline_partials.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "<div>"
    + "<span>Inlined</span>"
    + "</div>\n<div>"
    + "<span>Inlined</span>"
    + "</div>";
  return buffer;
  });