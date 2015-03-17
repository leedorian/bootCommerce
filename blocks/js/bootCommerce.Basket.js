/**
 * basket block
 * @author Ivy
 */


/* global basket */

bootCommerce.Basket = {
    init:function(){
       new bootCommerce.quantityInput({
        container:'.basketOrderTable .basketOrderItem',
        containerInput:'.basketOrderTable .basketQuantityOperation'
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
            $(This.settings.containerInput).eq(i).attr('id', 'basketQty' + (i + 1));
        });
        $(this.settings.container).each(function (i) {
            $(This.settings.container).eq(i).attr('id', 'basketOrderItem' + (i + 1));
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
                This.spstr = parseInt($(this).parent().attr('id'));
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


