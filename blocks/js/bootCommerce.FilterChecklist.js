/**
 * Search box
 * @author Ivy
 */


/* global carousel */
bootCommerce.FilterChecklist =function() {
    "use strict";
    $(".productFilterCheckbox h4 button").on('click',function(){
        $(".productCheckboxList input[type='checkbox']").each(function(i){
            $(this).attr("checked",false);
        });
        $(".productCheckboxList input[type='text']").each(function(i){
            $(this).val("");
        });
    })
};

