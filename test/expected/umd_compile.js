(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['handlebars'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('handlebars'));
  } else {
    factory(Handlebars);
  }
}(function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["test/fixtures/umd.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<section class=\"main-app\">\n    <h1>Some title</h1>\n    <p>I've been compiled with UMD support</p>\n</section>\n";
  },"useData":true});

return this["JST"];

}));
