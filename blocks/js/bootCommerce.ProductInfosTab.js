/**
 * Product infos tab
 * @author Lionel
 */

/*global bootCommerce, $, console */
bootCommerce.ProductInfosTab = function () {
    "use strict";

    $(".productInfosTabTitle").on("click.ProductInfosTab", "a", function(e) {
        e.preventDefault();
    }).on("focus.ProductInfosTab", "a", function(e) {
        $(this).tab("show");
    }).on("show.bs.tab", "a", function(e) {
        $(this).closest(".productInfosTab")
            .find("dt.current")
            .removeClass("current")
            .end()
            .find($(e.target).attr("href"))
            .prev("dt")
            .addClass("current");
    }).on("keypress.ProductInfosTab", "li", function(e) {
        var $thisPrev;
        var $thisNext;

        switch (e.keyCode) {
        case 37:
            $thisPrev = $(this).prev();

            if ($thisPrev.size() > 0) {
                $thisPrev.find("a").focus().tab("show");
            }
            break;
        case 39:
            $thisNext = $(this).next();

            if ($thisNext.size() > 0) {
                $thisNext.find("a").focus().tab("show");
            }
            break;
        default:
        }
    }).find("a:first").tab("show");

    $(".productInfosTabContent").on("click.ProductInfosTab", "dt", function(e) {
        $(this).closest(".productInfosTab")
            .find(".productInfosTabTitle a[href=#" + $(this).next("dd").prop("id") + "]")
            .tab("show");
    });
};
