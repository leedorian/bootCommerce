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
    }).on("keyup.ProductInfosTab", "li", function(e) {
        switch (e.keyCode) {
        case 37:
            if ($(this).prev().size() > 0) {
                $(this).prev().find('a').focus().tab("show");
            }
            break;
        case 39:
            if ($(this).next().size() > 0) {
                $(this).next().find('a').focus().tab("show");
            }
            break;
        default:
        }
    }).find("a:first").tab("show");
/*
    $tab.on("click", ".productInfosTabTitle", function(e) {
        e.preventDefault();
    }).on("focus", ".productInfosTabTitle li", function(e) {
        $tab.find(".active").removeClass("active");
        $(this).addClass("active");
        $(this).closest(".productInfosTab").find("").removeClass("active");
        $($(this).find("a").attr("href")).addClass("active");
    }).on("keyup", ".productInfosTabTitle li", function(e) {
        switch (e.keyCode) {
            case 37:
                if ($(this).prev().size() > 0) {
                    $(this).removeClass("active").prev().addClass("active").focus();
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
    });*/
};