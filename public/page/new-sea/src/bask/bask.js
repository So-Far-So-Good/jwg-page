define(function (require,exports,module){
    var $ = require("jquery"),
        validate = require("validate");

        require("bootstrap");   
    
    var WAYODDURL = "";

    //  申请晒单
    $("#applyBask").on("click",function(){
    	  $("#myBask").modal();
    })
    
    $("#verifyBask").validate({
    	  rules : {
			 waybillOdd: {
				required: true,
				remote: {
					url: WAYODDURL,
					type: "post",
					data: {
						useremail: function() {
							return $("#registerInputEmail").val();
						}
					}
				}
			 },
             sunUrl : {
                 required: true,
                 url:true
             },
             file01 : {
                 required: true
             }
    	  },
    	  messages : {
             waybillOdd : {
                 required: "运单单号不能为空",
                 remote: "运单单号不存在" 
             },
             sunUrl : {
                 required: "晒单链接不能为空",
                 url: "晒单链接请填写正确URL" 
             },
             file01 : {
             	 required: "晒单图片需填写一张"
             } 
    	  },
    	  submitHandler : function(form){
    	  	   
    	  }
    }) 

})