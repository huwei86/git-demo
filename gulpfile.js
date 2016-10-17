/**
 * Created by ASSU on 2016/10/14.
 */
'use strict';
var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');
var concat=require('gulp-concat');
var uglify=require("gulp-uglify");
var htmlmin=require("gulp-htmlmin");
var browsersync=require('browser-sync');
gulp.task('style',function(){
    gulp.src('src/styles/*.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browsersync.reload({stream: true}))

});
gulp.task('script',function(){
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browsersync.reload({stream: true}))
});
gulp.task("img",function(){
    gulp.src('src/images/*.*')
        .pipe(gulp.dest("dist/images"))
        .pipe(browsersync.reload({stream: true}))
});
gulp.task('html',function(){
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments:true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browsersync.reload({stream: true}))
});
gulp.task('serve', function(){
    browsersync({
        server:{
            baseDir:["dist"]
        },
    },function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
        });
    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['img']);
    gulp.watch('src/*.html',['html']);

});

