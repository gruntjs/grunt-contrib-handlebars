module.exports = function(Handlebars) {

templates["test/fixtures/commonjs.html"] = return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};



  return "<section class=\"main-app\">\n    <h1>Some title</h1>\n    <p>I've been compiled with CommonJS support</p>\n</section>\n";
  });

};
