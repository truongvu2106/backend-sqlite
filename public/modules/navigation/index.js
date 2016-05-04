define([
    "knockout",
    "plugins/router"
], function(
    ko,
    router
) {
    "use strict";
    return function() {
        var me = this;
        me.router = router;
        me.isLoggedIn = ko.observable();
        me.activate = function() {
            router.map([{
                route: "",
                moduleId: "modules/home/index",
                title: "Home" 
            }, {
                route: "food",
                moduleId: "modules/food/index",
                nav: true,
                hash: "#food"
            }, {
                route: "food/:id",
                moduleId: "modules/food-detail/index"
            }, {
                route: "entertainment",
                moduleId: "modules/entertainment/index",
                nav: true
            }, {
                route: "shopping",
                moduleId: "modules/shopping/index",
                nav: true
            }, {
                route: "technology",
                moduleId: "modules/technology/index",
                nav: true
            }, {
                route: "gallery",
                moduleId: "modules/gallery/index",
                nav: true
            }]).buildNavigationModel().activate();
            router.guardRoute = function(instance, instruction) {
                var isLoggedIn = true;
                me.isLoggedIn(isLoggedIn);
                return true;
            };
        };
        me.getCurrentFragment = function() {
            return router.activeInstruction().fragment;
        };
    };
});
