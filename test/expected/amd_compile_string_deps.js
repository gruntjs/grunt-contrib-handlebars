define(['handlebars', 'handlebars.helpers'], function(Handlebars) {

return Handlebars.default.template({
  "compiler":[5,">= 2.0.0"],
  "main":function(depth0,helpers,partials,data) {
    return "<section class=\"main-app\">\n    <h1>Some title</h1>\n    <p>I've been compiled with amd support</p>\n</section>";
  },
  "useData":true
})

});
