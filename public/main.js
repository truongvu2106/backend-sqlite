requirejs.config({
    // baseUrl: "",
    paths: {
        "text": "libs/require/text",
        "durandal": "libs/durandal/js",
        "plugins": "libs/durandal/js/plugins",
        "transitions": "libs/durandal/js/transitions",
        "knockout": "libs/knockout/knockout-3.1.0",
        "jquery": "libs/jquery/jquery-1.11.2",
        "underscore": "libs/underscore/underscore",
        "leaflet": "libs/leaflet/leaflet",
        "bootstrap": "libs/bootstrap/js/bootstrap.min",
        "common": "js/common"
    }
});
define(function(require) {
    var system = require("durandal/system"),
        app = require("durandal/app");
    system.debug(true);
    app.title = "Vu Truong";
    app.configurePlugins({
        router: true,
        dialog: true
    });
    app.start().then(function() {
        app.setRoot("modules/layout/index");
    });
});