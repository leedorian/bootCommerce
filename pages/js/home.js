/*
 * describe load html fragment
 */

/*global jQuery, bootCommerce */
(function () {
    'use strict';

    var home = {
        init: function () {
            // load default fragment
            this.bindEvent();
        },
        toggleSideBar: function (beacon) {
            if(!beacon){
                jQuery(".masthead").removeClass("expanded");
                jQuery(".masthead .fa").removeClass("fa-angle-double-left").addClass("fa-angle-double-right");
            }else{
                jQuery(".masthead").addClass("expanded");
                jQuery(".masthead .fa").removeClass("fa-angle-double-right").addClass("fa-angle-double-left");
            }

        },
        bindEvent: function () {
            var that = this;
            jQuery('.masthead-nav.blocks').on('click', 'a', function (event) {
                var muduleName = jQuery(event.target).attr('data-page');
                that.loadHtmlFragment(muduleName);
            });
            //side bar
            jQuery("body").on("click", function (e) {
                if (jQuery(e.target).parents(".masthead").size() === 0) {
                    that.toggleSideBar();
                }else{
                    if(jQuery(e.target).hasClass("fa")){
                        if(jQuery(".masthead").hasClass("expanded")){
                            that.toggleSideBar();
                        }else{
                            that.toggleSideBar(true);
                        }
                    }
                }

            });
            /*jQuery(".masthead").on("mouseleave",function () {
                jQuery(".masthead").removeClass("expanded");
            });*/
        },
        loadHtmlFragment: function (module) {
            // dufault load from blocks/***
            jQuery.ajax({
                type: 'get',
                url: '../../blocks/dist/' + module,
                cache: false, // remove cache
                success: function (result) {
                    if (result) {
                        var container = jQuery('.displayContainer');
                        container.empty().append(result);



                        /**
                         * initialize components
                         */

                        //Product search
                        var Search = new bootCommerce.Search({
                            container: ".displayContainer .siteSearchBar",
                            suggestionCon: ".siteSearchBarAutoSuggest",
                            keywordInput: ".siteSearchBarInput input[type='text']"
                        });

                        //Horizontal products carousel

                        //Vertical products carousel

                        //Image viewer

                        //Mini basket

                        //Product swatch

                        //Quick info box

                        //Slide show

                        //Product infos tab
                        bootCommerce.ProductInfosTab();

                        //
                    }
                },
                error: function () {
                    // TODO
                }
            });
        }
    };
    home.init();

}());
