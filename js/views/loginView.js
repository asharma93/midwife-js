/************************************************************************
*   MarioBone - A Backbone.Marionette example application.              *
*               Boilerplate to get started.                Amit Sharma  *
************************************************************************/
define(function(require) {
    var Backbone = require("backbone"),
        /* jshint unused:false */
        $ = Backbone.$,
        Marionette = require("marionette"),
        template = require("hbs!templates/mariobone/login/login");

    return Backbone.Marionette.ItemView.extend({
        template : template,
        ui: {
            submit: "#submit",
            user: "#login",
            password: "#password"
        },
        events: {
            "click @ui.submit": "authenticate"
        },
        authenticate: function(event) {
            event.preventDefault();
            var url = "http://10.0.0.100:8080/api/login";
            var formValues = {
                "username": this.ui.user.val(),
                "password": this.ui.password.val()
            };
            console.log("That data: " + formValues);
            //$.ajax({
            //    url: url,
            //    type: "POST",
            //    contentType: "application/json",
            //    crossDomain: true,
            //    data: JSON.stringify(formValues),
            //    success: function(data) {
            //        console.log(["Login request details: ", data]);
            //
            //        if (data.error) {  // If there is an error, show the error messages
            //            $(".alert-error").text(data.error.text).show();
            //        }
            //    }
            //});
        }
    });
});