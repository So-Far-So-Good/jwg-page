define(function (require,exports,module){
      var $ = require("jquery"),
          pack = require("package");
      
      



      
      // 快件追踪号
      var $fastFreightError = $("#fastFreight-error");

      function showf(error){
          $fastFreightError.html(error);
          $fastFreightError.show(); 
      }

      function hidef(){
          $fastFreightError.hide();
      }
      
	  function validationWay() {
         var type = $("#waybillType").val(),
              val = $("#fastFreight").val();  

		// UPS   trim掉，一共18位，以  1Z 开头 （1Z注意大小写都匹配）
		if (type == 2) {
			var reg = /^1[zZ].{16}$/;

			if (!reg.test(val)) {
				showf("UPS运单号需要以1Z开头,一共需要18位");
			}

			return
		}

		// ONTRAC  必须15位（我后面不在说去掉空格之类了，你自己操作），并且以C 或者D开始（ 大小写我后面也不说了）
		if (type == 3) {
			var reg = /^[cCdD].{14}$/;

			if (!reg.test(val)) {
				showf("ONTRAC运单号需要C或D开头，一共需要15位");
			}

			return
		}

		// FedEx  34位或者32位或者22位
		if (type == 5) {
			var reg = /^(.{12}|.{14}|.{15}|.{22}|.{32}|.{34})$/;

			if (!reg.test(val)) {
				showf("FedEx运单号需要12,14,15,22,32或34位");
			}

			return
		}

		// USPS 22位或者26位 30位或者34位
		if (type == 4) {
			var reg = /^(.{22}|.{26}|.{30}|.{34})$/;

			if (!reg.test(val)) {
				showf("USPS运单号需要22,26,30或34位");
			}

			return
		}
        
        // json验证是否重复
        // ......................

		hidef();
	  }


      $("#fastFreight").on("keyup focusout",function(){
             validationWay();                  
      })


      $("#waybillType").on("change",function(){
      	     validationWay();
      }) 

   
      // 构建商品
      pack.init({
           outputId : "#packageContainer"
      }) 

          
})