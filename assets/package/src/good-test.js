define(function (require,exports,module){
	  var $ = require("jquery");
      var goods =  require("./goods.json")["ClassList"];
      var cityselect = require("cityselect");
      
      // 数据处理 解析原来老的数据 构成新数据

      var newGoods = []; 
      
      for (var i = 0; i < 13; i++) {
           newGoods.push(goods[i]);
      };
      
      
      var abb = [];  
      for (var n = 0; n < newGoods.length; n++) {              
           var productData = newGoods[n]["product_classification_next"];  

              
           var cbb = []; 
           for (var m = 0; m < productData.length; m++) {
           	        var cc = {
						"Id": productData[m]["Id"],
						"n": productData[m]["ClassName"],
						"ClassSubId": productData[m]["ClassSubId"],
						"ClassLevel": productData[m]["ClassLevel"],
						"ClassMoney": productData[m]["ClassMoney"]
           	        }
           	        cbb.push(cc);
           };

           var bb = {  "c" : cbb,
                       "Id": newGoods[n]["Id"],
                       "p": newGoods[n]["ClassName"],
                       "ClassSubId": newGoods[n]["ClassSubId"],
                       "ClassLevel": newGoods[n]["ClassLevel"],
                       "ClassMoney": newGoods[n]["ClassMoney"]
           };



      	   abb.push(bb);
      };


      // var default_ = {"citylist" : [{
      // 	  "c" : [{
      // 	          "n": "恩施土家族苗族自治州"
      // 	         },
      // 	         {
      // 	          "n": "恩施土家族苗族自治州1"
      // 	         },
      // 	         {
      // 	          "n": "恩施土家族苗族自治州2"
      // 	         }
      // 	   ],
      // 	   "p" : "服装鞋帽" 
      // }] };

      // console.log(default_)

      var aabb = { "citylist" : abb }  


      $("#addCity").citySelect({
      	    url : aabb,
            prov: "",
            city: ""
      });
      

      console.log(aabb)

      console.log(JSON.stringify(aabb))

})