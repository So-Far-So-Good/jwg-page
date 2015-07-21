define(function (require,exports,module){
      var $ = require("jquery"),
          validate = require("validate");
	      require("bootstrap");

      // 修改密码
      $("#changePassword").on('shown.bs.modal', function (e) {
          console.log(1)
	         
      })

      $("#passwordFrom").validate({
        rules: {
          inputPassword1: {
            required: true
          },
          inputPassword2: {
            required: true
          },
          inputPassword3: {
            required: true,
            equalTo: "#registerInputPassword"
          }
        },
        messages: {
          inputPassword1: {
            required: "请输入原始密码"
          },
          inputPassword2: {
            required: "请输入新的密码"
          },
          inputPassword3: {
            required: "请再次输入新的密码",
            equalTo: "请确保两次输入相同"
          }
        },
        submitHandler: function() {

        }
      })
	      
})