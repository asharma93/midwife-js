/************************************************************************
*   MarioBone - A Backbone.Marionette example application.              *
*               Boilerplate to get started.                Amit Sharma  *
************************************************************************/

define(function(require) {
    var BaseController = require("controllers/baseController"),
        utils = require("objects/eventUtilities"),
        LoginView = require("views/loginView");

    function getRegion(name) {
        return utils.request("getAppRegion", name);
    }
    return BaseController.extend({
        initialize: function() {
            // Setup channel event listeners
        },
        onHome : function() {
            this.workspaceRegion = getRegion("workspaceRegion");
        },
        onLogin : function() {
            //Login logic goes here
            this.workspaceRegion = getRegion("workspaceRegion");
            // Show the main layout (wrap this in renderDefault?)
            this.workspaceRegion.show(new LoginView());
        }
    });
});
           
        