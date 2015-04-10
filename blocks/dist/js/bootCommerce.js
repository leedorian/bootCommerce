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
    template : function(tempID, data) {
        "use strict";
        var source = $(tempID).html();
        var template = Handlebars.compile(source);
        var context = {};
        if (data && typeof data === "object") {
            context = data;
        }
        return template(context);
    }

}

/**
 * basket block
 * @author Ivy
 */

/* global bootCommerce, console, basket */
bootCommerce.Basket = {
    init: function() {
        "use strict";

        new bootCommerce.Basket.orderItem({
            container: ".basketOrderTable .basketOrderItem",
            containerInput: ".basketOrderTable .basketQuantityOperation"
        });
        bootCommerce.Basket.checkPromotionalCode();
        new bootCommerce.Basket.basketOperationButton({
            saveBasketAjax: true,
            emptyBasketAjax: true,
            checkOutAjax: true
        });
    }
};
bootCommerce.Basket.orderItem = function(options) {
    "use strict";

    /* properties */
    this.defaults = {
        container: "",
        containerInput: ""
    };
    this.settings = $.extend({}, this.defaults, options);
    /*initialize*/
    this.inputValue = 0;
    this.currentIdIndex = "";
    this.setIdName();
    this.calculate();
    this.removeBasketItem(".basketProductRemove");
    this.removeBasketItem(".basketMoveWishList");
};

bootCommerce.Basket.orderItem.prototype.setIdName = function() {
    "use strict";

    var _that = this;
    $(this.settings.containerInput).each(function(i) {
        $(_that.settings.containerInput).eq(i).attr("id", "basketQty" + (i + 1));
    });

    $(this.settings.container).each(function(i) {
        $(_that.settings.container).eq(i).attr("id", "basketOrderItem" + (i + 1));
    });
};
bootCommerce.Basket.orderItem.prototype.calculate = function() {
    /*reduce quantity*/
    "use strict";

    var _that = this;
    $(this.settings.containerInput).find(".reduceBtn").on("click.calculate", function() {
        var inputContainer = $(this).parent().find("input");
        _that.inputValue = parseInt(inputContainer.val(), 10);

        if (_that.inputValue > 1) {
            _that.inputValue--;
            inputContainer.val(_that.inputValue);
        }
    });

    /*add quantity*/
    $(this.settings.containerInput).find(".addBtn").on("click.calculate", function() {
        var inputContainer = $(this).parent().find("input");
        _that.inputValue = parseInt(inputContainer.val(), 10);
        _that.inputValue++;
        inputContainer.val(_that.inputValue);
    });

    /*input quantity*/
    $(this.settings.containerInput).find("input").on("keyup.calculate", function() {
        _that.inputValue = $(this).val();
        var re = _that.inputValue.match(/^[1-9]+\d*$/);
        if (!re && _that.inputValue !== "") {
            console.log("Please key in a number");
            return false;
        }
    });
};

bootCommerce.Basket.orderItem.prototype.removeBasketItem = function(removeName) {
    "use strict";
    var _that = this;

    $(removeName).each(function(i) {
        $(this).on("click.removeBasketItem", function() {
            _that.currentIdIndex = $(this).parent().parent().attr("id").replace(/[^0-9]/ig, "");
            $("#basketOrderItem" + _that.currentIdIndex).remove();
        });
    });
};

bootCommerce.Basket.checkPromotionalCode = function() {
    "use strict";

    $(".promotionalCode button").on("click.checkPromotionalCode", function() {
        //ToDo
    });
};
bootCommerce.Basket.basketOperationButton = function(options) {
    "use strict";

    /* properties */
    this.defaults = {
       saveBasketAjax:false
    };
    this.settings = $.extend({}, this.defaults, options);
    /*initialize*/
    this.saveBasketAjax = true;
    this.emptyBasketAjax = true;
    this.checkOutAjax = true;
    this.saveBasket();
    this.EmptyBasket();
    this.checkOut();

};
bootCommerce.Basket.basketOperationButton.prototype.saveBasket = function() {
    "use strict";

    var _that = this;
    $(".basketSaveBtn").on("click.saveBasket", function() {
        /*if (_that.saveBasketAjax) {
            //ajax request
        } else {
            //form submit
        }*/

        $(".basketOrderTable tbody tr").empty();
    });
};

bootCommerce.Basket.basketOperationButton.prototype.EmptyBasket = function() {
    "use strict";

    var _that = this;
    $(".basketEmptyBtn").on("click.EmptyBasket", function() {
        /*if (_that.emptyBasketAjax) {
            //ajax request
        } else {
            //form submit
        }*/
        //window.location.href="blocks/basket_empty.html";
    });
};
bootCommerce.Basket.basketOperationButton.prototype.checkOut = function(){
    "use strict";

    var _that = this;
    $(".basketCheckOutBtn").on("click.EmptyBasket", function() {
        /*if (_that.checkOutAjax) {
            //ajax request
        } else {
            //form submit
        }*/
    });
};


