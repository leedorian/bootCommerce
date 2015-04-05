/**
 * Mini basket box
 * @author Jack
 */

/*global bootCommerce, $, console */
bootCommerce.MiniBasket = function () {
    "use strict";
    /* properties */
    var defaults = {
        miniBasketBtn : $(".siteMinBasketBox"),
        miniBasketPopup : $(".siteMinBasketPopup")
    };

   //show mini basket box
    defaults.miniBasketBtn.on("click.MiniBasket", function() {
        defaults.miniBasketPopup.toggle("linear");
        //console.log(0);
    });

    $(".siteMinBasketPopup .close").on("click.MiniBasket", function() {

        if ($(".mobileHeader").css("display") === "block") {
            //defaults.miniBasketPopup.hide();
            $(".siteMinBasket").hide();
            $(".mobileMinBasket").removeClass("mobileActive");
            $(".siteMinBasketPopup").css("display", "block");
        } else {
            defaults.miniBasketPopup.hide();
        }
        //console.log(0);
    });
};
