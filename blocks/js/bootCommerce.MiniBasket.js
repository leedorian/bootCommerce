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
    defaults.miniBasketBtn.on("click.MiniBasket",function(){
      defaults.miniBasketPopup.toggle("linear");
      //console.log(0);
    })

    $(".siteMinBasketPopup  .close").on("click.MiniBasket",function(){
      defaults.miniBasketPopup.toggle("linear");
      console.log(0);
    })
   
};
