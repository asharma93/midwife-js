/************************************************************************
*   MarioBone - A Backbone.Marionette example application.              *
*               Boilerplate to get started.                Amit Sharma  *
************************************************************************/

define(function(require) {
    var Backbone = require("backbone"),
        _ = require("underscore");

    return Backbone.Model.extend({
        urlRoot : "api/example",
        defaults: function() {
            var criticalityOffset = _.random(0, 5),
                valueOffset = _.random(0, 50);
            return {
                data: [
                    //  Fallback data for demo
                    {
                        "value":20 + valueOffset,
                        "date":1417392000,
                        "criticality":1 + criticalityOffset
                    },
                    {
                        "value":5 + valueOffset,
                        "date":1393632000,
                        "criticality":1 + criticalityOffset
                    },
                    {
                        "value":51 + valueOffset,
                        "date":1390498460,
                        "criticality":2 + criticalityOffset
                    },
                    {
                        "value":98 + valueOffset,
                        "date":1396310400,
                        "criticality":3 + criticalityOffset
                    },
                    {
                        "value":76 + valueOffset,
                        "date":1398902400,
                        "criticality":3 + criticalityOffset
                    },
                    {
                        "value":39 + valueOffset,
                        "date":1401580800,
                        "criticality":2 + criticalityOffset
                    },
                    {
                        "value":62 + valueOffset,
                        "date":1404172800,
                        "criticality":3 + criticalityOffset
                    },
                    {
                        "value":27 + valueOffset,
                        "date":1394006460,
                        "criticality":2 + criticalityOffset
                    },
                    {
                        "value":22 + valueOffset,
                        "date":1389539172,
                        "criticality":2 + criticalityOffset
                    },
                    {
                        "value":16 + valueOffset,
                        "date":1412121600,
                        "criticality":1 + criticalityOffset
                    },
                    {
                        "value":9 + valueOffset,
                        "date":1414800000,
                        "criticality":1 + criticalityOffset
                    },
                    {
                        "value":5 + valueOffset,
                        "date":1391212800,
                        "criticality":1 + criticalityOffset
                    }
                ]
            };
        }
    });
});