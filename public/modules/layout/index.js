define([
	"plugins/router",
	"bootstrap"
], function(
	router
) {
    "use strict";
    return function() {
        var me = this;
        me.router = router;
        me.activate = function() {
        }
    };
});