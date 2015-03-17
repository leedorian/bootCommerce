/**
 * Product infos tab
 * @author Lionel
 */

/*global bootCommerce, $, console */
bootCommerce.ProductInfosTab = function (options) {
    "use strict";

    var $tab = $(".productInfosTab");
    var $contents = $(".productInfosTabContent > div");

    $tab.on("click", ".productInfosTabTitle", function(e) {
        e.preventDefault();
    }).on("focus", ".productInfosTabTitle li", function(e) {
        $tab.find(".active").removeClass("active");
        $(this).addClass("active");
        $contents.removeClass("active");
        $($(this).find("a").attr("href")).addClass("active");
    }).on("keyup", ".productInfosTabTitle li", function(e) {
        switch (e.keyCode) {
            case 37:
                if ($tab.find(".active").prev().size() > 0) {
                    $tab.find(".active").removeClass("active").prev().addClass("active").focus();
                    $contents.removeClass("active");
                    $($tab.find(".active a").attr("href")).addClass("active");
                }
                break;
            case 39:
                if ($tab.find(".active").next().size() > 0) {
                    $tab.find(".active").removeClass("active").next().addClass("active").focus();
                    $contents.removeClass("active");
                    $($tab.find(".active a").attr("href")).addClass("active");
                }
                break;
            default:
        }
    });
};