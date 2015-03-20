/**
 * bootCommerce namespace
 * @author Dorian
 */
/*global Handlebars */
var bootCommerce = bootCommerce || {};

/**
 * bootCommerce constants
 */
bootCommerce.CONSTANTS = {
    /**
     * Break points
     */
    BP_XS: "screen and (max-width:479px)",
    BP_S: "screen and (max-width:599px)",
    BP_M: "screen and (max-width:770px)",
    BP_L: "screen and (max-width:979px)",
    BP_XL: "screen and (max-width:1199px)"
};

/**
 * bootCommerce untilities
 */
bootCommerce.Utils = {
    /**
     * compile handlebars template
     * @param {string} tempID the id selector of template script
     * @param {object} data the context data to compile the template
     * @return {string} the compiled html
     */
    template : function (tempID,data) {
        "use strict";
        var source = $(tempID).html();
        var template = Handlebars.compile(source);
        var context = {};
        if (data && typeof data === "object") {
            context = data;
        }
        return template(context);
    },

}
