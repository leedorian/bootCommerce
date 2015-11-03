/**
 * Search box
 * @author Jack
 */

/*global bootCommerce, $, console, Handlebars */

Handlebars.registerHelper('searchTermBold', function(term, options) {
    "use strict";
    return options.fn(this).replace(new RegExp("(>[^<]*)(" + term + ")([^>]*<)", "gi"), "$1<strong>$2</strong>$3");
});

bootCommerce.Search = function (options) {
    "use strict";
    /* properties */
    this.defaults = {
        autoSuggestion: true,
        suggestionCon: "",
        keywordInput: "",
        searchForm: "",
        container: "",
        development: true
    };
    /**
    *   for development
    *   sample data
    */
    this.fakeData = {
        header: "Suggest keywords",
        term: "pipe",
        keywords: [
            "Pipe",
            "pipe plugs",
            "pipe end",
            "pipe caps",
            "pipe end plugs",
            "pipe cap"
        ],
        Category: [
            {
                title: "flexible pipe caps",
                url: "http://uk.essentracomponents.com/shop/en-GB/essentracomponentsuk/flexible-pipe-caps-18052-44",
                name: "Caps &amp; Plugs &gt; Pipe &amp; Flange Protection Caps &gt; Pipe Caps &gt; Flexible Pipe Caps"
            },
            {
                title: "flexible pipe caps",
                url: "http://uk.essentracomponents.com/shop/en-GB/essentracomponentsuk/flexible-pipe-caps-18086-44",
                name: "Caps &amp; Plugs &gt; Push Fit Caps &gt; Pipe Caps &gt; Flexible Pipe Caps"
            }
        ],
        Brand: [
        ]
    };

    this.settings = $.extend({}, this.defaults, options);
    this.inputVal = "";
    this.suggestDivShow = false;
    this.doDynamicSuggest = true;
    this.oldInputVal = "";
    this.autoSuggestTimer = -1;
    this.autoSuggestKeystrokeDelay = 250;
    var _that = this;

    $(this.settings.keywordInput).on("keypress.search", function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    })
    $(this.settings.keywordInput).on("keyup.search", function(e) {
        _that.inputVal = $(this).val();
        if (_that.inputVal.length >= 2) {

            switch (e.keyCode) {
                case 38:
                    _that.highlight("up");
                    break;
                case 40:
                    _that.highlight("down");
                    break;
                case 27:
                    _that.clearResult();
                    break;
                case 13:
                    _that.doSearchSumbit();
                    break;
                default:
                    if (_that.oldInputVal !== _that.inputVal) {

                        _that.getResult(_that.inputVal);

                        _that.oldInputVal = _that.inputVal;
                    }
            }
        } else {
            _that.clearResult();
            _that.oldInputVal = _that.inputVal;
        }
    });
};

bootCommerce.Search.prototype.getResult = function(keyword) {
    "use strict";
    var _that = this;

    if (this.autoSuggestTimer !== -1) {
        clearTimeout(this.autoSuggestTimer);
        //this.autoSuggestTimer = -1;
    }

    this.autoSuggestTimer = setTimeout(function() {
        //console.log('call Timeout:', _that.autoSuggestTimer);
        if (_that.settings.development) {
            _that.showResult(_that.fakeData);
        } else {
        //do ajax
            console.log('do ajax');
        }
        _that.autoSuggestTimer = -1;
    }, _that.autoSuggestKeystrokeDelay);

    //console.log('regist Timeout:', this.autoSuggestTimer);
};

bootCommerce.Search.prototype.toggleSuggestDiv = function(control) {
    "use strict";
    if (control) {
        $(this.settings.suggestionCon).show();
    } else {
        $(this.settings.suggestionCon).hide();
    }
}

bootCommerce.Search.prototype.showResult = function(result) {
    "use strict";
    var keyowrdHtml = bootCommerce.Utils.template("#tempBcSearchAutoSugTerm", result);
    var categoryHtml = bootCommerce.Utils.template("#tempBcSearchAutoSugCat", result);
    $(this.settings.suggestionCon).find(".autoSuggestKeywords").html(keyowrdHtml);
    $(this.settings.suggestionCon).find(".autoSuggestCategory").html(categoryHtml);
    this.toggleSuggestDiv(true);
};

bootCommerce.Search.prototype.highlight = function(control) {
    "use strict";
    var liItem = $(this.settings.suggestionCon).find("li");
    var currentItem = liItem.filter(".active");
    var index = liItem.index(currentItem);

    if (control === "up") {
        console.log(this.inputVal);
        if (index <= 0) {
            index = liItem.length;
        }
        index--;
    } else {
        if (index === liItem.length - 1) {
            index = -1;
        }
        index++;
    }
    currentItem.removeClass("active");
    currentItem = liItem.eq(index).addClass("active");
    if (currentItem.closest('.autoSuggestCategory').size() === 0) {
        $(this.settings.keywordInput).val(currentItem.text());
    } else {
        $(this.settings.keywordInput).val(this.oldInputVal);
    }
};

bootCommerce.Search.prototype.clearResult = function() {
    "use strict";
    $(this.settings.suggestionCon).find(".autoSuggestKeywords").html("");
    $(this.settings.suggestionCon).find(".autoSuggestCategory").html("");
    $(this.settings.suggestionCon).hide();
};

bootCommerce.Search.prototype.doSearchSumbit = function() {
    "use strict";
    var keyword = $(this.settings.suggestionCon).find(".active a");
    if (keyword.length !== 0 && keyword.attr("href") !== "") {
        window.location.href = keyword.attr("href");
    } else {
        //console.log($(this.settings.container).find("form"));
        $(this.settings.container).find("form")[0].submit();
    }
};
