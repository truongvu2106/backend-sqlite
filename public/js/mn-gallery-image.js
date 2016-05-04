if (typeof jQuery === "undefined") {
  throw new Error("mn-gallery-img\"s JavaScript requires jQuery")
}

define([
  jQuery
], function(
  ko
) {
  "use strict";

  return function() {

  }
});
$(document).ready(function() {
  $("[mn-gallery-img]").on("click", function() {
    var src = $(this).attr("src");
    var img = "<img src='" + src + "' class='img-responsive'/>";
    $("#myModal").modal();
    $("#myModal").on("shown.bs.modal", function() {
        $("#myModal .modal-body").html(img);
    });
    $("#myModal").on("hidden.bs.modal", function() {
      $("#myModal .modal-body").html("");
    });
  });
  $("#myModal").on("click", function() {

  });
});