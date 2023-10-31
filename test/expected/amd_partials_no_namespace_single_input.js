define(['handlebars'], function(Handlebars) {

var compiledPartial = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	return "<span>Canada</span>";
},"useData":true});
Handlebars.registerPartial("partial", compiledPartial);
return compiledPartial;

});