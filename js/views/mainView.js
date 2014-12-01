/************************************************************************
*   MarioBone - A Backbone.Marionette example application.              *
*               Boilerplate to get started.                Amit Sharma  *
************************************************************************/
define(function(require) {
    var MainView,
        Backbone = require("backbone"),
        /* jshint unused:false */
        Marionette = require("marionette"),
        template = require("hbs!templates/mariobone/layout/mainView");

    MainView = Backbone.Marionette.ItemView.extend({
        template : template
    });

    return MainView;
});