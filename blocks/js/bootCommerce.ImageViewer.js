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
    });
};