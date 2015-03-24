/**
 * pdp page demo
 * @author Dorian
 */

/*global bootCommerce, $, document */
bootCommerce.pdpPage = {
    init: function () {
        'use strict';

        bootCommerce.ProductInfosTab();
    }
};
$(document).ready(function () {
    'use strict';
    bootCommerce.pdpPage.init();
});
