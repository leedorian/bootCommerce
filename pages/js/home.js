/**
 * @author xxx
 */
(function(){
	var home = {
		init: function(){
			this.loadHtmlFragment("test1");
			this.bindEvent();
		},
		bindEvent: function(){
			var that = this;
			jQuery(".masthead-nav").on("click","a",function(event){
				var muduleName = jQuery(event.target).attr("data-page");
				that.loadHtmlFragment(muduleName);
			});
		},
		loadHtmlFragment: function(module){
			//dufault load from blocks/***
			jQuery.get("../../blocks/" + module + ".html",function(result){
				if(result){
					var container = jQuery(".displayContainer");
					console.info(result);
					container.empty().append(result);
				}
			});
			var container = jQuery(".displayContainer");
		}
	}
	home.init();
})()