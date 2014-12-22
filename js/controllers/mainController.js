/************************************************************************
*   MarioBone - A Backbone.Marionette example application.              *
*               Boilerplate to get started.                Amit Sharma  *
************************************************************************/

define(function(require) {
    var Marionette = require("marionette"),
        utils = require("objects/eventUtilities"),
        MainView = require("views/mainView");

    function getRegion(name) {
        return utils.request("getAppRegion", name);
    }
    
    return Marionette.Controller.extend({
        onLogin : function() {
            
        },
        
        onHome : function() {
            var mainContentRegion = getRegion("mainContentRegion");
            //var userRegion = getRegion("mainContentRegion");
            mainContentRegion.show(new MainView());
        },
    });
});
           
        