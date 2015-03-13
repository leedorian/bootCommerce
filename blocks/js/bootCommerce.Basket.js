/**
 * basket block
 * @author Ivy
 */


/* global basket */

bootCommerce.Basket = {
    init:function(){
       new bootCommerce.quantityInput({
        container:'.basket_order_table .basket_order_item',
        containerInput:'.basket_order_table .basket_quantity_operation'
        }).init();
    }
};
bootCommerce.quantityInput = function(options) {
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
        this.promotionalCode="";
        this.currentIdIndex = '';
        this.spstr = '';
        this.setIdName();
        this.calculate();
        this.checkPromotionalCode();
    };
    this.setIdName = function () {
        var This = this;
        $(this.settings.containerInput).each(function (i) {
            $(This.settings.containerInput).eq(i).attr('id', 'basket_qty_' + (i + 1));
        });
        $(this.settings.container).each(function (i) {
            $(This.settings.container).eq(i).attr('id', 'basket_orderItem_' + (i + 1));
        });
    };
    this.calculate = function () {
        var This = this;
        /*reduce quantity*/
        $(this.settings.containerInput).find('button:first').on('click', function () {
            This.value = parseInt($(this).parent().find('input').val());
            if (This.value > 1) {
                This.value--;
                $(this).parent().find('input').val(This.value);
                This.spstr = $(this).parent().attr('id').split("_");
                This.changeTotalPrice();
            }
        });
        /*add quantity*/
        $(this.settings.containerInput).find('button:last').on('click', function () {
            This.value = parseInt($(this).parent().find('input').val());
            This.value++;
            $(this).parent().find('input').val(This.value);
            This.spstr = $(this).parent().attr('id').split("_");
            This.changeTotalPrice();
        });
        /*input quantity*/
        $(this.settings.containerInput).find('input').on('keyup', function () {
            This.value = $(this).val();
            var re = This.value.match(/^[1-9]+\d*$/);
            if (re || This.value == '') {
                This.spstr = $(this).parent().attr('id').split("_");
                This.changeTotalPrice();
            } else {
                alert('请输入数字');
                return false;
            }
        })
    };
    this.changeTotalPrice = function () {
        var This = this;
        this.subTotal = 0;
        this.currentIdIndex = this.spstr[this.spstr.length - 1];
        this.singlePrice = $('#basket_orderItem_' + this.currentIdIndex).find('.basket_quantity_SinglePrice span').html();
        this.totalPrice = (parseFloat(this.singlePrice)) * this.value;
        $('#basket_orderItem_' + this.currentIdIndex).find('.basket_quantity_totalPrice span').html(this.totalPrice.toFixed(2));
        /*orderSubtotal*/
        $(".basket_quantity_totalPrice").each(function (i) {
            This.subTotal += parseFloat($(".basket_quantity_totalPrice span").eq(i).html());
        });
        $(".basket_order_total .orderSubtotal span").html(this.subTotal.toFixed(2));
        this.savePrice = parseFloat($(".basket_order_total .SavePrice span").html());
        $(".basket_order_total .payPrice span").html((this.subTotal - this.savePrice));
    };
    this.checkQty = function (langId, storeId, catalogId) {
        $.ajax({
            type: "GET",
            url: "test.json",
            data: {langId: langId, storeId: storeId, catalogId: catalogId},
            dataType: "json",
            success: function (data) {
                // TODO
            },
            error: function () {
                // TODO
            }
        });
    };
    this.checkPromotionalCode=function(){
        var This=this;
        $(".promotionalCode button").on('click',function(){
            This.promotionalCode=$(".promotionalCode input").val();
            $.ajax({
                type: "GET",
                url: "test.json",
                data: {promotionalCode:This.promotionalCode},
                dataType: "json",
                success: function (data) {
                    // TODO
                },
                error: function () {
                    // TODO
                }
            });
        });

    }
};


