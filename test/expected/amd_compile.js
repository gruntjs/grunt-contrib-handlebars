define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["test/fixtures/amd.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<section class=\"main-app\">\n    <h1>Some title</h1>\n    <p>I've been compiled with amd support</p>\n</section>";
  });

return this["JST"];

});