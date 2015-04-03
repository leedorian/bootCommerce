/**
 * StorLocator blocks
 * @author Ivy
 */


/* global StorLocator */
bootCommerce.StorLocator = function() {
    "use strict";

    $(".findStoreBtn").on("click.StorLocator", function() {
        //ToDo
    });

    $(".cascadingPanelCollapse").each(function(i) {
        $(this).on("click.StorLocator", function() {
            var spanContainer = $(this).find("span");
            $(".collapse").collapse("hide");

            if (spanContainer.is(".fa-caret-down")) {
                spanContainer.removeClass("fa-caret-down").addClass("fa-caret-right");
                $($(this).attr("href")).collapse("toggle");
            } else {
                $($(this).attr("href")).collapse("show");
                spanContainer.removeClass("fa-caret-right").addClass("fa-caret-down");
            }
        });
    });
};