/**
 * Carousel
 * @author Ivy
 */


/* global bootCommerce, console, carousel */
bootCommerce.Carousel = function(options) {
    "use strict";

    var _that = this;
    this.defaults = {
        containerId:"",
        controlDirectionClassName:".carouselControl",
        carouselIndicatorsClassName:".carouselIndicators",
        autoPlay: true,
        intervalTime: 5000,
        pauseMethod: "hover",
        wrapPlay: true,
        keyboardEvent:true
    };

    this.settings = $.extend({}, this.defaults, options);

    if (this.settings.autoPlay) {
        $(this.settings.containerId).carousel({
            interval: this.settings.intervalTime,
            pause:this.settings.pauseMetheod,
            wrap:this.settings.wrapPlay,
            keyboard:this.settings.keyboardEvent
        });
    }

    $(this.settings.controlDirectionClassName).eq(0).on("click", function() {
        $(_that.settings.containerId).carousel("prev");
    });

    $(this.settings.controlDirectionClassName).eq(1).on("click", function() {
        $(_that.settings.containerId).carousel("next");
    });

    $(this.settings.carouselIndicatorsClassName).find("li").each(function(i) {
        $(this).on("click.Carousel", function() {
            $(_that.settings.containerId).carousel(i);
        });
    });
};

/**
 * Filter checklist
 * @author Ivy
 */


/* global bootCommerce, console, carousel */
bootCommerce.FilterChecklist = function() {
    "use strict";

    $(".productFilterCheckbox h4 button").on('click.FilterChecklist', function() {
        $(".productCheckboxList input:checkbox").each(function(i) {
            $(this).attr("checked", false);
        });

        $(".productCheckboxList input:text").each(function(i) {
            $(this).val("");
        });
    });
};


/**
 * Filter removeable
 * @author Ivy
 */


/* global bootCommerce, console, carousel */
bootCommerce.FilterRemoveable = {
    init: function() {
        "use strict";

        new bootCommerce.FilterRemoveable.FilterRemoveablePanel({
            removeContainer:".productRemovableList",
            allRemoveClickContainer:".productFilterRemovableTitle"
        });

        bootCommerce.FilterRemoveable.CascadingPane();
    }
};

bootCommerce.FilterRemoveable.FilterRemoveablePanel = function(options) {
    "use strict";

    this.defaults = {
        removeContainer: "",
        allRemoveClickContainer: ""
    };
    this.settings = $.extend({}, this.defaults, options);
    this.removeFn();

};

bootCommerce.FilterRemoveable.FilterRemoveablePanel.prototype.removeFn = function() {
    "use strict";

    var _that = this;
    var buttonContainer = $(this.settings.removeContainer).find("button");

    buttonContainer.each(function(i) {
        buttonContainer.eq(i).on("click.removeFn", function() {
            $(this).parent().remove();
        });
    });

    $(this.settings.allRemoveClickContainer).find("button").on("click.removeFn", function() {
        $(_that.settings.removeContainer).find("li").remove();
    });
};
bootCommerce.FilterRemoveable.CascadingPane = function() {
    "use strict";

    $("#collapseOne").collapse({
        toggle: true
    });

    $(".panel-title").find("a").on("click.CascadingPane", function() {
        $(".panel-collapse").collapse("hide");
        if ($(this).is(".fa-caret-down")) {
            $(this).removeClass("fa-caret-down").addClass("fa-caret-right");
            $($(this).attr("href")).collapse("toggle");
        } else {
            $(this).removeClass("fa-caret-right").addClass("fa-caret-down");
            $($(this).attr("href")).collapse("show");
        }
    });
};


/**
 * Image Viewer
 * @author Lionel
 */

/*global bootCommerce, $, console */
bootCommerce.ImageViewer = function(conf) {
    "use strict";

    $(".imageViewer").on("click.ImageViewer", ".imageViewerThumb img", function(e) {
        e.preventDefault();

        $(this).closest(".imageViewer")
            .find(".imageViewerBooth img")
            .attr("src", ($(this).data("img-booth")));
    }).on("mousemove.ImageViewer", ".imageViewerBooth", function(e) {
        var boothOffset = $(this).offset();
        var lensOffset = {};
        var $imageViewerLens = $(this).find(".imageViewerLens");
        var $imageViewerOverlayImg = $(this).find(".imageViewerOverlay img");
        var boothWidth = $(this).width();
        var boothHeight = $(this).height();
        var lensWidth = $imageViewerLens.width();
        var lensHeight = $imageViewerLens.height();

        if (e.pageX - boothOffset.left <= lensWidth / 2) {
            lensOffset.left = 0;
        } else if (e.pageX - boothOffset.left + lensWidth / 2 >= boothWidth) {
            lensOffset.left = boothWidth - lensWidth;
        } else {
            lensOffset.left = e.pageX - boothOffset.left - lensWidth / 2;
        }

        if (e.pageY - boothOffset.top <= lensHeight / 2) {
            lensOffset.top = 0;
        } else if (e.pageY - boothOffset.top + lensHeight / 2 >= boothHeight) {
            lensOffset.top = boothHeight - lensHeight;
        } else {
            lensOffset.top = e.pageY - boothOffset.top - lensHeight / 2;
        }
        $imageViewerLens.css(lensOffset);
        $imageViewerOverlayImg.css({ marginTop: -lensOffset.top * 2, marginLeft: -lensOffset.left * 2 });
    }).on("mouseenter.ImageViewer", ".imageViewerBooth", function(e) {
        $(this).find(".imageViewerOverlay").show();
    }).on("mouseleave.ImageViewer", ".imageViewerBooth", function(e) {
        $(this).find(".imageViewerOverlay").hide();
    });
};
/**
 * Mini basket box
 * @author Jack
 */

