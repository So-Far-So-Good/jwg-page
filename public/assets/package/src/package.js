/*  包裹(package)
 *   
 */

define(function (require,exports,module){
      var $ = require("jquery");
          cookie = require("cookie"),
          cityselect = require("cityselect"),
          newGood = require("./newGood.json"),
          handlebars = require("handlebars");

      var packageTemplates = require("./templates/package-templates.js"),
          addPackageTemplates = require("./templates/addPackage-templates.js");

          require("bootstrap");

      var pack = exports;
      
      var PACKDATA = {
      	  packageData : [],
      	  outputId : "#packageContainer",
          template : packageTemplates,
          addCommodity : "#addCommodity",
          deleteRow : ".delete-row",
          packageList : "#packageList",
          isEditable : true   
      }
      

      // 构建页面
      function buildHtml(template,callback){
          $(PACKDATA.outputId).html(template);

          callback();
      }

      // 添加产品 
      function addCommodity(){
          $(PACKDATA.addCommodity).on("click",function(){
              var length = $(PACKDATA.packageList).find(".package-item").length;

             if(length > 20) {
                alert("已经不能再添加更多了"); 
             } else {
                $(PACKDATA.packageList).append(addPackageTemplates);               
             } 
                      
          })
      }

      // 删除产品
      function deleteRow(){
          $("body").on("click",PACKDATA.deleteRow,function(){
              var length = $(PACKDATA.packageList).find(".package-item").length;

              if(length <= 1){
                 alert("已经不能再删除了");
              } else {
                 $(this).parent().parent().remove();    
              }
          }) 
      }
      
      // 验证 
      var verify = {
          "GoodName" : function(this_){
               var val = this_.val(),
                   reg = /[\u4E00-\u9FA5]/,  // 存在中午就通过
                   error = "";

               if(reg.test(val)){
                  hideLabel(this_);

                  return 
               }else{
                  error = "物品名称必须包含中文";                  
               }

               showLabel(this_,error);                 
          },
          "GoodDescribe" : function(this_){
              var val = this_.val(),
                  reg = /^.{0,50}$/,   // 长度不超过50
                  error = ""; 

               if(reg.test(val)){
                  hideLabel(this_);

                  return 
               }else{
                  error = "物品描述过长（50字以内）";                  
               }

               showLabel(this_,error);    
          },
          "GoodClasses" : function(this_){
                hideLabel(this_); 
          },
          "GoodBrand" : function(this_){
               var val = this_.val(),
                   reg = /^[^\u4e00-\u9fa5]+$/,   // 不能输入中文
                   error = ""; 

               if(reg.test(val)){
                  hideLabel(this_);

                  return 
               }else{
                  error = "品牌不能输入中文";                  
               }

               showLabel(this_,error); 
          },
          "GoodPrice" : function(this_){
               var val = this_.val(),
                   reg = /^\d*?\.?\d*?\S$/,   // 价格不能输入负数
                   error = "";    
               
               if(reg.test(val)){
                  hideLabel(this_);

                  return 
               }else{
                  error = "价格填写不正确";                  
               }

               showLabel(this_,error); 
          },
          "GoodQuantity" : function(this_){
               var val = this_.val(),
                   reg = /^[^-]?\d+$/,   // 必须是正整数
                   error = ""; 

               if(reg.test(val)){
                  hideLabel(this_);

                  return 
               }else{
                  error = "数量填写不正确";                  
               }

               showLabel(this_,error); 
          }
      }
      
      // 不能为空
      var verifyEmpty = {
          "GoodName" : function(this_){
               var val = this_.val(),
                   error = "名称不能为空";

               if( val == "" ){
                   showLabel(this_,error);  
               } 
          },
          "GoodClasses" : function(this_){
               var val = this_.val(),
                   error = "类别不能为空";
               
               if( val == "" ){
                   showLabel(this_,error);  
               } 
          },
          "GoodBrand" : function(this_){
               var val = this_.val(),
                   error = "品牌不能为空";

               if( val == "" ){
                   showLabel(this_,error);  
               }    
          },
          "GoodPrice" : function(this_){
               var val = this_.val(),
                   error = "单价不能为空";

               if( val == "" ){
                   showLabel(this_,error);  
               }    
          },
          "GoodQuantity" : function(this_){
               var val = this_.val(),
                   error = "数量不能为空";

               if( val == "" ){
                   showLabel(this_,error);  
               }    
          }
      } 
      
      function showLabel(this_ ,error){
          if( !!this_.parent().find("#GoodClasses-error").length ){
             this_.parent().find("#GoodClasses-error").html(error);  
          }else{
             var  html = '<p id="GoodClasses-error" class="sea-error">'+error+'</p>';
             this_.after(html);
          }
      }

      function hideLabel(this_){
          if( !!this_.parent().find("#GoodClasses-error").length ){
              this_.parent().find("#GoodClasses-error").remove(); 
          }   
      }
      

      //  输入格式正确验证
      function validation(){

          // 物品名称
          $(PACKDATA.packageList).on("keyup focusout","input[name='GoodName']",function(){
                  var self = $(this);
                      verify["GoodName"](self);
          })

          // 描述
          $(PACKDATA.packageList).on("keyup focusout","input[name='GoodDescribe']",function(){
                  var self = $(this);
                      verify["GoodDescribe"](self);
          }) 

          // 类别
          $(PACKDATA.packageList).on("focusout","input[name='GoodClasses']",function(){
                  var self = $(this);
                      verify["GoodClasses"](self);
          })

          // 品牌
          $(PACKDATA.packageList).on("keyup focusout","input[name='GoodBrand']",function(){
                  var self = $(this);
                      verify["GoodBrand"](self);  
          })

          // 单价
          $(PACKDATA.packageList).on("keyup focusout","input[name='GoodPrice']",function(){
                  var self = $(this);
                      verify["GoodPrice"](self); 
          })

          // 物品数量 
          $(PACKDATA.packageList).on("keyup focusout","input[name='GoodQuantity']",function(){
                  var self = $(this);
                      verify["GoodQuantity"](self); 
          })         
          
      }

      // 为空验证
      function validationEmpty(){
          $(PACKDATA.packageList).find("input[name='GoodName']").each(function(){
                 var self = $(this);
                     verifyEmpty["GoodName"](self);
          })

          $(PACKDATA.packageList).find("input[name='GoodClasses']").each(function(){
                 var self = $(this);
                     verifyEmpty["GoodClasses"](self);
          })

          $(PACKDATA.packageList).find("input[name='GoodBrand']").each(function(){
                 var self = $(this);
                     verifyEmpty["GoodBrand"](self);
          })

          $(PACKDATA.packageList).find("input[name='GoodPrice']").each(function(){
                 var self = $(this);
                     verifyEmpty["GoodPrice"](self);
          })

          $(PACKDATA.packageList).find("input[name='GoodQuantity']").each(function(){
                 var self = $(this);
                     verifyEmpty["GoodQuantity"](self);
          })
      }


           
      // 类别
      function category(){
           var $pop =$('#addCategory'),
               self = null; 

           $("body").on("click",".select-category",function(){
                      self = $(this);
                  
                  var category = self.data("category") || "";
                  
                  $pop.modal();      
                
           })

          $pop.on('show.bs.modal',function(e){
                  var caca = self.data("category"),  
                      dada = caca.split('|');

                  $("#addCategory").citySelect({
                      url : newGood,
                      prov: dada[0] || "",
                      city: dada[1] || ""
                  });                 
          })

          $pop.on('hide.bs.modal',function(e){
               var ca01 = $("#category01").val() || "",
                   ca02 = $("#category02").val() || "";
               
               var caca = ca01+"|"+ca02;

               self.val(ca02);
               self.data("category",caca); 
          }) 
      }

      

      /*------------------------------*/

      pack.init = function(options) {
        var opts = $.extend(PACKDATA, options || {});

        if(PACKDATA.isEditable){
          buildHtml(packageTemplates, function() {
            // 添加产品
            addCommodity();

            // 删除产品
            deleteRow();

            // 验证
            validation();

            // 类别
            category();

            // cookie保存
          })
        }else{
          // 不可编辑模板

          
        } 

      }

      pack.submit = function(callback) {
        var back = {
            whether : false ,
            data : []  
        }

        // 判断是否为空
        validationEmpty();

        // 判断验证是否通过
        if (!$(PACKDATA.packageList).find("#GoodClasses-error").length){
               back['whether'] = true; 

               $(PACKDATA.packageList).find(".package-item").each(function(){
                       var self = $(this);

                       var  data = {
                            "GoodName" : self.find("input[name='GoodName']").val(),
                            "GoodDescribe" : self.find("input[name='GoodDescribe']").val(),
                            "GoodClasses" : self.find("input[name='GoodClasses']").data("category"),
                            "GoodBrand" : self.find("input[name='GoodBrand']").val(),
                            "GoodPrice" : self.find("input[name='GoodPrice']").val(),
                            "GoodQuantity" : self.find("input[name='GoodQuantity']").val()
                       } 
                       back['data'].push(data);
               })
        }


        callback(back);
      }


})