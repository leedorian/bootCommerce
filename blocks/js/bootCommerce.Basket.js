/**
 * basket block
 * @author Ivy
 */

/* global bootCommerce, console, basket */
bootCommerce.Basket = {
    init: function() {
        "use strict";

        new bootCommerce.Basket.orderItem({
            container: ".basketOrderTable .basketOrderItem",
            containerInput: ".basketOrderTable .basketQuantityOperation"
        });
        bootCommerce.Basket.checkPromotionalCode();
        new bootCommerce.Basket.basketOperationButton({
            saveBasketAjax: true,
            emptyBasketAjax: true,
            checkOutAjax: true
        });
    }
};
bootCommerce.Basket.orderItem = function(options) {
    "use strict";

    /* properties */
    this.defaults = {
        container: "",
        containerInput: ""
    };
    this.settings = $.extend({}, this.defaults, options);
    /*initialize*/
    this.inputValue = 0;
    this.currentIdIndex = "";
    this.setIdName();
    this.calculate();
    this.removeBasketItem(".basketProductRemove");
    this.removeBasketItem(".basketMoveWishList");
};

bootCommerce.Basket.orderItem.prototype.setIdName = function() {
    "use strict";

    var _that = this;
    $(this.settings.containerInput).each(function(i) {
        $(_that.settings.containerInput).eq(i).attr("id", "basketQty" + (i + 1));
    });

    $(this.settings.container).each(function(i) {
        $(_that.settings.container).eq(i).attr("id", "basketOrderItem" + (i + 1));
    });
};
bootCommerce.Basket.orderItem.prototype.calculate = function() {
    /*reduce quantity*/
    "use strict";

    var _that = this;
    $(this.settings.containerInput).find(".reduceBtn").on("click.calculate", function() {
        var inputContainer = $(this).parent().find("input");
        _that.inputValue = parseInt(inputContainer.val(), 10);

        if (_that.inputValue > 1) {
            _that.inputValue--;
            inputContainer.val(_that.inputValue);
        }
    });

    /*add quantity*/
    $(this.settings.containerInput).find(".addBtn").on("click.calculate", function() {
        var inputContainer = $(this).parent().find("input");
        _that.inputValue = parseInt(inputContainer.val(), 10);
        _that.inputValue++;
        inputContainer.val(_that.inputValue);
    });

    /*input quantity*/
    $(this.settings.containerInput).find("input").on("keyup.calculate", function() {
        _that.inputValue = $(this).val();
        var re = _that.inputValue.match(/^[1-9]+\d*$/);
        if (!re && _that.inputValue !== "") {
            console.log("Please key in a number");
            return false;
        }
    });
};

bootCommerce.Basket.orderItem.prototype.removeBasketItem = function(removeName) {
    "use strict";
    var _that = this;

    $(removeName).each(function(i) {
        $(this).on("click.removeBasketItem", function() {
            _that.currentIdIndex = $(this).parent().parent().attr("id").replace(/[^0-9]/ig, "");
            $("#basketOrderItem" + _that.currentIdIndex).remove();
        });
    });
};

bootCommerce.Basket.checkPromotionalCode = function() {
    "use strict";

    $(".promotionalCode button").on("click.checkPromotionalCode", function() {
        //ToDo
    });
};
bootCommerce.Basket.basketOperationButton = function(options) {
    "use strict";

    /* properties */
    this.defaults = {
       saveBasketAjax:false
    };
    this.settings = $.extend({}, this.defaults, options);
    /*initialize*/
    this.saveBasketAjax = true;
    this.emptyBasketAjax = true;
    this.checkOutAjax = true;
    this.saveBasket();
    this.EmptyBasket();
    this.checkOut();

};
bootCommerce.Basket.basketOperationButton.prototype.saveBasket = function() {
    "use strict";

    var _that = this;
    $(".basketSaveBtn").on("click.saveBasket", function() {
        /*if (_that.saveBasketAjax) {
            //ajax request
        } else {
            //form submit
        }*/

        $(".basketOrderTable tbody tr").empty();
    });
};

bootCommerce.Basket.basketOperationButton.prototype.EmptyBasket = function() {
    "use strict";

    var _that = this;
    $(".basketEmptyBtn").on("click.EmptyBasket", function() {
        /*if (_that.emptyBasketAjax) {
            //ajax request
        } else {
            //form submit
        }*/
        //window.location.href="blocks/basket_empty.html";
    });
};
bootCommerce.Basket.basketOperationButton.prototype.checkOut = function(){
    "use strict";

    var _that = this;
    $(".basketCheckOutBtn").on("click.EmptyBasket", function() {
        /*if (_that.checkOutAjax) {
            //ajax request
        } else {
            //form submit
        }*/
    });
};

