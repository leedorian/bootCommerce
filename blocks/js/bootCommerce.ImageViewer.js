/**
 * Image Viewer
 * @author Lionel
 */

/*global bootCommerce, $, console */
bootCommerce.ImageViewer = function(conf) {
    "use strict";

    $(".imageViewer").on("click.ImageViewer", ".imageViewerThumb img", function(e) {
        e.preventDefault();

        $(this).closest(".imageViewer")
            .find(".imageViewerBooth img")
            .attr("src", ($(this).data("img-booth")));
    }).on("mousemove.ImageViewer", ".imageViewerBooth", function(e) {
        var boothOffset = $(this).offset();
        var lensOffset = {};
        var $imageViewerLens = $(this).find(".imageViewerLens");
        var $imageViewerOverlayImg = $(this).find(".imageViewerOverlay img");
        var boothWidth = $(this).width();
        var boothHeight = $(this).height();
        var lensWidth = $imageViewerLens.width();
        var lensHeight = $imageViewerLens.height();

        if (e.pageX - boothOffset.left <= lensWidth / 2) {
            lensOffset.left = 0;
        } else if (e.pageX - boothOffset.left + lensWidth / 2 >= boothWidth) {
            lensOffset.left = boothWidth - lensWidth;
        } else {
            lensOffset.left = e.pageX - boothOffset.left - lensWidth / 2;
        }

        if (e.pageY - boothOffset.top <= lensHeight / 2) {
            lensOffset.top = 0;
        } else if (e.pageY - boothOffset.top + lensHeight / 2 >= boothHeight) {
            lensOffset.top = boothHeight - lensHeight;
        } else {
            lensOffset.top = e.pageY - boothOffset.top - lensHeight / 2;
        }
        $imageViewerLens.css(lensOffset);
        $imageViewerOverlayImg.css({marginTop: - lensOffset.top * 2, marginLeft: - lensOffset.left * 2});
    }).on("mouseenter.ImageViewer", ".imageViewerBooth", function(e) {
        $(this).find(".imageViewerOverlay").show();
    }).on("mouseleave.ImageViewer", ".imageViewerBooth", function(e) {
        $(this).find(".imageViewerOverlay").hide();
    });
};