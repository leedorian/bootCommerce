/*
 * describe load html fragment
 */


(function () {
    'use strict';

    var home = {
        init: function () {
            // load default fragment
            // this.loadHtmlFragment('test1');
            this.bindEvent();
        },
        bindEvent: function () {
            var that = this;
            jQuery('.masthead-nav').on('click', 'a', function (event) {
                var muduleName = jQuery(event.target).attr('data-page');
                that.loadHtmlFragment(muduleName);
            });
        },
        loadHtmlFragment: function (module) {
            // dufault load from blocks/***
            /*
            jQuery.get('../../blocks/' + module + '.html', function (result) {
                if (result) {
                    var container = jQuery('.displayContainer');
                    console.info(result);
                    container.empty().append(result);
                }
            });
            */
            jQuery.ajax({
                type: 'get',
                url: '../../blocks/dist/' + module,
                cache: false, // remove cache
                success: function (result) {
                    if (result) {
                        var container = jQuery('.displayContainer');
                        container.empty().append(result);
                    }
                },
                error: function () {
                    // TODO
                }
            });
        }
    };
    home.init();

})();
