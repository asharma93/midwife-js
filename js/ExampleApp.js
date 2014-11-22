// /***************************************************************************
//  * COPYRIGHT (C) 2014, Rapid7 LLC, Boston, MA, USA.
//  * All rights reserved. This material contains unpublished, copyrighted
//  * work including confidential and proprietary information of Rapid7.
//  **************************************************************************/

// define(function(require) {
//     var $ = require("jquery"),
//         layoutTemplate = require("hbs!templates/veyron/layout/mainContent"),
//         _ = require("underscore"),
//         Backbone = require("backbone"),
//         Marionette = require("marionette"),
//         i18n = require("i18n"),
//         Locales = require("locales/veyronResources"),
//         VeyronRouter = require("routers/veyronRouter"),
//         WorkspaceController = require("controllers/workspaceController"),
//         KpiController = require("controllers/kpiController"),
//         ViewManagerController = require("controllers/viewManagerController"),
//         OnDashboardController = require("controllers/onDashboardController"),
//         _applicationState = "uninitialized",
//         VeyronApp = new Marionette.Application();

//     //  Set up request handlers that should be available before the
//     //  app has started
//     VeyronApp.reqres.setHandler("getAppState", _.bind(function() {
//             return _applicationState;
//         }, VeyronApp));

//     function setChannels(app, channels) {
//         var oldChannel = app.channel;

//         //  Set the new channel
//         _.extend(app, channels.app);
//         app.channel = channels.app;

//         //  Copy over any stuff that was on the old channel
//         var oldHandlers = oldChannel.reqres._wreqrHandlers;
//         _.each(_.keys(oldHandlers), function(handler) {
//             app.channel.reqres.setHandler(handler, oldChannel.reqres.getHandler(handler));
//         });
//     }
//     function setRequestHandlers(app) {
//         app.channel.reqres.setHandler("getAppRegions", _.bind(function() {
//             return this.getRegions();
//         }, app));
//         app.channel.reqres.setHandler("getAppRegion", _.bind(function(region) {
//             return this[region]||null;
//         }, app));
//         app.channel.reqres.setHandler("getAppRegionNames", _.bind(function() {
//             return this.regionsNames||[];
//         }, app));
//         app.channel.reqres.setHandler("getAppId", _.bind(function() {
//             return this.appId||null;
//         }, app));
//     }

//     //---
//     //  App initializers go here
//     //
//     VeyronApp.addInitializer(function() {
//         i18n.addResourceBundle("en", "translation", Locales);

//         _applicationState = "initialized";

//         //  Set up the various controllers the app will use
//         this.controllers = this.controllers||{};
//         this.controllers.workspaceController = new WorkspaceController({parent: this});
//         this.controllers.viewManagerController = new ViewManagerController({parent: this});
//         this.controllers.onDashboardController = new OnDashboardController({parent: this});
//         this.controllers.kpiController = new KpiController({parent: this});
//     });
//     //
//     //  End of Initializer section
//     //---

//     //---
//     //  React to start/stop events
//     //

//     //  To make the layout work we need to set the height of the main panel.  This
//     //  approach uses the technique of wach for size changes then forcing the element
//     //  the the new calculated height.
//     //
//     //  A pure CSS solution would be _much_ better and once we have a clean cross
//     //  browser approach we well replace the code below.
//     var footerHeight = $("footer").innerHeight();
//     function setMainPanelHeight() {
//         var $mainPanel = $("#app-container").find(".main-panel"),
//             mainPanelEl = $mainPanel[0],
//             mainPanelOffsetTop = mainPanelEl.offsetTop,
//             viewPortHeight = $(window).height(),
//             panelHeight = viewPortHeight - mainPanelOffsetTop - footerHeight,
//             minPanelHeight = 600;

//         $mainPanel.height(panelHeight > minPanelHeight ? panelHeight : minPanelHeight);
//     }

//     VeyronApp.on("start", function(options) {
//         options = options||{};

//         this.el = options.el||"#app-container";

//         //  Set up the channels
//         this.channels = {
//                 global: Backbone.Wreqr.radio.channel("global"),
//                 app: options.channel||this.channel
//             };
//         setChannels(this, this.channels);
//         setRequestHandlers(this);

//         $(this.el).html(layoutTemplate());
//         this.addRegions({
//             leftPanelRegion : "#left-panel",
//             workspaceRegion : "#workspace-panel",
//             rightPanelRegion : "#right-panel"
//         });
//         this.regionsNames = _.keys(this.getRegions());

//         this.workspaceRegion.on("before:swap", function(view) {
//             view.$el.addClass("swapping");
//         });
//         this.workspaceRegion.on("swap", function(view) {
//             view.$el.removeClass("swapping");
//             view.$el.removeClass("showing");
//         });
//         this.workspaceRegion.on("before:show", function(view) {
//             view.$el.addClass("activated");
//         });
//         this.workspaceRegion.on("show", function(view) {
//             _.defer(function() {
//                 view.$el.addClass("showing");
//                 view.$el.removeClass("activated");
//             });
//         });

//         setMainPanelHeight();
//         $(window).on("resize", setMainPanelHeight);

//         this.Router = this.Router || new VeyronRouter(options.routePrefix);
//         this.Router.navigate(options.route || "home", {trigger: true});

//         _applicationState = "started";
//         Backbone.Wreqr.radio.channel("active").vent.trigger("application:started", this);
//     });

//     VeyronApp.on("stop", function(options) {
//         options = options||{};

//         $(window).off("resize", setMainPanelHeight);

//         _applicationState = "stopped";
//         this.channels.app.vent.trigger("application:stopped", this);
//     });
//     //
//     //  End of start/stop events
//     //---
    
//     return VeyronApp;
// });
