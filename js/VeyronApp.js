/***************************************************************************
 * COPYRIGHT (C) 2014, Rapid7 LLC, Boston, MA, USA.
 * All rights reserved. This material contains unpublished, copyrighted
 * work including confidential and proprietary information of Rapid7.
 **************************************************************************/

define(function(require) {
    var $ = require("jquery"),
        layoutTemplate = require("hbs!templates/mariobone/layout/mainContent"),
        _ = require("underscore"),
        Backbone = require("backbone"),
        Marionette = require("marionette"),
        MainRouter = require("routers/mainRouter"),
        VeyronApp = new Marionette.Application();

    //---
    //  React to start/stop events
    //

    //  To make the layout work we need to set the height of the main panel.  This
    //  approach uses the technique of wach for size changes then forcing the element
    //  the the new calculated height.
    //
    //  A pure CSS solution would be _much_ better and once we have a clean cross
    //  browser approach we well replace the code below.
    var footerHeight = $("footer").innerHeight();
    function setMainPanelHeight() {
        var $mainPanel = $("#main").find(".app-container"),
            mainPanelEl = $mainPanel[0],
            mainPanelOffsetTop = mainPanelEl.offsetTop,
            viewPortHeight = $(window).height(),
            panelHeight = viewPortHeight - mainPanelOffsetTop - footerHeight,
            minPanelHeight = 600;

        $mainPanel.height(panelHeight > minPanelHeight ? panelHeight : minPanelHeight);
    }

    VeyronApp.on("start", function(options) {
        options = options||{};

        this.el = options.el||".app-container";

        $(this.el).html(layoutTemplate());
        this.addRegions({
            leftPanelRegion : "#left-panel",
            workspaceRegion : "#workspace-panel",
            rightPanelRegion : "#right-panel"
        });
        this.regionsNames = _.keys(this.getRegions());

        setMainPanelHeight();
        $(window).on("resize", setMainPanelHeight);

        this.Router = this.Router || new MainRouter();
        this.Router.navigate("home", {trigger: true});
        Backbone.Wreqr.radio.channel("active").vent.trigger("application:started", this);
    });
    
    return VeyronApp;
});
