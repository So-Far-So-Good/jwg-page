define(function(require, exports, module) {
    var $ = require("jquery"),
        global = require("global"),
        pagination = require("pagination");

        require("bootstrap");
    
    if (navigator.language) {
        var language = navigator.language;
    } else {
        var language = navigator.browserLanguage;
    }
  
    // console.log(language)

     
    // console.log(i18n)
   
    // require("properties");

    require("datetime");

    // 弹出框
    //$('#myModal').modal()

    $(function() {
        $('[data-toggle="tooltip"]').tooltip();

        $('[data-toggle="popover"]').popover()

        $('#myButton').on('click', function() {
            var $btn = $(this).button('loading')
                // business logic...
            $btn.button('reset')
        })

    })

    $("#thisPagination").bs_pagination({
        showGoToPage: false,
        showRowsPerPage: false,
        showRowsInfo: false,
        visiblePageLinks: 10,
        navListContainerClass: "col-xs-24",
        onChangePage: function(event, data) {
            //

            // console.log(event) 
            // console.log(data)    
        },
        onLoad: function(event, data) {
            // 进入页面先调用接口
            // 当前页 每页显示 一共多少页 

            // console.log(event) 
            // console.log(data)   
        }
    })


    // 时间
    $('.form_datetime').datetimepicker({
        //language:  'fr',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
    $('.form_date').datetimepicker({
        language: 'fr',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $('.form_time').datetimepicker({
        language: 'fr',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });

    // $.i18n.properties({
    //     name : 'test',
    //     path : '../../i18n/',
    //     mode : 'map',
    //     callback : function(){
    //         console.log($.i18n.prop('string_username'))
    //     }  
    // })


    $(function(){
       global.I18N.localize().done(function() {
            $('#thisIs').i18n(function(t){
               
            });
        });

       console.log(global.I18N.getLanguage());
       console.log(global.I18N.getSelf().t("test.title"));  // 有延时需要特殊处理  
    }) 
    
    $("#chinese").click(function(){
        global.I18N.localize('zh-CN').done(function() {
            $('#thisIs').i18n();
        }); 
    }) 

    $("#english").click(function(){
        global.I18N.localize('en-US').done(function() {
            $('#thisIs').i18n();
        });
    }) 

    // console.log($.t("test.title"))
    // global.I18N.localize('zh-CN').done(function() {
    //     console.log(i18n.t("test.title"))
    // })
})