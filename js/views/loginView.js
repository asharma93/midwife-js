/************************************************************************
*   MarioBone - A Backbone.Marionette example application.              *
*               Boilerplate to get started.                Amit Sharma  *
************************************************************************/
define(function(require) {
    var LoginView,
        Backbone = require("backbone"),
        /* jshint unused:false */
        Marionette = require("marionette"),
        template = require("hbs!templates/mariobone/login/login");

    LoginView = Backbone.Marionette.ItemView.extend({
        template : template
    });

    return LoginView;
});