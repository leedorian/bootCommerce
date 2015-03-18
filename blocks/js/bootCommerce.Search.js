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

    /**
     * This variable controls the timer handler before triggering the autoSuggest.  If the user types fast, intermittent requests will be cancelled.
     * The value is initialized to -1.
     * @type {object}
     * @memberof bootCommerce.Search
     */
    this.autoSuggestTimer = -1;
    /**
     * This variable controls the delay of the timer in milliseconds between the keystrokes before firing the search request.
     * The value is initialized to 250.
     * @type {number}
     * @memberof bootCommerce.Search
     */
    this.autoSuggestKeystrokeDelay = 250;
    /**
     * This variable stores the URL of currently selected static autosuggest recommendation
     * The value is initialized to empty string.
     * @type {string}
     * @memberof bootCommerce.Search
     */
    this.autoSuggestURL = "";
    /**
     * This variable indicates whether a the cached suggestions have been retrieved.
     * The value is initialized to false.
     * @type {boolean}
     * @memberof bootCommerce.Search
     */
    this.retrievedCachedSuggestions = false;

    /**
     * This variable sets the total number of static autosuggest recommendations used for each static category/grouping.
     * The value is initialized to 4.
     * @type {number}
     * @memberof bootCommerce.Search
     */
    this.totalSuggested = 4;

    /**
     * This variable sets the total number of previous search history terms.
     * The value is initialized to 2.
     * @type {number}
     * @memberof bootCommerce.Search
     */
    this.totalHistory = 2;

    /**
     * This variable controls when to trigger the auto suggest box.  The number of characters greater than this threshold will trigger the auto suggest functionality.
     * The static/cached auto suggest will be performed if this threshold is exceeded.
     * The value is initialized to 1.
     * @type {number}
     * @memberof bootCommerce.Search
     */
    this.autoSuggestThresHold = 1;

    /**
     * This variable controls when to trigger the dynamic auto suggest.  The number of characters greater than this threshold will trigger the request for keyword search.
     * The static/cached auto suggest will be be displayed if the characters exceed the above config parameter, but exceeding this threshold will additionally perform the dynamic search to add to the results in the static/cached results.
     * This value should be greater or equal than the AUTOSUGGEST_THRESHOLD, as the dynamic autosuggest is secondary to the static/cached auto suggest.
     * The value is initialized to 1.
     * @type {number}
     * @memberof bootCommerce.Search
     */
    this.dynamicAutoSuggestThresHold = 1;
    /**
     * This variable stores the old search term used in the auto suggest search box
     * The value is initialized to empty string.
     * @type {string}
     * @memberof bootCommerce.Search
     */
    this.autoSuggestPreviousTerm = "";
    /**
     * This variable stores static catetory and brand result
     * @type {object}
     * @memberof bootCommerce.Search
     */
    this.cachedSuggestions = {};
    /**
     * whether has static cached result
     * @type {boolean}
     * @memberof bootCommerce.Search
     */
    this.hasCachedResult = false;
    /**
     * whether has dynamic result
     * @type {boolean}
     * @memberof bootCommerce.Search
     */
    this.hasDynamicResult = false;
    /**
     * whether auto suggestion is open
     * @type {boolean}
     * @memberof bootCommerce.Search
     */
    this.asgDisplay = false;

    var _that = this;

    console.log(this.settings);

    $(this.settings.keywordInput).on("keypress.search", function(e){
        if (e.which === 13){
            e.preventDefault();
            if (_that.autoSuggestURL !== "") {
                window.location.href = _that.autoSuggestURL;
            } else {
                $(_that.settings.container).find("form")[0].submit();
            }
        }
    }).on("keyup.search", function(e){
        var searchTerm = $(_that.settings.keywordInput).val();
        if(searchTerm !== ""){
            switch (e.which) {
                case 38:
                    _that.highlightResult('up');
                    return;

                case 40:
                    _that.highlightResult('down');
                    return;

                case 27:
                case 13:
                    _that.toggleAutoSuggest(false);
                    return;
                default:
            }

            if(searchTerm.length > _that.autoSuggestThresHold && searchTerm === _that.autoSuggestPreviousTerm) {
                return;
            }
            else {
                _that.autoSuggestPreviousTerm = searchTerm;
            }

            if(searchTerm.length > _that.dynamicAutoSuggestThresHold) {
                //_that.doDynamicAutoSuggest(searchTerm);
            }else {
                // clear the dynamic results
                $(_that.settings.suggestionCon).find(".autoSuggestKeywords").html("");
                _that.hasDynamicResult = false;
            }
        } else {
            _that.clearAutoSuggestResults();
        }
    });

    this.highlightResult = function(control) {
        console.log(control);
    }

    /**
     * Display or hide suggestion drop down
     * @function toggleAutoSuggest
     * @memberof Essentra.autoSuggest
     * @param {boolean} display - if true, show the drop down, false hide.
     */
    this.toggleAutoSuggest = function(display) {
        if (display) {
            $(this.settings.suggestionCon).show();
            this.asgDisplay = true;
        } else {
            console.log(this.settings);
            $(this.settings.suggestionCon).hide();
            this.asgDisplay = false;
            this.autoSuggestURL = "";
        }
    };

    /**
     * Clear the results, and hide the drop down
     * @function clearAutoSuggestResults
     * @memberof bootCommerce.autoSuggest
     */
    this.clearAutoSuggestResults = function() {
        // clear the static search results.
        $(this.settings.suggestionCon).find(".autoSuggestCategory").html("");
        //$("#autoSuggestHistory").html("");
        this.autoSuggestPreviousTerm = "";

        // clear the dynamic search results;
        $(this.settings.suggestionCon).find(".autoSuggestKeywords").html("");
        this.toggleAutoSuggest(false);
    };

    /**
     * get suggested keywords and show them in drop down
     * @function doDynamicAutoSuggest
     * @memberof Essentra.autoSuggest
     * @param {string} searchTerm - search term
     */
    this.doDynamicAutoSuggest = function (searchTerm) {
        var _that = this;
        // if pending autosuggest triggered, cancel it.
        if(that.autoSuggestTimer != -1) {
            clearTimeout(that.autoSuggestTimer);
            that.autoSuggestTimer = -1;
        }
        $("#autoSuggestDynamic_Result_div").html("");
        // call the auto suggest
        that.autoSuggestTimer = setTimeout(function() {
            $.post(that.settings.SearchAutoSuggestServletURL+ "&term=" + escape(searchTerm)+ "&showHeader=true",{
                requesttype:"ajax"
            },function(result){
                var header = "";
                if(result.header){
                    header = snowFlake.helper.strCon('<h5>',result.header,'</h5>');
                }
                if(result.keywords && result.keywords.length > 0){
                    var ullist = "<ul>";
                    var list = "";
                    for(var i = 0;i<result.keywords.length;i++){
                        //var searchName = result.term;
                        var searchTermLower = result.term.toLowerCase();
                        var displayName = result.keywords[i];
                        var index = displayName.toLowerCase().indexOf(searchTermLower);
                        if(index != -1) {
                            list = snowFlake.helper.strCon(list,'<li><a href="#" data-keyword="',displayName,'">', displayName.substr(0, index) , '<strong>' , displayName.substr(index, searchTerm.length) , "</strong>" , displayName.substr(index + searchTerm.length),'</a></li>');
                        }
                    }
                    if(list !==""){
                        ullist = ullist+list + "</ul>";
                        $("#autoSuggestDynamic_Result_div").html(header+ullist);
                        that.hasDynamicResult = true;
                    }else{
                        that.hasDynamicResult = false;
                        $("#autoSuggestDynamic_Result_div").html("");
                    }
                }else{
                    that.hasDynamicResult = false;
                }
                if(result.Category){
                    that.cachedSuggestions.Category = result.Category;
                }
                if(result.Brand){
                    that.cachedSuggestions.Brand = result.Brand;
                }
                if(result.Articles){
                    that.cachedSuggestions.Articles = result.Articles;
                }
                if(searchTerm.length > that.AUTOSUGGEST_THRESHOLD) {
                    that.doStaticAutoSuggest(searchTerm);
                }else{
                    for (var i = 1; i <=3; i++) {
                        $("#autoSuggestStatic_"+i).html("");
                    }
                    $("#autoSuggestHistory").html("");
                    that.hasCachedResult = false;
                }
                that.checkAutoSuggest();

            },"json");
            that.autoSuggestTimer = -1;
        }, that.autoSuggestKeystrokeDelay);
    };

};
