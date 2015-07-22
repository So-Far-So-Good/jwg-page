define(function(require, exports, module) {
	var  $ = require("jquery");

	require("ZeroClipboard");

	var client = new ZeroClipboard($(".click-copy"));

	client.on("aftercopy", function() {
		alert("复制完成")
	});

	client.on("error", function(event) {
		$(".click-copy").addClass("on-copy");
	});

})