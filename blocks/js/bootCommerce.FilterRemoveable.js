/**
 * Search box
 * @author Ivy
 */


/* global carousel */
bootCommerce.FilterRemoveable =function() {
    "use strict";
    new bootCommerce.FilterRemoveable.FilterRemoveablePanel({
        removeContainer:'.productRemovableList',
        allRemoveClickContainer:'.productFilterRemovableTitle'
    });
    bootCommerce.FilterRemoveable.CascadingPane();

};
bootCommerce.FilterRemoveable.FilterRemoveablePanel = function(options){
    "use strict";
    this.defaults = {
        removeContainer:'',
        allRemoveClickContainer:''
    };
    this.settings = $.extend({}, this.defaults, options);
    this.removeFn();

};
bootCommerce.FilterRemoveable.FilterRemoveablePanel.prototype.removeFn=function(){
    "use strict";
    var _that=this;
    $(this.settings.removeContainer).find("button").each(function(i){
        $(_that.settings.removeContainer).find("button").eq(i).on('click',(function(){
            $(this).parent().remove();
        }))
    });
    $(this.settings.allRemoveClickContainer).find("button").on('click',function(){
        $(_that.settings.removeContainer).find("li").remove();
    })
};
bootCommerce.FilterRemoveable.CascadingPane = function(){
    "use strict";
    $("#collapseOne").collapse({
        toggle: true
    });
    $(".panel-title").find('a').on('click',function(){
        $('.panel-collapse' ).collapse('hide');
        if($(this).is('.fa-caret-down')){
            $(this).removeClass("fa-caret-down").addClass("fa-caret-right");
            $($(this).attr('href')).collapse('toggle');
        }else{
            $(this).removeClass("fa-caret-right").addClass("fa-caret-down");
            $($(this).attr('href')).collapse('show');
        }
    });
};

