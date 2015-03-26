/**
 * Search box
 * @author Ivy
 */


/* global carousel */

bootCommerce.Carousel = function(options){
    "use strict";
    var _that = this;
    this.defaults = {
        containerId:'',
        controlDirectionClassName:'.carouselControl',
        carouselIndicatorsClassName:'.carouselIndicators',
        autoPlay: true,
        intervalTime: 5000,
        pauseMethod: "hover",
        wrapPlay: true,
        keyboardEvent:true
    };
    this.settings = $.extend({}, this.defaults, options);
    if(this.settings.autoPlay){
        $(this.settings.containerId).carousel({
            interval: this.settings.intervalTime,
            pause:this.settings.pauseMetheod,
            wrap:this.settings.wrapPlay,
            keyboard:this.settings.keyboardEvent
        });
    }
    $(this.settings.controlDirectionClassName).eq(0).on('click',function(){
        $(_that.settings.containerId).carousel('prev');
    });
    $(this.settings.controlDirectionClassName).eq(1).on('click',function(){
        $(_that.settings.containerId).carousel('next');
    });

    $(this.settings.carouselIndicatorsClassName).find("li").each(function(i){
        $(this).on('click',function(){
            $(_that.settings.containerId).carousel(i);
        });
    });
};
