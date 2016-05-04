define([
    "jquery",
    "knockout",
    "plugins/dialog"
], function(
    $,
    ko,
    dialog
) {
    "use strict";

    var ImgDialog = function(index, images) {
        var me = this;
        
        var currentIndex = index;
        me.imgUrl = ko.observable(images[currentIndex].imgUrl);
        var imagesList = images;
        me.active = function() {};

        me.show = function() {
            return dialog.show(me);
        };

        me.nextImage = function() {
            console.log("next image");
            currentIndex += 1;
            if (currentIndex >= imagesList.length) {
                currentIndex = 0;
            }
            me.imgUrl(imagesList[currentIndex].imgUrl);
        }

        me.prevImage = function() {
            console.log("prev image");
            currentIndex -= 1;
            if (currentIndex < 0) {
                currentIndex = imagesList.length - 1;
            }
            me.imgUrl(imagesList[currentIndex].imgUrl);
        }

        me.close = function() {
            console.log("close image dialog");
            return dialog.close(me);
        };

    };

    return ImgDialog;
});