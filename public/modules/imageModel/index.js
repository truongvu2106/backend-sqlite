define([
    "durandal/events",
    "knockout"
], function(
    events,
    ko
) {
    "use strict";
    var TAG = "IMAGE";
    var EVENTS = {
        CLICK: TAG + ":CLICK"
    };

    return function(object) {
        var me = this;
         events.includeIn(me);

        // Using durandal to add events into image.
        // events.includeIn(me);
        me.imgUrl = object.imgUrl;
        me.index = object.index;
        me.activate =  function() {
        };

        /**
         * Handler when user click on image
         */
        me.onClick = function() {
            console.log("onClick img");
            me.trigger(EVENTS.CLICK, {index: me.index});
        };
    };
});