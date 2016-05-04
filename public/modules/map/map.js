define(["knockout"], function(ko) {
    "use strict";
    var Map = function() {
        var me = this;
        me.map = ko.observable();
        me.activate = function() {
            
        };
        me.attached = function() {
            me.map = L.map('map');
            me.map.setView([37.4138, -78.477058], 3);
            L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'examples.map-i875mjb7'
            }).addTo(me.map);
        };
    };
    return Map;
});