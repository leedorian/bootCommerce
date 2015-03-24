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
        switch (e.keyCode) {
        case 37:
            if ($(this).prev().size() > 0) {
                $(this).prev().find("a").focus().tab("show");
            }
            break;
        case 39:
            if ($(this).next().size() > 0) {
                $(this).next().find("a").focus().tab("show");
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