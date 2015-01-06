define(['handlebars', 'handlebars.helpers'], function(Handlebars) {

this["JST"] = this["JST"] || {};
this["JST"]["foo"] = this["JST"]["foo"] || {};
this["JST"]["foo"]["templates"] = this["JST"]["foo"]["templates"] || {};

this["JST"]["foo"]["templates"]["test/fixtures/amd.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<section class=\"main-app\">\n    <h1>Some title</h1>\n    <p>I've been compiled with amd support</p>\n</section>";
  },"useData":true});

return this["JST"]["foo"]["templates"];

});
