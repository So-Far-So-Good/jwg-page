define(function (require,exports,module){
       var $ = require("jquery"),
           validate = require("validate"),
           cookie = require("cookie");
           require("bootstrap");
       
       var $loginInputEmail = $("#loginInputEmail"), 
           $loginInputPassword = $("#loginInputPassword"),

           email = $.cookie('loginInputEmail') || "", 
           login = $.cookie('loginInputPassword') || ""; 
       
       if(email){
       	  $loginInputEmail.val(email)
       }

       if(login){
       	  $loginInputPassword.val(login)
       }

       if( email && login ){
          $("#loginRemember").attr("checked",true);
       }

       if($("#loginError").length){
       	  setTimeout(function(){
             $("#loginError").alert('close');
       	  },3000)
       }

       $("#loginForm").validate({
       	    rules : {
               loginInputEmail : {
                     required: true,
                     email: true 
               },
               loginInputPassword : { 
                     required: true
               }     
       	    },
       	    messages : {
       	       loginInputEmail : {
                     required: "请输入电子邮箱地址",
                     email: "请输入正确的电子邮箱地址" 
               },
               loginInputPassword : { 
                     required: "登陆密码不能为空"
               }
       	    },
       	    submitHandler : function(form){
               
               if($("#loginRemember").is(':checked')){
                    $.cookie('loginInputEmail', $loginInputEmail.val(), { expires: 7 });
                    $.cookie('loginInputPassword', $loginInputPassword.val(), { expires: 7 });
               }else{
               	    $.cookie('loginInputEmail', null);
                    $.cookie('loginInputPassword', null);
               }

               $(form).submit();                 
       	    }
       })


       // 忘记密码
       $("#forget").on("click",function(){
            $("#findPassword").modal();
       })  
})