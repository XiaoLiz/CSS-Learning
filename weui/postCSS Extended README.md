###  PostCSS

`PostCSS: PostCSS 本身不是一个预处理器; 它不会转换CSS。 事实上，它本身并不多。 它提供了一个CSS解析器和一个框架，用于创建可以分析，lint，处理资源，优化，创建回退以及以其他方式转换已解析的CSS的插件`



####  Autoprefixer

在gulp中，可以使用 AutoPrefixer官网 推荐的 postcss + autoprefixer两个插件的组合，也可以通过gulp-autoprefixer这一个插件。

cssnext 中已经包含了对 Autoprefixer 的使用，因此使用了 cssnext 就不再需要使用 Autoprefixer
(同时使用的时候，会提示报错！)


##### postcss + autoprefixer

```
    var postcss = require('gulp-postcss');
    var autoprefixer = require('autoprefixer');
    
    gulp.task('autoprefixer', function () { 
        return gulp.src('./src/*.css')
            .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
            .pipe(gulp.dest('./dest'));
    });    
```


####  postcss-cssnext   

`postcss-cssnext: cssnext 插件允许开发人员在当前的项目中使用 CSS 将来版本中可能会加入的新特性。cssnext 负责把这些新特性转译成当前浏览器中可以使用的语法。`

`cssnano: 优化范围从压缩颜色和删除注释到丢弃覆盖的规则`


```
    var postcss = require('gulp-postcss');
    var autoprefixer = require('autoprefixer');
    
    gulp.task('style:build', function () { 
          return gulp.src('./style/main.less')
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
                        ]
                    }),
                    comments()
                ]))
                .pipe(cssnano({
                    zindex: false,
                    autoprefixer: false，
                    //safe: true
                }))
                .pipe(gulp.dest('./dist/style'));
            .pipe(gulp.dest('./dest'));
    });    
```

#### gulp-cssnano:  

`优化范围从压缩颜色和删除注释到丢弃覆盖的规则，归一化unicode范围描述符，甚至调整渐变参数以获得较小的输出值！ 另外，在转换的过程中，我们添加了Browserslist以提供不同的输出。`
`配置： 参考上一个栗子`



####  原生CSS 自定义属性和变量:

use:
```
    :root {
        --text-color: black;
    }
     
    body {
        color: var(--text-color);
    }
```

cssnext 转换后：
```
    body {
        color: black;
    }
```



#### 参考资料

- [CSS自定义属性](https://translate.googleusercontent.com/translate_c?act=url&depth=1&hl=zh-TW&ie=UTF8&prev=_t&rurl=translate.google.com&sl=en&sp=nmt4&tl=zh-CN&u=https://www.w3.org/TR/css-variables/&usg=ALkJrhguoKf-Rg4ulvMxYNd-uUr2bGrfCg)-W3C.Org
