/**
 * basket block
 * @author Ivy
 */


/* global basket */

bootCommerce.Basket = {
    init:function(){
         new bootCommerce.quantityInput().default(".basket_order_item");
    }
};

bootCommerce.quantityInput = function(){
    this.default = function(parentName){
        this.parentName=parentName;
        this.value=0;
        this.singlePrice=0;
        this.totalPrice=0;
        this.currentIdIndex='';
        this.spstr='';
        this.setIdName();
        this.calculate();

    };
    this.setIdName=function(){
        var This=this;
        $(this.parentName).find('.basket_quantity_operation').each(function(i){
            $(This.parentName).find('.basket_quantity_operation').eq(i).attr('id','basket_qty_'+(i+1));
        });
        $(this.parentName).each(function(i){
            $(This.parentName).eq(i).attr('id','basket_orderItem_'+(i+1));
        });
    };
    this.calculate=function(){
        var This=this;
        /*reduce quantity*/
        $(this.parentName).find('button:first').on('click',function(){
            This.value=parseInt($(this).parent().find('input').val());
            if(This.value>1){
                This.value--;
                $(this).parent().find('input').val(This.value);
                This.spstr=$(this).parent().attr('id').split("_");
                This.changeTotalPrice();
               /* This.singlePrice= $(this).parentsUntil(".basket_order_item").parent().find('.basket_quantity_SinglePrice span').html();
                This.totalPrice=(parseFloat(This.singlePrice))*This.value;
                $(this).parentsUntil(".basket_order_item").parent().find('.basket_quantity_totalPrice span').html(This.totalPrice.toFixed(2));
                */
            }
        });
        /*add quantity*/
        $(this.parentName).find('button:last').on('click',function(){
            This.value=parseInt($(this).parent().find('input').val());
            This.value++;
            $(this).parent().find('input').val(This.value);
            This.spstr=$(this).parent().attr('id').split("_");
            This.changeTotalPrice();
        });
        /*input quantity*/
        $(this.parentName).find('input').on('keyup',function(){
            This.value=$(this).val();
            var re = This.value.match(/^[1-9]+\d*$/);
            if(re || This.value==''){
                This.spstr=$(this).parent().attr('id').split("_");
                This.changeTotalPrice();
            }else{
                alert('请输入数字');
                return false;
            }
        })
    };
    this.changeTotalPrice=function(){
        var This=this;
        This.currentIdIndex=This.spstr[This.spstr.length-1];
        This.singlePrice=$('#basket_orderItem_'+This.currentIdIndex).find('.basket_quantity_SinglePrice span').html();
        This.totalPrice=(parseFloat(This.singlePrice))*This.value;
        $('#basket_orderItem_'+This.currentIdIndex).find('.basket_quantity_totalPrice span').html(This.totalPrice.toFixed(2));

    }
};

