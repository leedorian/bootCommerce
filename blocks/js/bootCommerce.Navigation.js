/**
 * Search box
 * @author Jack
 */

/*global bootCommerce, $, console */

bootCommerce.Search = function (options) {
    "use strict";
    /* properties */
    /*$(".mobileHeader").on("click.navigationResponsive", function() {
        console.log("123");
    });*/
    var navBarTit = $(".mobileHeader li");
    navBarTit.each(function() {
        //console.log($(this));
        $(this).click(function() {
            var str = "mobile";
            var thisClass = $(this).attr("class");
            if ($(".site" + thisClass.substr(str.length)).length !== 0 ) {
                console.log($(".site" + thisClass.substr(str.length)));
                $(".site" + thisClass.substr(str.length)).fadeIn();
                $(".site" + thisClass.substr(str.length)).addClass("mobileNavActive");
            }
        });
    });
};
