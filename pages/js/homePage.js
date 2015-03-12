/**
 * home page demo
 * @author Dorian
 */

/*global bootCommerce, $, document */
bootCommerce.homePage = {
    init: function () {
        'use strict';
        var HeadSearch = new bootCommerce.Search({
            container: ".header .siteSearchBar",
            suggestionCon: ".siteSearchBar_autoSuggest",
            keywordInput: ".siteSearchBar_input input[type='text']"
        });
    }
};
$(document).ready(function () {
    'use strict';
    bootCommerce.homePage.init();
});
