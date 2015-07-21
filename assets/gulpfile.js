var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	plugins = gulpLoadPlugins();

gulp.task('hbs', function(){
  gulp.src('./package/src/templates/package.hbs')
    .pipe(plugins.handlebars())
    .pipe(plugins.wrap('define(function(){return Handlebars.template(<%= contents %>)});'))
    .pipe(plugins.rename('package-templates.js')) 
    .pipe(gulp.dest('./package/src/templates/'));
});

gulp.task('hbs2', function(){
  gulp.src('./package/src/templates/addPackage.hbs')
    .pipe(plugins.handlebars())
    .pipe(plugins.wrap('define(function(){return Handlebars.template(<%= contents %>)});'))
    .pipe(plugins.rename('addPackage-templates.js')) 
    .pipe(gulp.dest('./package/src/templates/'));
});