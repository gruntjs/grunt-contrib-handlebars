module.exports = function(Handlebars) {

var templates = {};

templates["test/fixtures/commonjs.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<section class=\"main-app\">\n    <h1>Some title</h1>\n    <p>I've been compiled with CommonJS support</p>\n</section>\n";
  },"useData":true});

return templates;

};
