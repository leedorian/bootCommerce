/**
 * Search box
 * @author xxx
 */

/*global bootCommerce, $, console */
bootCommerce.Search = function (options) {
    "use strict";
    /* properties */
    this.defaults = {
        autoSuggestion: true,
        suggestionCon: "",
        keywordInput: "",
        searchForm: "",
        container: ""
    };
    this.settings = $.extend({}, this.defaults, options);
    /* initialize */
    if (this.settings.autoSuggestion) {
        $(this.settings.container).on("keyup.Search", this.settings.keywordInput, function () {
            /* triger auto suggestion */
            console.log("keyup");
        });
    }

};
