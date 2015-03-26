/**
 * basket block
 * @author Ivy
 */


/* global basket */

bootCommerce.Basket =function() {
       new bootCommerce.Basket.quantityInput({
        container:'.basketOrderTable .basketOrderItem',
        containerInput:'.basketOrderTable .basketQuantityOperation'
        }).init();
        bootCommerce.Basket.checkPromotionalCode();
    new bootCommerce.Basket.basketOperationButton({
        saveBasketAjax:true,
        emptyBasketAjax:true,
        checkOutAjax:true
    }).init();

};
bootCommerce.Basket.quantityInput = function(options) {
    "use strict";
    /* properties */
    this.defaults = {
        container: "",
        containerInput: ""
    };
    this.settings = $.extend({}, this.defaults, options);
    /*initialize*/
    this.init = function () {
        this.value = 0;
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
    var This = this;
    this.setIdName = function () {
        $(this.settings.containerInput).each(function (i) {
            $(This.settings.containerInput).eq(i).attr('id', 'basketQty' + (i + 1));
        });
        $(this.settings.container).each(function (i) {
            $(This.settings.container).eq(i).attr('id', 'basketOrderItem' + (i + 1));
        });
    };
    this.calculate = function () {
        /*reduce quantity*/
        $(this.settings.containerInput).find('button:first').on('click', function () {
            This.value = parseInt($(this).parent().find('input').val());
            if (This.value > 1) {
                This.value--;
                $(this).parent().find('input').val(This.value);
                This.currentIdIndex =$(this).parent().attr('id').replace(/[^0-9]/ig,"");
                This.changeTotalPrice();
            }
        });
        /*add quantity*/
        $(this.settings.containerInput).find('button:last').on('click', function () {
            This.value = parseInt($(this).parent().find('input').val());
            This.value++;
            $(this).parent().find('input').val(This.value);
            This.currentIdIndex =$(this).parent().attr('id').replace(/[^0-9]/ig,"");
            This.changeTotalPrice();
        });
        /*input quantity*/
        $(this.settings.containerInput).find('input').on('keyup', function () {
            This.value = $(this).val();
            var re = This.value.match(/^[1-9]+\d*$/);
            if (re || This.value == '') {
                This.currentIdIndex =$(this).parent().attr('id').replace(/[^0-9]/ig,"");                This.changeTotalPrice();
            } else {
                alert('请输入数字');
                return false;
            }
        })
    };
    this.changeTotalPrice = function () {

        this.subTotal = 0;
        this.singlePrice = $('#basketOrderItem' + this.currentIdIndex).find('.basketQuantitySinglePrice span').html();
        this.totalPrice = (parseFloat(this.singlePrice)) * this.value;
        $('#basketOrderItem' + this.currentIdIndex).find('.basketQuantityTotalPrice span').html(this.totalPrice.toFixed(2));
        /*orderSubtotal*/
        $(".basketQuantityTotalPrice").each(function (i) {
            This.subTotal += parseFloat($(".basketQuantityTotalPrice span").eq(i).html());
        });
        $(".basketOrderTotal .orderSubtotal span").html(this.subTotal.toFixed(2));
        this.savePrice = parseFloat($(".basketOrderTotal .SavePrice span").html());
        $(".basketOrderTotal .payPrice span").html((this.subTotal - this.savePrice).toFixed(2));
    };

    this.removeBasketItem=function(removeName){
        $(removeName).each(function(i){
            $(this).on('click',function(){
                This.currentIdIndex=$(this).parent().parent().attr('id').replace(/[^0-9]/ig,"");
                $("#basketOrderItem"+This.currentIdIndex).remove();
                This.changeTotalPrice();
            })
        })
    }

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
    var This = this;
    this.init = function () {
        this.saveBasketAjax=true;
        this.emptyBasketAjax=true;
        this.checkOutAjax=true;
        this.saveBasket();
        this.EmptyBasket();
        this.checkOut();
    };
    this.saveBasket=function(){
        $(".basketOrderBtn .basketSaveBtn").on('click',function(){
            if(This.saveBasketAjax){
                //ajax request
            }else{
                //form submit
            }
        })
    };
    this.EmptyBasket=function(){
        $(".basketOrderBtn .basketEmptyBtn").on('click',function(){
            if(This.emptyBasketAjax){
                //ajax request

            }else{
                //form submit
            }
        })
    };
    this.checkOut=function(){
        $(".basketOrderBtn .basketEmptyBtn").on('click',function(){
            if(This.checkOutAjax){
                //ajax request
            }else{

            }
        })
    }
};


