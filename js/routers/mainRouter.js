define(function(require) {
    var Backbone = require("backbone");

	return Backbone.Router.extend({
        routes: {
            "": "index",
            "home": "onHome"
        },

        index: function() {
            console.log("Welcome to your / route.");
        },
        onHome: function() {
            console.log("Welcome to the home route");
        }
    });
});