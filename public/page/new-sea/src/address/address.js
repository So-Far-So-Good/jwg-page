define(function(require, exports, module) {
    var $ = require("jquery"),
        validate = require("validate"),
        cityselect = require("cityselect");

    require("bootstrap");


    // 添加收发人
    $("#addAddresser").on('shown.bs.modal', function(e) {
       console.log(123)
    })


    $("#addAddresserFrom").validate({
        rules: {
            peopleName: {
                required: true
            },
            peopleIdentity: {
                required: true,
                DetermineLength : [15,18]
            },
            identityFront: {
                required: true
            },
            identityReverse: {
                required: true
            }
        },
        messages: {
            peopleName: {
                required: "请填写你的真实姓名"
            },
            peopleIdentity: {
                required: "请填写你的身份证号码",
                DetermineLength : "请确保身份证的长度正确"
            },
            identityFront: {
                required: "请上传身份证的正面"
            },
            identityReverse: {
                required: "请上传身份证的反面"
            }
        },
        submitHandler: function(e) {
            console.log(e)
        }
    })


    // 添加发货地址
    $("#shippingAddress").on('shown.bs.modal', function(e) {
          console.log('发货地址')
    })
    
    $("#shippingAddressForm").validate({
           rules : {
              deliveryCompany : {
                
              },
              deliveryCall : {
                   required: true,
                   isMobile: true 
              },
              deliveryCountry : {
                   required: true
              },
              deliveryProvinces : {
                   required: true
              },
              deliveryCity : {
                   required: true
              },
              deliveryZipCode : {
                   required: true
              },
              deliveryEmail : {
                   required: true,
                   email: true   
              },
              deliveryAddress : {
                   required: true
              }
           },
           messages : {
              deliveryCompany : {
                   
              },
              deliveryCall : {
                   required: "请填写联系电话",
                   isMobile: "请确保手机号码输入正确"
              },
              deliveryCountry : {
                   required: "请填写国家信息"
              },
              deliveryProvinces : {
                   required: "请填写省/州信息"
              },
              deliveryCity : {
                   required: "请填写城市信息"
              },
              deliveryZipCode : {
                   required: "请填写邮政编码"
              },
              deliveryEmail : {
                   required: "请填写邮箱地址",
                   email: "请确保邮箱正确"   
              },
              deliveryAddress : {
                   required: "请填写详细地址"
              }
           },
           submitHandler : function(e){

           }
    }) 


    // 添加收货地址
    $("#receiveCountry").on("change",function(){
         var val = $(this).val();

         if (val == 0) {
             $("#addressPcd").show();
         } else {
            $("#addressPcd").hide();
         }
    })

    $("#addMyAddress").on('shown.bs.modal', function(e) {

        $("#addCity").citySelect({
            prov: "",
            city: "",
            dist: ""
        });

    })

    $("#addMyAddressForm").validate({
           rules : {
              receivePhone : {
                    required: true,
                    isMobile: true 
              },
              receiveEmail : {
                    required: true,
                    email: true 
              },
              receiveZipCode : {
                    required: true 
              },
              receiveProv : {
                    required: true
              },
              receiveCity : {
                    required: true 
              },
              receiveDist : {
                    required: true 
              },
              receiveAddress : {
                    required: true 
              }
           },
           messages : {
              receivePhone : {
                    required: "请填写联系电话",
                    isMobile: "请确保手机号码输入正确" 
              },
              receiveEmail : {
                    required: "请填写邮箱地址",
                    email: "请确保邮箱正确" 
              },
              receiveZipCode : {
                    required: "请填写邮政编码" 
              },
              receiveProv : {
                    required: "请填写省"
              },
              receiveCity : {
                    required: "请填写市" 
              },
              receiveDist : {
                    required: "请填写区" 
              },
              receiveAddress : {
                    required: "请填写详细地址" 
              }
           },
           submitHandler : function(e){
               console.log(e)
           }
    })


    // 修改收发人
    $("body").on("click",".editorsPeople",function(){
          console.log(1)
    })
    // 删除收发人
    $("body").on("click",".removePeople",function(){
          console.log(1)
    })
    
    
    // 修改发货地址 
    $("body").on("click",".editorsReceive",function(){
          console.log(1)
    })
    // 删除发货地址
    $("body").on("click",".removeReceive",function(){
          console.log(1)
    })


    // 修改收货地址
    $("body").on("click",".editorsDelivery",function(){
          console.log(1)
    })
    // 删除收货地址
    $("body").on("click",".removeDelivery",function(){
          console.log(1)
    })

    
    //添加验证法则
    $.validator.addMethod("DetermineLength",function(value,element,param){
        
        var ret = false; 

        for (var i = 0; i < param.length; i++) {
            var reg = new RegExp('^.{'+param[i]+'}$');
            
            ret = reg.test(value) || ret
        };
        

        return  ret || this.optional(element);  
    },"请确保输入内容的正确");


    // 手机号码验证    
    $.validator.addMethod("isMobile", function(value, element) {    
      var length = value.length;    
      return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value));    
    }, "请正确填写您的手机号码。");
    
})