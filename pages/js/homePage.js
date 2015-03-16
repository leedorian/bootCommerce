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
            suggestionCon: ".siteSearchBarAutoSuggest",
            keywordInput: ".siteSearchBarInput input[type='text']"
        });
        var MiniBasket = new bootCommerce.MiniBasket({

        });
    }
};
$(document).ready(function () {
    'use strict';
    bootCommerce.homePage.init();
});
