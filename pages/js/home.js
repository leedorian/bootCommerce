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
        bindEvent: function () {
            var that = this;
            jQuery('.masthead-nav.blocks').on('click', 'a', function (event) {
                var muduleName = jQuery(event.target).attr('data-page');
                that.loadHtmlFragment(muduleName);
            });
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
