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
        className: "main-layout-panel",
        tagName: "ul",
        template : template,

        initialize : function() {
            this.addRegions({
                mainPanelRegion : "#nav-panel",
                workspaceRegion : "#workspace-panel",
                appSwitcherPanelRegion : "#left-panel"
            });
        }
    });
});