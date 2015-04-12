/************************************************************************
 *   MarioBone - A Backbone.Marionette example application.              *
 *               Boilerplate to get started.                Amit Sharma  *
 ************************************************************************/
define(function(require) {
    var Backbone = require("backbone"),
        _ = require("underscore"),
    /* jshint unused:false */
        Marionette = require("marionette"),
        template = require("hbs!templates/mariobone/layout/mainContent");

    return Backbone.Marionette.LayoutView.extend({
        className: "workspace-container",
        tagName: "div",
        template : template,

        initialize : function() {
            this.addRegions({
                bookingsRegion : ".bookings-region",
                loginRegion: ".login-region"
            });
        }
    });
});