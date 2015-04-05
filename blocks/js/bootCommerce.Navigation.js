/**
 * Navigation box
 * @author Jack
 */

/*global bootCommerce, $, console */

bootCommerce.Navigation = function () {
    "use strict";

    var navBarTit = $(".mobileHeader li");

    navBarTit.click(function() {
        //alert(123);
        $("[responsive-mobile-control=true]").hide();
        //checkHeight();
        if ($(this).hasClass("mobileActive")) {
            $(this).removeClass("mobileActive");
        } else {
            $(".mobileActive").removeClass("mobileActive");
            $(this).addClass("mobileActive");
            $("." + $(this).attr("site-target")).show();
            /*if (!$(this).hasClass("mobileNavBar")) {
                //checkHeight($(this).attr("site-target"));
            }*/
        }
    });

    var checkHeight = function(className) {
        if (className) {
            $("." + className).height();
            $(".header").css("margin-bottom", $("." + className).height() + 30);
            $("." + className).css("padding", "15px");
        } else {
            $(".header").css("margin-bottom", "0");
        }
    };
};
