/***************************************************************************
 * COPYRIGHT (C) 2014, Rapid7 LLC, Boston, MA, USA.
 * All rights reserved. This material contains unpublished, copyrighted
 * work including confidential and proprietary information of Rapid7.
 **************************************************************************/

define(function(require) {
    var Marionette = require("marionette"),
        utils = require("objects/eventUtilities"),
        MainView = require("views/mainView");
    
    return Marionette.Controller.extend({

        onHome : function() {
            var workspaceRegion = utils.request("getAppRegion", "workspaceRegion");
            workspaceRegion.show(new MainView());
        },
    });
});
           
        