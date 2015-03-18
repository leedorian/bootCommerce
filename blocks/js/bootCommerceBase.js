/**
 * bootCommerce namespace
 * @author Dorian
 */
var bootCommerce = bootCommerce || {};

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
        var source = $(tempID).html();
        var template = Handlebars.compile(source);
        var context ={};
        if(data && typeof data === "object"){
            context = data;
        }
        return template(context);
    }
}
