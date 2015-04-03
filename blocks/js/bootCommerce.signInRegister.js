/**
 * SignIn & Register
 * @author Mike Zou
 */

/*global bootCommerce, $, console */
bootCommerce.signInRegister = function(conf) {
    "use strict";

    $(".FormLayoutTransTrigger").on("change", function() {
        var form = $(this).parents("form");
        var type = $(this).val();
        if (type === "withoutLabelForm") {
            form.find(".form-group input[type!=checkbox]").each(function() {
                $(this).attr("placeHolder", $(this).siblings("label").html());
            });
        } else {
            form.find(".form-group input[type!=checkbox]").each(function() {
                $(this).attr("placeHolder", "");
            });
        }
        form.attr("class", type);
    });
};
