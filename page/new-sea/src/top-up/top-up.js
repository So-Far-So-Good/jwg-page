define(function (require,exports,module){
     var $ = require("jquery"),
         validate = require("validate");

         require("bootstrap");

         
        // 网银和支付宝选择 
        $("input[name=topUpRadio]").on("click",function(){
             var val = $(this).val();

             if(val == 0 ){
               $("#allBank").show();
             } else{
               $("#allBank").hide(); 
             } 
        })

        
        $("#onlineTopUpFrom").validate({
              rules :{
                 topUpMoney : {
                      required: true,
                      number:true,
                      max: 10000,
                      min: 0
                 },
                 topUpRadio : {
                      required: true
                 },
                 topUpCode : {
                      required: true
                 }
              },
              messages : {
                 topUpMoney : {
                      required : "需要输入充值金额",
                      number : "请确保你输入的是数字",
                      max: "一次充值不能大于10000",
                      min: "不能填写小于0"
                 },
                 topUpRadio : {
                      required : "需要选择充值类型"
                 },
                 topUpCode : {
                 	  required : "需要填写验证码"
                 }
              },
              submitHandler : function(){

              }
        });
        
})