define(function(require, exports, module) {
	var $ = require("jquery");

	//展开显示效果
	$("body").on("click", ".package-more-info", function() {
		var self = $(this),
			isHide = self.data("more");

		self.parent().parent().find(".p-inf").toggle(300, function() {

			if (isHide) {
				self.html("[查看物品详情]");
				self.data("more", false);
			} else {
				self.html("[隐藏物品详情]");
				self.data("more", true);
			}

		});
	})

    $("body").on("click",".package-more",function(){
    	var self = $(this),
			isHide = self.data("more");

		self.parent().parent().find(".pack-hide").toggle(200, function() {

			if (isHide) {
				self.html("[更多]");
				self.data("more", false);
			} else {
				self.html("[收起]");
				self.data("more", true);
			}

		});	
    })




})