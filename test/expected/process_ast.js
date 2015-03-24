this["JST"] = this["JST"] || {};

this["JST"]["test/fixtures/one.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<p>Hello, my name is "
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + ". I live in "
    + ((stack1 = this.invokePartial(partials.partial,depth0,{"name":"partial","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</p>";
},"usePartial":true,"useData":true});