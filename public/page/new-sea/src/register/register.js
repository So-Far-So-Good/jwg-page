define(function (require,exports,module){
      var $ = require("jquery"),
          validate = require("validate"),
          cookie = require("cookie");

      var CHECKEMAIL = "http://192.168.1.120:89/User/CheckUserEmail", 
          CHECKNAME = "http://192.168.1.120:89/User/CheckUserName",
          CHECKCOUPON = "http://192.168.1.120:89/User/CheckUserName";


      var $registerInputEmail = $("#registerInputEmail"), 
          $registerInputName = $("#registerInputName"),

           email = $.cookie('registerInputEmail') || "", 
           name = $.cookie('registerInputName') || ""; 
       
       if(email){
       	  $registerInputEmail.val(email)
       }

       if(name){
       	  $registerInputName.val(name)
       }     

      $("#registerForm").validate({
           rules : {
               registerInputEmail : {
                     required: true,
                     email: true,
                     remote: {
                     	 url : CHECKEMAIL,
                     	 type: "post",
                     	 data: {
                     	 	 useremail: function(){
                     	 	 	return $("#registerInputEmail").val();
                     	 	 }
                     	 }
                     }  
               },
               registerInputName : {
                     required: true,
                     rangelength:[4,12],
                     remote: {
                     	 url : CHECKNAME,
                     	 type: "post",
                     	 data: {
                     	 	 username: function(){
                     	 	 	return $("#registerInputName").val();
                     	 	 }
                     	 }
                     } 
               },
               registerInputPassword : {
                     required: true,
                     rangelength: [6,12]
               },
               registerInputPassword2 : {
                     required: true,
                     rangelength: [6,12],
                     equalTo: "#registerInputPassword"
               },
               registerInputCode : {
                     remote : {
                       url : CHECKCOUPON,
                       type: "post",
                       data: {
                         usercoupon: function(){
                          return $("#registerInputCode").val();
                         }
                       }
                     } 
               }
           },
           messages : {
               registerInputEmail : {
                     required: "请输入电子邮箱地址",
                     email: "请输入正确的电子邮箱地址",
                     remote: "邮箱已经被注册"  
               },
               registerInputName : {
                     required: "请输入用户名",
                     rangelength: "用户名长度为4-12位",
                     remote: "用户名已经被使用"
               },
               registerInputPassword : {
                     required: "请输入账号密码",
                     rangelength: "密码长度为6-12位"
               },
               registerInputPassword2 : {
                     required: "请再次确认账号密码",
                     rangelength: "密码长度为6-12位",
                     equalTo: "再次输入密码不相同"
               },
               registerInputCode : {
                     remote : "优惠券已过期" 
               }
           },  
           submitHandler : function(form){      
                $.cookie('registerInputEmail', $registerInputEmail.val());
                $.cookie('registerInputName', $registerInputName.val());


               $(form).submit();        
           }
      })    

})