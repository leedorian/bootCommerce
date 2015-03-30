/**
 * Search box
 * @author Ivy
 */


/* global carousel */
bootCommerce.StorLocator =function() {
    "use strict";
    $(".cascadingPanelCollapse").each(function(i){
        $(this).on('click',function(){
            $('.collapse' ).collapse('hide');
            if($(this).find('span').is('.fa-caret-down')){
                $(this).find('span').removeClass("fa-caret-down").addClass("fa-caret-right");
                $($(this).attr('href')).collapse('toggle');
            }else{
                $($(this).attr('href')).collapse('show');
                $(this).find('span').removeClass("fa-caret-right").addClass("fa-caret-down");
            }
        })
    })
};
