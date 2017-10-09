## WeUI 介绍

#### 本次讲解weui重要点：

 `如何写出优雅的css以及组件命名`
  

### 目录结构
![](https://pic.36krcnd.com/avatar/201709/30055455/yvqynz0lsvc2l154.jpeg)

<br>

<br>
### Config gulpfile 	


#### gulp实现原理（基于node文件流实现）

1、文件输入 → Gulp 插件处理 → 文件输出

<br>
`src <stream.Readable> 输出到目标可写流（writable）的源流（source stream）`
<br>
`在可读流（readable stream）上调用 stream.pipe() 方法，并在目标流向 (destinations) 中添加当前可写流 ( writable ) 时，将会在可写流上触发 'pipe' 事件。`

```

const writer = getWritableStreamSomehow();  //可写流
const reader = getReadableStreamSomehow();  //可读流
writer.on('pipe', (src) => {
  console.error('something is piping into the writer');
  assert.equal(src, reader);
});
reader.pipe(writer);

```


#### 相关工具

`postcss: PostCSS本身不是一个预处理器; 它不会转换CSS。 事实上，它本身并不多。 它提供了一个CSS解析器和一个框架，用于创建可以分析，lint，处理资源，优化，创建回退以及以其他方式转换已解析的CSS的插件`

`yargs: 命令行解析器，方便管理自定义的多个任务；`

`sourcemaps: 就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。`

`postcss-discard-comments: 清除编译后css中的注释 `
 
`gulp-header: 给文本文件头部追加内容 `

```
// using data from package.json 
gulp.task('style', function() {
    var version = [
        '/*!',
        ' * QUI v<%= pkg.version %> (<%= pkg.author %>)',
        ' * Copyright <%= new Date().getFullYear() %> ',
        ' * Licensed under the <%= pkg.license %> license',
        ' */',
        ''
    ].join('\n');

    return gulp.src('./style/*.less')
        .pipe(less())
        .pipe(postcss([autoprefixer(['iOS >= 7', 'Android >= 4.1']), comments()]))
        .pipe(header(version, { pkg: pkg }))
        // .pipe(cssnano())
        .pipe(gulp.dest('./dist/style'));
});

```


<br><br>

#### 组件栗子分析（weui-check 单选框 或者复选为例）

##### 1、WeUI组件命名借鉴 BEM（block-element-modifier）规范，形成WeUI独特的风格；

##### 2、前缀-组件名 && 前缀-组件名__修饰名

##### 3、一个组件或者dom类名称最多不超过三个；

```	
    <div class="weui-cells weui-cells_radio">

    <label class="weui-cell weui-check__label" for="x11">
        <div class="weui-cell__bd"></div>
        <div class="weui-cell__ft">
            <input type="radio" class="weui-check" name="radio1" id="x11" checked="checked">
            <span class="weui-icon-checked"></span>
        </div>
    </label>

    <label class="weui-cell weui-check__label" for="x12">
        <div class="weui-cell__bd"></div>
        <div class="weui-cell__ft">
            <input type="radio" class="weui-check" name="radio1" id="x12">
            <span class="weui-icon-checked"></span>
        </div>
    </label>
</div>
```

##### 3、 css技巧

label 与 input 关联绑定
```
    <label class="weui-cell weui-check__label" for="x11">
        <div class="weui-cell__bd"></div>
        <div class="weui-cell__ft">
            <input type="radio" class="weui-check" name="radio1" id="x11" checked="checked">
            <span class="weui-icon-checked"></span>
        </div>
    </label>
     
```

less

```
.weui-check {
    // radio
    .weui-cells_radio & {
        &:checked {
            & + .weui-icon-checked {
                &:before {
                    display: block;
                    content: '\EA08';
                    color: #09BB07;
                    font-size: 16px;
                }
            }
        }
    }
}
```

编译后的css

```
    .weui-cells_radio .weui-check:checked + .weui-icon-checked:before {
        display:block;
        content:'\EA08';
        color:#09BB07;
        font-size:16px;
    } 
```



##### 4、巧用相邻兄弟选择器， 
###### 优点: 减少类名称，保证保证 dome 简洁


`<div class="weui-cells__title">复选列表项</div>`

`<div class="weui-cells weui-cells_radio"></div>`


```	
.weui-cells__title{
    margin-top: .77em;
  
   
    & + .weui-cells {
        margin-top: 0;
    }
}

```


## 参考文献


- [Web 前端规范文档](http://alloyteam.github.io/CodeGuide/) -腾讯AlloyTeam
- [An Introduction to PostCSS](https://www.sitepoint.com/an-introduction-to-postcss/) -Postcss
- [postcss-cssnext](http://cssnext.io/usage/) -postcss-cssnext