/*global bootCommerce, $, console */
bootCommerce.MiniBasket = function () {
    "use strict";
    /* properties */
    var defaults = {
        miniBasketBtn : $(".siteMinBasketBox"),
        miniBasketPopup : $(".siteMinBasketPopup")
    };

   //show mini basket box
    defaults.miniBasketBtn.on("click.MiniBasket", function() {
        defaults.miniBasketPopup.toggle("linear");
        //console.log(0);
    });

    $(".siteMinBasketPopup .close").on("click.MiniBasket", function() {

        if ($(".mobileHeader").css("display") === "block") {
            //defaults.miniBasketPopup.hide();
            $(".siteMinBasket").hide();
            $(".mobileMinBasket").removeClass("mobileActive");
            $(".siteMinBasketPopup").css("display", "block");
        } else {
            defaults.miniBasketPopup.hide();
        }
        //console.log(0);
    });
};

/**
 * Navigation box
 * @author Jack
 */

/*global bootCommerce, $, console */

bootCommerce.Navigation = function () {
    "use strict";

    var navBarTit = $(".mobileHeader li");

    navBarTit.click(function() {
        //alert(123);
        $("[responsive-mobile-control=true]").hide();
        //checkHeight();
        if ($(this).hasClass("mobileActive")) {
            $(this).removeClass("mobileActive");
        } else {
            $(".mobileActive").removeClass("mobileActive");
            $(this).addClass("mobileActive");
            $("." + $(this).attr("site-target")).show();
            /*if (!$(this).hasClass("mobileNavBar")) {
                //checkHeight($(this).attr("site-target"));
            }*/
        }
    });

    var checkHeight = function(className) {
        if (className) {
            $("." + className).height();
            $(".header").css("margin-bottom", $("." + className).height() + 30);
            $("." + className).css("padding", "15px");
        } else {
            $(".header").css("margin-bottom", "0");
        }
    };
};

/**
 * Product infos tab
 * @author Lionel
 */

/*global bootCommerce, $, console */
bootCommerce.ProductInfosTab = function () {
    "use strict";

    $(".productInfosTabTitle").on("click.ProductInfosTab", "a", function(e) {
        e.preventDefault();
    }).on("focus.ProductInfosTab", "a", function(e) {
        $(this).tab("show");
    }).on("show.bs.tab", "a", function(e) {
        $(this).closest(".productInfosTab")
            .find("dt.current")
            .removeClass("current")
            .end()
            .find($(e.target).attr("href"))
            .prev("dt")
            .addClass("current");
    }).on("keypress.ProductInfosTab", "li", function(e) {
        var $thisPrev;
        var $thisNext;

        switch (e.keyCode) {
        case 37:
            $thisPrev = $(this).prev();

            if ($thisPrev.size() > 0) {
                $thisPrev.find("a").focus().tab("show");
            }
            break;
        case 39:
            $thisNext = $(this).next();

            if ($thisNext.size() > 0) {
                $thisNext.find("a").focus().tab("show");
            }
            break;
        default:
        }
    }).find("a:first").tab("show");

    $(".productInfosTabContent").on("click.ProductInfosTab", "dt", function(e) {
        $(this).closest(".productInfosTab")
            .find(".productInfosTabTitle a[href=#" + $(this).next("dd").prop("id") + "]")
            .tab("show");
    });
};

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
/**
 * StorLocator blocks
 * @author Ivy
 */


/* global bootCommerce, console, StorLocator */
bootCommerce.StorLocator = function() {
    "use strict";

    $(".findStoreBtn").on("click.StorLocator", function() {
        //ToDo
    });

    $(".cascadingPanelCollapse").each(function(i) {
        $(this).on("click.StorLocator", function() {
            var spanContainer = $(this).find("span");
            $(".collapse").collapse("hide");

            if (spanContainer.is(".fa-caret-down")) {
                spanContainer.removeClass("fa-caret-down").addClass("fa-caret-right");
                $($(this).attr("href")).collapse("toggle");
            } else {
                $($(this).attr("href")).collapse("show");
                spanContainer.removeClass("fa-caret-right").addClass("fa-caret-down");
            }
        });
    });
};

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
