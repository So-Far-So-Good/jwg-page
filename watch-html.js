// var express = require('express');
// var path = require('path');
// var app = express();

// app.use(express.static(path.join(__dirname, '')));

// // app.get('/', function(req, res){
// //   res.send('hello world');
// // });

// app.listen(8080);


//开启xtpl对express的适配
var xtpl = require('xtpl');
xtpl.__express = xtpl.renderFile;

//配置http服务
var http = require('http');
var express = require('express');
var path = require('path');
var app = require('express')();
server = http.createServer(app);
app.set('views', './views');
app.set('view engine', 'xtpl');
app.set('port', 8080);

/*-- 链接成功 --*/
server.listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});

/*-- 静态样式 --*/
app.use(express.static(path.join(__dirname, 'public')));

/*-- 页面请求 --*/
app.get('/page-list',function(req, res){
    res.render('page-list');
});

app.get('/index',function(req, res){
    res.render('index',{data:'1'});
});

app.get('/userIndex',function(req, res){
    res.render('userIndex',{data:'1'});
});

/*-- 404 --*/
app.get('*',function(req,res){
    res.render('404');
})

