# css-style-guideline

### 做项目的一些总结，把一些个人觉比较重要的归纳出来，后续完善，有不足之处，欢迎各位大侠提出更好建议！
<br>
<br>

### 用更合理的方式写css


### [CSS :](#css)

##### [BEM命名](#bem)

##### [换行](#Wrap)

##### [缩进](#soft-tab)

##### [ID选择器](#id-selectors)

##### [!important](#important)
<br>
<br>

### [Less相关](#less)

##### [代码组织](#lessFormat)

##### [@import 语句](#import)

##### [混入(Mixin)](#Mixin)


<br>
<br>

### [关于我们](#about)

<br>
<br>
<a name="css"></a>
### CSS


<a name="bem"></a>
### 1、BEM命名（存在争议 团队决定）

**[BEM Document](http://https://en.bem.info/methodology/key-concepts/)**， “Block-Element--Modifier”，是一种用于 HTML 和 CSS 类名的_`命名约定` 。

#####  BEM代表:  “块（block）,  元素（element）, 修饰符（modifier）”**。

##### 公共组件中添加前缀 : **qui-block-element--modifier**

  -  "-" 中划线 ：仅作为连字符使用，表示某个块与子元素以及修饰符之间的连接记号。


<br>
**示例**

```html

<article class="listing-card listing-card-featured">

  <h1 class="listing-card-title"> BEM </h1>

  <div class="listing-card-content">
    <p class=listing-card-brief></p>
  </div>

</article>
```


```less

.listing-card{

	&--title{
		//...
	}

	&--content{

	}

	&--brief{

	}

}

```

#####  BEM解决的问题；

```
	 各模块更独立、耦合性几乎为零；

	 缺点: 类名称会过长，不太美观

```




<br>
<a name="wrap"></a>
### 换行

* `为了css可读性， 每一个类或者元素的区块样式结束，建议换行增加文件的可读性`

<br>
<br>
**Bad**

```css

.element{color: red; background-color: black;}

element, .dialog {
    color:#ccc;
	p{
		font-szie:12px;
	}
}

```


**Good**

```css

.element{
	color: red;
	background-color: black;
}


 element,
.dialog {
	color:#ccc;

	p{
   		font-szie:12px;
	}
}

```


<br>
<a name="soft-tab"></a>
### 缩进

* 使用soft tab（使用tab缩进, 各IDE需要设置tab size设置为:4)

**Bad**

```css

.element {
 position: absolute;
 top: 10px;
 left: 10px;
}
```

**Good**

```css

.element {
	position: absolute;
	top: 10px;
	left: 10px;
}

```


<br>
<a name="id-selectors"></a>
### ID选择器

* `在 CSS 中，虽然可以通过 ID 选择元素，ID 选择器给你的规则声明带来了不必要的高优先级，而且 ID 选择器是不可重用的, 避免CSS中使用ID选择器`

* `less 代码库中尽量使用类名，避免使用标签名`




<br>
<a name="less"></a>
## Less相关


<br>
<a name="lessFormat"></a>
### 样式组织


**less 按如下形式按顺序组织**

1. `@import`
2. 变量声明
3. 样式声明


**Bad**

```less

@default-text-color: #333;
@default-color: #fff;

@import "est/all.less";

.page {
    width: 960px;
    margin: 0 auto;
}
```

**Good**

```less

@import "est/all.less";

@default-text-color: #333;
@default-color: #fff;

.page {
    width: 960px;
    margin: 0 auto;
}


```


<br>
<a name="import"></a>
#### @import 语句

* `@import` 语句引用的文件*必须*写在一对引号内，`.less` 后缀*不得*）省略（与引入 CSS 文件时的路径格式一致）。引号使用 `'` 和 `"` 均可，但在同一项目内*必须*统一。


**Bad**

```less

@import 'est/all';
@import "my/mixins.less";

```


**Good**

```less

@import "est/all.less";
@import "my/mixins.less";

```

<br>
<a name="Mixin"></a>
### 混入（Mixin）

* `在定义 mixin时，如果 mixin 名称不是一个需要使用的 className，必须加上括号，否则即使不被调用也会输出到 CSS中 `

* `如果混入的是本身不输出内容的 mixin，必须在 mixin 后添加括号（即使不传参数），以区分这是否是一个 className（修改以后是否会影响 HTML）`

<br>
**Bad**


```less

.big-text {
    font-size: 2em;
}

h3 {
    .big-text;
}
```


**Good**

```less

.big-text() {
    font-size: 2em;
}

h3 {
    .big-text();
}
```


<br>
<br>

### 一群爱学习，爱分享，爱装逼，爱斗图，爱吃辣条，有梦想的年轻人  、、、
<br>

![](https://thumb.qschou.com/files/qschou.com/avatar/204/6c210497-e489-4117-8614-88eb792aaff8/7877976658ac0b5a5f97aafb4b685ee37cf7307ch5.jpg)


