module.exports = function(Handlebars) {

var templates = {};

templates["test/fixtures/commonjs.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<section class=\"main-app\">\n    <h1>Some title</h1>\n    <p>I've been compiled with CommonJS support</p>\n</section>\n";
  });

return templates;

};