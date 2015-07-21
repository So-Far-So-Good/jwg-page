define(function(require, exports, module) {
	var $ = require("jquery"),
		validate = require("validate");

	require("bootstrap");

    // 添加新留言
    $("#addNewMessage").on("click",function(){
    	$("#myMessage").modal();  
    })

    $("#addMessageForm").validate({
    	   rules : {
               messageTitle : {
                    required: true
               },
               messageContent : {
                    required: true,
                    rangelength : [5,50]
               }
    	   },
    	   messages : {
               messageTitle : {
                    required : "留言标题不能为空" 
               },
               messageContent : {
                    required : "留言内容不能为空", 
                    rangelength : "留言字数控制在 5-50 字以内"  
               }
    	   }, 
    	   submitHandler : function(){

    	   }
    })


    // 留言回复
    $(".replyMessage").on("click",function(){
    	$("#myMessageReply").modal(); 
    })

    $("#replyMessageForm").validate({
    	   rules : {
               messageContent : {
                    required: true,
                    rangelength : [5,50]
               }
    	   },
    	   messages : {
               messageContent : {
                    required : "留言内容不能为空", 
                    rangelength : "留言字数控制在 5-50 字以内"  
               }  
    	   },
    	   submitHandler : function(){

    	   } 
    })

    // 查看详情
    $(".detailsMessage").on("click",function(){
        $("#myMessageList").modal();	
    })

})