var gulp = require('gulp');
var path = require('path');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var comments = require('postcss-discard-comments');   //清除压缩文件注释
var cssnext = require("postcss-cssnext");

var header = require('gulp-header');   //css header add  desc
var cssnano = require('gulp-cssnano');  //css 压缩文件
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var pkg = require('./package.json');

// console.log(__dirname);

gulp.task('style', function() {
    var version = [
        '/*!',
        ' * QUI v<%= pkg.version %> (<%= pkg.author %>)',
        ' * Copyright <%= new Date().getFullYear() %> ',
        ' * Licensed under the <%= pkg.license %> license',
        ' */',
        ''
    ].join('\n');

    return gulp.src('./style/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(postcss([
            //autoprefixer(['iOS >= 7', 'Android >= 4.1']),
            cssnext({
                browsers: [
                    "> 1%",
                    "last 2 versions",
                    "Android >= 4.0",
                    "iOS >= 7",
                    "ie >=9",
                    "opera 12"
                ],
                features: {  //对未来css的新特性转换
                    customProperties: true
                //     customProperties: {
                //         variables: {
                //             mainColor: "red",
                //             altColor: "blue"
                //         }
                //     }
                }
            }),
            comments()
        ]))
        .pipe(header(version, { pkg: pkg }))
        // .pipe(cssnano({
        //     zindex: false,
        //     safe: true
        // }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/style'));
});


gulp.task('watch', function() {
    gulp.watch('style/*', ['style']);
});


gulp.task('default', ['style', 'watch']);
