/************************************************************************
*   MarioBone - A Backbone.Marionette example application.              *
*               Boilerplate to get started.                Amit Sharma  *
************************************************************************/

define(function(require) {
    var Backbone = require("backbone"),
        $ = Backbone.$;

    return Backbone.Model.extend({
        urlRoot : "http://10.0.0.100:8080/api/login",
        fetch: function(options) {
            options = options || {};
            var req = options.data;

            //  We default to POST unless the caller explicitly sets type
            //  to GET.  We also add the filters is there are any.
            var fetchOptions = $.extend(true,
                {type: "POST"},
                {contentType: "application/json"},
                {crossDomain: true},
                {data: JSON.stringify(req)},
                options);

            return Backbone.Model.prototype.fetch.call(this, fetchOptions);
        }
    });
});