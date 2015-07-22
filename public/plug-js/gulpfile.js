var gulp = require('gulp'),
    gutil = require('gulp-util');
	gulpLoadPlugins = require('gulp-load-plugins'),
	plugins = gulpLoadPlugins();

var pkg = require('./package.json');

var banner = ['/**',
	' * <%= pkg.name %> - <%= pkg.description %>',
	' * @version v<%= pkg.version %>',
	' * @link <%= pkg.homepage %>',
	' * @time <%= new Date() %>',
	' */',
	''
].join('\n');


var config = {
	mangle: {
		except: ['define', 'require', 'module', 'exports']
	},
	compress: false
};

//测试
//css
gulp.task('css', function() {
	gulp.src(['../plug-js/**/*.css','!gulpfile.js','!package.json','!node_modules/**'])
	    .pipe(plugins.minifyCss()) //压缩css  
		.pipe(gulp.dest('../locality-dist/plug-js'))
})

//js
gulp.task('js', function() {
	gulp.src(['../plug-js/**/*.js','!gulpfile.js','!package.json','!node_modules/**'])
		.pipe(plugins.jshint()) // 检查脚本
		.pipe(plugins.uglify(config)) // 压缩js
		.pipe(gulp.dest('../locality-dist/plug-js'))
})

//上传
gulp.task('test',['css','js'],function() {
    gulp.src('../locality-dist/plug-js/**/*.+(js|css)')
        .pipe(plugins.header(banner, { pkg : pkg } )) 
        .pipe(plugins.sftp({         // ftp 上传
            host: '192.168.1.120',
            port: '8922',
            user: 'dev',
            pass: '!@#123qwe',
            remotePath: '/quote/plug-js/'
        }))  
        .pipe(gutil.noop())   
})


//正式    
gulp.task('deploy',['css','js'],function() {

})