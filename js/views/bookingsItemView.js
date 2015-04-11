/************************************************************************
 *   MarioBone - A Backbone.Marionette example application.              *
 *               Boilerplate to get started.                Amit Sharma  *
 ************************************************************************/
define(function(require) {
    var Backbone = require("backbone"),
    /* jshint unused:false */
        $ = Backbone.$,
        Marionette = require("marionette"),
        template = require("hbs!templates/mariobone/bookings/bookingsCalendar");

    return Backbone.Marionette.ItemView.extend({
        template : template,
        ui: {
            submit: "#submit",
            user: "#login",
            password: "#password"
        },
        events: {
            "click @ui.submit": "authenticate"
        },
        authenticate: function(event) {
        }
    });
});