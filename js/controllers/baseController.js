define(function(require) {
    var Marionette = require("marionette"),
        _ = require("underscore"),
        utils = require("objects/eventUtilities");

    return Marionette.Controller.extend({
        constructor: function(options) {
            options = options || {};

            //  Set up the reference to the parent if one was passed in
            this.parent = options.parent || null;

            //  Set up the listener cache.  It holds references to the callback
            //  functions and gets cleared down when the controller is destroyed.
            //  We also go ahead and bind to any channel events that are declared
            //  on the controller.
            this._listenerCache = {};
            this.bindChannelEvents();

            //  Call the base constructor to set up the object
            Marionette.Controller.apply(this, arguments);

            //  Set up the destroy method.  We want to wrap the original and
            //  intercept it so our code can run.  This means we don't have
            //  to rely on any 'hook' methods that have a high likelyhood of
            //  being overridden by sub-objects - and its unreasonable to prohibit
            //  sub-objects from implementing something like onBeforeDestroy just
            //  so our cleanup code gets called.
            var destroy = this.destroy;
            this.destroy = _.wrap(destroy, _.bind(function(func) {
                var args = _.toArray(arguments).slice(1);
                this.unbindChannelEvents();
                func.apply(this, args);
            }, this));
        },
        bindChannelEvents: function() {
            if (this.channelEvents) {
                var self = this,
                    channelEvents = this.channelEvents,
                    events = _.keys(channelEvents);
                _.each(events, function(event) {
                    var cb = _.bind(self[channelEvents[event]], self);
                    self._listenerCache[event] = cb;
                    utils.listen(event, cb);
                });
            }
        },
        unbindChannelEvents: function() {
            if (this.channelEvents) {
                var listenerCache = this._listenerCache,
                    events = _.keys(listenerCache);
                _.each(events, function(event) {
                    utils.clearListenerFor(event, listenerCache[event]);
                });
                this._listenerCache = {};
            }
        }
    });
});
