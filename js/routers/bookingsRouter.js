/************************************************************************
 *   MarioBone - A Backbone.Marionette example application.              *
 *               Boilerplate to get started.                Amit Sharma  *
 ************************************************************************/

define(function(require) {
    /* jshint unused:false */
    var Backbone = require("backbone"),
        Marionette = require("marionette"),
        MarionetteSubRouter = require("marionette.subrouter");

    return Marionette.SubRouter.extend({
        appRoutes: {
            "bookings" : "onBookings"
        }
    });
});