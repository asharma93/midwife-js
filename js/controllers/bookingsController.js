/************************************************************************
 *   MarioBone - A Backbone.Marionette example application.              *
 *               Boilerplate to get started.                Amit Sharma  *
 ************************************************************************/

define(function(require) {
    /* jshint unused:false */
    var BaseController = require("controllers/baseController"),
        BookingsView = require("views/bookingsItemView"),
        utils = require("objects/eventUtilities");

    function getRegion(name) {
        return utils.request("getAppRegion", name);
    }
    return BaseController.extend({
        onBookings : function() {

            this.workspaceRegion = getRegion("workspaceRegion");

            console.log("Bookings page");
            if (this.workspaceRegion.hasView()) {
                this.workspaceRegion._destroyView();
            }
            this.workspaceRegion.show(new BookingsView());
        }
    });
});