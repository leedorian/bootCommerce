/**
 * basket block
 * @author Ivy
 */


/* global basket */

bootCommerce.Basket =function() {
    new bootCommerce.Basket.orderItem({
        container:'.basketOrderTable .basketOrderItem',
        containerInput:'.basketOrderTable .basketQuantityOperation'
        });
    bootCommerce.Basket.checkPromotionalCode();
    new bootCommerce.Basket.basketOperationButton({
        saveBasketAjax:true,
        emptyBasketAjax:true,
        checkOutAjax:true
    })
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
    this.singlePrice = 0;
    this.totalPrice = 0;
    this.subTotal = 0;
    this.savePrice = 0;
    this.currentIdIndex = '';
    this.setIdName();
    this.calculate();
    this.removeBasketItem('.basketProductRemove');
    this.removeBasketItem('.basketMoveWishList');
};
bootCommerce.Basket.orderItem.prototype.setIdName=function(){
    "use strict";
    var _that=this;
    $(this.settings.containerInput).each(function (i) {
        $(_that.settings.containerInput).eq(i).attr('id', 'basketQty' + (i + 1));
    });
    $(this.settings.container).each(function (i) {
        $(_that.settings.container).eq(i).attr('id', 'basketOrderItem' + (i + 1));
    });
};
bootCommerce.Basket.orderItem.prototype.calculate = function () {
    /*reduce quantity*/
    "use strict";
    var _that=this;
    $(this.settings.containerInput).find('button:first').on('click', function () {
        _that.inputValue = parseInt($(this).parent().find('input').val());
        if (_that.inputValue > 1) {
            _that.inputValue--;
            $(this).parent().find('input').val(_that.inputValue);
            _that.currentIdIndex =$(this).parent().attr('id').replace(/[^0-9]/ig,"");
            _that.changeTotalPrice();
        }
    });
    /*add quantity*/
    $(this.settings.containerInput).find('button:last').on('click', function () {
        _that.inputValue = parseInt($(this).parent().find('input').val());
        _that.inputValue++;
        $(this).parent().find('input').val(_that.inputValue);
        _that.currentIdIndex =$(this).parent().attr('id').replace(/[^0-9]/ig,"");
        _that.changeTotalPrice();
    });
    /*input quantity*/
    $(this.settings.containerInput).find('input').on('keyup', function () {
        _that.inputValue = $(this).val();
        var re = _that.inputValue.match(/^[1-9]+\d*$/);
        if (re || _that.inputValue == '') {
            _that.currentIdIndex =$(this).parent().attr('id').replace(/[^0-9]/ig,"");                _that.changeTotalPrice();
        } else {
            alert('请输入数字');
            return false;
        }
    })
};
bootCommerce.Basket.orderItem.prototype.changeTotalPrice = function () {
    "use strict";
    var _that=this;
    this.subTotal = 0;
    this.singlePrice = $('#basketOrderItem' + this.currentIdIndex).find('.basketQuantitySinglePrice span').html();
    this.totalPrice = (parseFloat(this.singlePrice)) * this.inputValue;
    $('#basketOrderItem' + this.currentIdIndex).find('.basketQuantityTotalPrice span').html(this.totalPrice.toFixed(2));
    /*orderSubtotal*/
    $(".basketQuantityTotalPrice").each(function (i) {
        _that.subTotal += parseFloat($(".basketQuantityTotalPrice span").eq(i).html());
    });
    $(".basketOrderTotal .orderSubtotal span").html(this.subTotal.toFixed(2));
    this.savePrice = parseFloat($(".basketOrderTotal .SavePrice span").html());
    $(".basketOrderTotal .payPrice span").html((this.subTotal - this.savePrice).toFixed(2));
};
bootCommerce.Basket.orderItem.prototype.removeBasketItem=function(removeName){
    "use strict";
    var _that=this;
    $(removeName).each(function(i){
        $(this).on('click',function(){
            _that.currentIdIndex=$(this).parent().parent().attr('id').replace(/[^0-9]/ig,"");
            $("#basketOrderItem"+_that.currentIdIndex).remove();
            _that.changeTotalPrice();
        })
    })
};


bootCommerce.Basket.checkPromotionalCode = function(){
        "use strict";
        $(".promotionalCode button").on('click',function(){
            //ToDo
        });
};
bootCommerce.Basket.basketOperationButton=function(options){
    "use strict";
    /* properties */
    this.defaults = {
       saveBasketAjax:false
    };
    this.settings = $.extend({}, this.defaults, options);
    /*initialize*/
    this.saveBasketAjax=true;
    this.emptyBasketAjax=true;
    this.checkOutAjax=true;
    this.saveBasket();
    this.EmptyBasket();
    this.checkOut();

};
bootCommerce.Basket.basketOperationButton.prototype.saveBasket=function(){
    "use strict";
    var _that=this;
    $(".basketSaveBtn").on('click',function(){
        if(_that.saveBasketAjax){
            //ajax request
        }else{
            //form submit
        }
        $(".basketOrderTable tbody tr").empty();
    })
};

bootCommerce.Basket.basketOperationButton.prototype.EmptyBasket=function(){
    "use strict";
    var _that=this;
    $(".basketEmptyBtn").on('click',function(){
        if(_that.emptyBasketAjax){
            //ajax request
        }else{
            //form submit
        }
        //window.location.href="blocks/basket_empty.html";
    })
};
bootCommerce.Basket.basketOperationButton.prototype.checkOut=function(){
    "use strict";
    var _that=this;
    $(".basketCheckOutBtn").on('click',function(){
        if(_that.checkOutAjax){
            //ajax request
        }else{
            //form submit
        }
    })
};

