/************************************************************************
 *   MarioBone - A Backbone.Marionette example application.              *
 *               Boilerplate to get started.                Amit Sharma  *
 ************************************************************************/

define(function(require) {
    /* jshint unused:false */
    var BaseController = require("controllers/baseController"),
        utils = require("objects/eventUtilities");

    function getRegion(name) {
        return utils.request("getAppRegion", name);
    }
    return BaseController.extend({
        initialize: function() {
            this.mainContentRegion = getRegion("mainContentRegion");
        },
        onBookings : function() {
            console.log("Bookings page");
        }
    });
});