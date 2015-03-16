/**
 * Search box
 * @author Jack
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
    var _that =  this;

    /* keyboard up down function*/
    this.highlightResult = function(control) {
        this.control = control;
       //console.log(this.control);
        var suggestDiv = $(_that.settings.suggestionCon);
        var resultItems = suggestDiv.find(".autoSuggestKeywords ul li");
        var nextItem, current, currentIndex;
        if (resultItems.length > 0) {
            currentIndex = suggestDiv.find(".autoSuggestKeywords ul li.active").removeClass("active").index();
            if (this.control == 'down') {
                if (currentIndex == resultItems.length - 1) {
                    currentIndex = -1;
                }
                nextItem = resultItems.eq(currentIndex + 1);
            } else if (this.control == 'up') {
            if (currentIndex <= 0) {
                currentIndex = resultItems.length;
            }
                nextItem = resultItems.eq(currentIndex - 1);
            }
            if (nextItem){
                $(_that.settings.keywordInput).val(nextItem.addClass("active").find("a").text());
            }
        }
    }

    /* initialize */
    if (this.settings.autoSuggestion) {
        $(this.settings.container).on("keyup.search", this.settings.keywordInput, function (e) {
            /* triger auto suggestion */
            if ($(this).val()) {
                $(_that.settings.suggestionCon).show();
            }else{
                $(_that.settings.suggestionCon).hide();
            }

            if (e.keyCode == '38') {
                _that.highlightResult('up');
            }

            if (e.keyCode == '40') {
                _that.highlightResult('down');
            }
        });

        $(this.settings.container).on("blur.search", this.settings.keywordInput,  function (e) {
            /* triger auto suggestion */
           _that.highlightResult();
        });
    }
    $(document).on("click.search",function(e){
      if ($(e.target).parents(".siteSearchBar").size() === 0){
        $(_that.settings.suggestionCon).hide();
      }
      if ( $(e.target).parents(".autoSuggestKeywords").size() !== 0 ){
        $(e.target).parents(".autoSuggestKeywords").find("li.active").removeClass("active");
        $(e.target).addClass("active");
        console.log("function for search result");
      }
    });
};
