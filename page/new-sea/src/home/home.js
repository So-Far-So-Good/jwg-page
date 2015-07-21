// 主页面
define(function(require,exports,module){
    var $ = require("jquery"),
        bxslider = require("bxslider"),
        validate = require("validate");
        require("bootstrap");
    
	$('.banner-bxslider ul').bxSlider({
		mode: 'fade',
		controls: false
	});
    
    $("#parcelSearch").validate({
    	rules : {
           queryName : {
           	  required: true
           },
           queryOdd : {
           	  required: true
           }
    	},
    	messages : {
           queryName : {
           	  required: "收货人不能为空"
           },
           queryOdd : {
           	  required: "运单单号不能为空"
           }
    	},
    	submitHandler : function(form){
    		var name = $("#queryName").val(),
    		    odd = $("#queryOdd").val();
            
            // 查询数据 然后 返回
             
            $('#queryModal').modal()

            console.log(name)
            console.log(odd)
    		   
    	}
    })
    




})