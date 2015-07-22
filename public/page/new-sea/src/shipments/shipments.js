define(function(require, exports, module) {
	var jquery = require("jquery"),
		pack = require("package"),
		isDropoff = window.isDropoff || false,
		maxInsurance = window.maxInsurance || 6000,
		volumeWeight = window.volumeWeight || 6000;

    var INFURL = "";  // 厂库选择和包裹类型选择 			


	function waybillDetails() {
		if (isDropoff) {
			// dropoff
			pack.init({
				packageData: [],
				isEditable: isDropoff,
				outputId: "#packageContainer"
			})
		} else {
			// 立即发货	 
			pack.init({
				packageData: [],
				isEditable: !isDropoff,
				outputId: "#packageContainer"
			})
		}
	}
    
    // 厂库选择和包裹类型选择
    function infChange(){
         var ww = $("input[name='warehouseRadio']:checked").val(),
             nn = $("input[name='packType']:checked").val();

          console.log("仓库选择和包裹类型选择");    

		  // $.ajax({
			// type: "get",
			// url: url,
			// dataType: "jsonp",
			// jsonp: "jsoncallback",
			// data: data,
			// success: function(json) {
			// 	callback && callback(json);
			// }
		  // })
    }

    $("input[name='warehouseRadio']").on("change",function(){
          infChange();
    })

    $("input[name='packType']").on("change",function(){
    	  infChange();
    })


	// 保险计费
    $("#insurance").on("keyup focusout",function(){
    	  var self = $(this),
              val = self.val(),
              reg = /^\d*?\.?\d*?\S$/;

          if(reg.test(val)){
             if(val > maxInsurance ){
                self.val(maxInsurance); 
             }
          }else{
             self.val(""); 
          }     
    }) 


	// 包裹计费与体积计费
    var $weightFormula = $("input[name='weightFormula']"),
        $kindWeight = $("input[name='kindWeight']"),
        $wLong = $("input[name='wLong']"),
        $wWide = $("input[name='wWide']"), 
        $wHigh = $("input[name='wHigh']"),
        $billingWeight = $("input[name='billingWeight']"); 
    
    function billingWeight(){
        var weight = parseInt($kindWeight.val(),10) || 0,
            l = parseInt($wLong.val(),10) || 0,
            w = parseInt($wWide.val(),10) || 0,
            h = parseInt($wHigh.val(),10) || 0;
        
        var volume = (l*w*h)/volumeWeight; 
        
        if(weight>=volume){         
           $weightFormula[0].checked = true;

           $billingWeight.val(weight.toFixed(2));
        }else{
           $weightFormula[1].checked = true;

           var weg = (volume - weight)/2 + weight;

           $billingWeight.val(weg.toFixed(2));    
        }

        
        $("#volumeWeight").html(volume.toFixed(2)); 
    }

    $kindWeight.on("keyup focusout",function(){
    	     billingWeight();
    })

    function volume(){
         var l = $wLong.val(),
             w = $wWide.val(),
             h = $wHigh.val();
         
         if(!!(l&&w&&h)){
         	billingWeight();
         }   
    }

    $wLong.on("keyup focusout",function(){
    	     volume();
    })

    $wWide.on("keyup focusout",function(){
    	     volume();
    })

    $wHigh.on("keyup focusout",function(){
    	     volume();
    })

     
   

	$(function() {
		// 运单详情
		waybillDetails();
	})


})