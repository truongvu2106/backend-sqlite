define([
    "knockout",
    "modules/imageModel/index",
    "modules/gallery-img-dialog/index"
], function(
    ko,
    ImageModel,
    ImgDialog
) {
    "use strict";

    return function() {
        var me = this;
        me.items = ko.observableArray([]);
        me.activate = function() {
            var items = getImgUrl();
            for (var i = 0; i < items.length; i++) {
                var item = new ImageModel({
                    index: i,
                    imgUrl: items[i].imgUrl
                });
                item.on("IMAGE:CLICK").then(onClickImg);
                me.items.push(item);
            }
        };

        function onClickImg(data) {
            var imgDialog = new ImgDialog(data.index, me.items());
            imgDialog.show();
        };

        function getImgUrl() {
            var items = [{
                imgUrl: "http://2.bp.blogspot.com/-H6MAoWN-UIE/TuRwLbHRSWI/AAAAAAAABBk/89iiEulVsyg/s400/Free%2BNature%2BPhoto.jpg"
            }, {
                imgUrl: "http://www.virginia.org/uploadedImages/virginiaorg/Images/OrgImages/H/HamptonConventionVisitorBureau/Grandview_Nature_Preserve.jpg?width=300&height=200&scale=upscalecanvas"
            }, {
                imgUrl: "http://blog.arborday.org/wp-content/uploads/2013/02/NEC1-300x200.jpg"
            }, {
                imgUrl: "http://th03.deviantart.net/fs70/200H/f/2010/256/0/9/painting_of_nature_by_dhikagraph-d2ynalq.jpg"
            }, {
                imgUrl: "http://www.virginia.org/uploadedImages/virginiaorg/Images/OrgImages/H/HamptonConventionVisitorBureau/Grandview_Nature_Preserve.jpg?width=300&height=200&scale=upscalecanvas"
            }, {
                imgUrl: "http://th03.deviantart.net/fs70/200H/f/2010/256/0/9/painting_of_nature_by_dhikagraph-d2ynalq.jpg"
            }, {
                imgUrl: "http://2.bp.blogspot.com/-H6MAoWN-UIE/TuRwLbHRSWI/AAAAAAAABBk/89iiEulVsyg/s400/Free%2BNature%2BPhoto.jpg"
            }, {
                imgUrl: "http://blog.arborday.org/wp-content/uploads/2013/02/NEC1-300x200.jpg"
            }, {
                imgUrl: "http://2.bp.blogspot.com/-H6MAoWN-UIE/TuRwLbHRSWI/AAAAAAAABBk/89iiEulVsyg/s400/Free%2BNature%2BPhoto.jpg"
            }, {
                imgUrl: "http://www.virginia.org/uploadedImages/virginiaorg/Images/OrgImages/H/HamptonConventionVisitorBureau/Grandview_Nature_Preserve.jpg?width=300&height=200&scale=upscalecanvas"
            }, {
                imgUrl: "http://blog.arborday.org/wp-content/uploads/2013/02/NEC1-300x200.jpg"
            }, {
                imgUrl: "http://th03.deviantart.net/fs70/200H/f/2010/256/0/9/painting_of_nature_by_dhikagraph-d2ynalq.jpg"
            }, {
                imgUrl: "http://www.virginia.org/uploadedImages/virginiaorg/Images/OrgImages/H/HamptonConventionVisitorBureau/Grandview_Nature_Preserve.jpg?width=300&height=200&scale=upscalecanvas"
            }, {
                imgUrl: "http://th03.deviantart.net/fs70/200H/f/2010/256/0/9/painting_of_nature_by_dhikagraph-d2ynalq.jpg"
            }, {
                imgUrl: "http://2.bp.blogspot.com/-H6MAoWN-UIE/TuRwLbHRSWI/AAAAAAAABBk/89iiEulVsyg/s400/Free%2BNature%2BPhoto.jpg"
            }, {
                imgUrl: "http://blog.arborday.org/wp-content/uploads/2013/02/NEC1-300x200.jpg"
            }];
            return items;
        }
    };
});