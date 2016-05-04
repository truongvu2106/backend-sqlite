define([
	"knockout"
], function(
	ko
) {
	"use strict";

	return function() {
		var me = this;
		me.items = ko.observableArray([]);
		me.activate = function() {
			for (var i = 0; i < 8; i++) {
				var item = {
					imgUrl: "http://th03.deviantart.net/fs70/200H/f/2010/256/0/9/painting_of_nature_by_dhikagraph-d2ynalq.jpg",
					title: "Thumbnail label",
					description: "This is description"
				}
				me.items.push(item);
			}
		};
	};
});