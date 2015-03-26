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
    new bootCommerce.FilterRemoveable.CascadingPane({
        showContainerOne:'#collapseOne',
        containerOne:'#collapseTwo'
    }).init();

};
bootCommerce.FilterRemoveable.FilterRemoveablePanel = function(options){
    "use strict";
    this.defaults = {
        removeContainer:'',
        allRemoveClickContainer:''
    };
    var This=this;
    this.settings = $.extend({}, this.defaults, options);
    $(this.settings.removeContainer).find("button").each(function(i){
        $(This.settings.removeContainer).find("button").eq(i).on('click',(function(){
            $(this).parent().remove();
        }))
    });
    $(this.settings.allRemoveClickContainer).find("button").on('click',function(){
        $(This.settings.removeContainer).find("li").remove();
    })
};
bootCommerce.FilterRemoveable.CascadingPane = function(options){
    "use strict";
    this.defaults = {
        showContainerOne:'',
        containerOne:''
    };
    this.settings = $.extend({}, this.defaults, options);
    this.init=function(){
        $(this.settings.showContainerOne).collapse({
            toggle: true
        });
        $(".panel-title").find('a').on('click',function(){
            $(".panel-collapse").collapse('show');
            $($(this).attr('href')).collapse('toggle');
        });
        this.setCaret(this.settings.showContainerOne);
        this.setCaret(this.settings.containerOne);
    };
    this.setCaret=function(obj){
        $(obj).on('hidden.bs.collapse', function () {
            $(this).prev().find('a').removeClass("fa-caret-down").addClass("fa-caret-right");
        });
        $(obj).on('show.bs.collapse', function () {
            $(this).prev().find('a').removeClass("fa-caret-right").addClass("fa-caret-down");
        });
    };
};
