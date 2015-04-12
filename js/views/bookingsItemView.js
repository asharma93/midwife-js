/************************************************************************
 *   MarioBone - A Backbone.Marionette example application.              *
 *               Boilerplate to get started.                Amit Sharma  *
 ************************************************************************/
define(function(require) {
    var Backbone = require("backbone"),
    /* jshint unused:false */
        $ = require("jquery"),
        Marionette = require("marionette"),
        _ = require("underscore"),
        moment = require("moment"),
        template = require("hbs!templates/mariobone/bookings/bookingsCalendar");
    require("bootstrap");
    require("fullcalendar");

    return Backbone.Marionette.ItemView.extend({
        template : template,
        tagName: "div",
        className: "bookings-container",
        ui: {
            calendar: "#booking-calendar",
            submit: ".booking-submit"
        },
        events: {
            "click @ui.submit": "updateEvents"
        },
        initialize: function() {
        },
        onBeforeRender: function() {
            // ajax call to get data
            var url = "http://10.0.0.100:8080/api/midwife";
            this.data = $.ajax({
                url: url,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "username": "user1"
                }),
                crossDomain: true,
                success: function(data) {
                    console.log(["Midwife details: ", data]);

                    if (data.error) {  // If there is an error, show the error messages
                        $(".alert-error").text(data.error.text).show();
                    }
                }
            });
            console.log(this.data);
        },
        onRender: function() {
            this.ui.calendar.fullCalendar({
                height: 400,
                header: {
                    left:   "month, basicWeek",
                    center: "title",
                    right:  "today prev,next"
                },
                selectable: true,
                weekends: false,
                aspectRatio: 1.1,
                events: this.populateCalendar(),
                eventRender: function(event, element) {
                    element.click(function() {
                        var modal = $("#basicModal");
                        modal.find(".modal-title").text(event.title);
                        modal.find(".modal-mother").text("Name:" + event.title);
                        modal.find(".modal-address").text("Name:" + event.title);
                        modal.find(".modal-post-code").text("Name:" + event.title);
                        modal.find(".modal-contact").text("Name:" + event.title);
                        $("#basicModal").modal("toggle");
                    });
                }
            });
        },
        dayClicked: function(date) {
            this.data = date;
        },
        populateCalendar: function() {
            return [
                    {
                        title: "Jane Doe",
                        start: "2015-04-07",
                        editable: true
                    },
                    {
                        title: "Mary Jane",
                        start: "2015-04-08"
                    },
                    {
                        title: "Mary Jane",
                        start: "2015-04-08"
                    },
                    {
                        title: "Lindsay Lohan",
                        start: "2015-04-16"
                    }
                    // etc...
                ];
        },
        updateEvents: function() {
            // updateEvents on form submission
        }
    });
});