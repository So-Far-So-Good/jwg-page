define(function (require,exports,module){
    var $ = require("jquery");
        require("bootstrap");
        
      
      function loading(id_){
      	 var self = $("#"+id_);
         if(!!self.has("textarea").length){

         	var cont = self.find("textarea").text();
         	    self.find("textarea").remove();
         	    self.find(".markdown").html(cont);                
         }
      }


      $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

      	   $("#helpNav").find("a").removeClass("selected");
           $(this).addClass("selected");
            
           var id = $(this).data("id");
           loading(id);
           
      })

})