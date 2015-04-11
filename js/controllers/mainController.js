/************************************************************************
*   MarioBone - A Backbone.Marionette example application.              *
*               Boilerplate to get started.                Amit Sharma  *
************************************************************************/

define(function(require) {
    var Marionette = require("marionette"),
        utils = require("objects/eventUtilities"),
        LoginView = require("views/loginView"),
        MainLayout = require("layouts/mainLayout");

    function getRegion(name) {
        return utils.request("getAppRegion", name);
    }
    return Marionette.Controller.extend({
        onLogin : function() {
            //Login logic goes re
            this.mainContentRegion = getRegion("mainContentRegion");
            // Show the main layout (wrap this in renderDefault?)
            var mainLayout = new MainLayout();
            this.mainContentRegion.show(mainLayout);

            mainLayout.workspaceRegion.show(new LoginView());
        },
        onHome : function() {

        }
    });
});
           
        