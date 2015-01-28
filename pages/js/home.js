/**
 * @describe load html fragment
 * @author xxx
 */
(function(){
	'use strict'
	
	var home = {
		init: function(){
			//load default fragment
			//this.loadHtmlFragment("test1");
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
					container.empty().append(result);
				}
			});
		}
	}
	home.init();
})()