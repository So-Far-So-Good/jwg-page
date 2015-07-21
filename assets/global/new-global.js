define(function (require,exports,module){
      var $ = require("jquery"),
          i18n = require("i18next");

      var Global = exports;
      

      // 国际化  
      Global.I18N = {
      	getSelf : function(){
            return i18n; 
      	},
		getLanguage: function() {
			if (navigator.language) {
				var language = navigator.language;
			} else {
				var language = navigator.browserLanguage;
			}
			return language;
		},
		localize: function(lng) {
			var deferred = i18n.init({
				lng: lng || 'zh-CN', //翻译成的语言
				load: 'current', //加载当前设置的语言包
				getAsync: false, //是否异步调用语言包
				cookieName: 'i18n', //cookie的名称
				preload: ['zh-CN', 'en-US'], //预加载语言包
				fallbackLng: ['zh-CN', 'en-US'], //如果没有设置，则默认为“开发”。如果打开，所有丢失的键/值将被翻译成该语言。
				resGetPath: '/i18n/__lng__/__ns__.json', // 加载资源的路径
				ns: {
					namespaces: ['text'],
					defaultNs: 'text'
				}, //加载的语言包
				useLocalStorage: false, //是否将语言包存储在localstorage
				localStorageExpirationTime: 86400000 // 有效周期，单位ms。默认1周
			});
			return deferred;
		}
      }

})