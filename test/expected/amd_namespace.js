define(['handlebars', 'handlebars.helpers'], function(Handlebars) {

this["foo"] = this["foo"] || {};

this["foo"]["test/fixtures/amd.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<section class=\"main-app\">\n    <h1>Some title</h1>\n    <p>I've been compiled with amd support</p>\n</section>";
  },"useData":true});

return this["foo"];

});
