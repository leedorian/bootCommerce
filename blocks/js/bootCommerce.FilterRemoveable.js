/**
 * Search box
 * @author Ivy
 */


/* global carousel */
bootCommerce.FilterRemoveable={
    init:function(){
        new bootCommerce.FilterRemoveable.FilterRemoveablePanel({
            removeContainer:'.productRemovableList',
            allRemoveClickContainer:'.productFilterRemovableTitle'
        });
        bootCommerce.FilterRemoveable.CascadingPane();
    }
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
    var buttonContainer= $(this.settings.removeContainer).find("button");
    buttonContainer.each(function(i){
        buttonContainer.eq(i).on('click.removeFn',(function(){
            $(this).parent().remove();
        }))
    });
    $(this.settings.allRemoveClickContainer).find("button").on('click.removeFn',function(){
        $(_that.settings.removeContainer).find("li").remove();
    })
};
bootCommerce.FilterRemoveable.CascadingPane = function(){
    "use strict";
    $("#collapseOne").collapse({
        toggle: true
    });
    $(".panel-title").find('a').on('click.CascadingPane',function(){
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

