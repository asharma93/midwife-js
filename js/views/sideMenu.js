define(function(require) {
    var Backbone = require("backbone"),
        template = require("hbs!templates/mariobone/menu/sideMenu");
    require("marionette");

    return Backbone.Marionette.ItemView.extend({
        template : template,
        ui: {
            menuList: ".side-menu ul",
            menuItem: ".side-menu-item"
        },
        events: {
            "mouseenter @ui.menuItem": "toggleDescription",
            "mouseleave @ui.menuList": "closeDescription"
        },
        toggleDescription: function() {
            this.ui.menuList.addClass("side-menu-extend");
        },
        closeDescription: function() {
            this.ui.menuList.removeClass("side-menu-extend");
        }
    });
});