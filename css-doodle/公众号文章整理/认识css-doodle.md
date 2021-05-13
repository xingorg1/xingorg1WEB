# &lt;css-doodle />
一个用CSS绘制各种图案的web component标签

## 创始人相关链接
创始人主页：https://yuanchuan.dev/

创始人社交网站：https://observablehq.com/@yuanchuan

创始人编码主页：https://codepen.io/yuanchuan/

创始人Github：https://github.com/yuanchuan

css-coodle 代码库：https://github.com/css-doodle

## 介绍

[&lt;css-doodle /&gt;](https://css-doodle.com/) 是一个基于 [Shadow DOM v1](https://developers.google.com/web/fundamentals/web-components/shadowdom) 和 [Custom Elements v1](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements)构建的[Web Component](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)。

你可以在不使用[polyfills](https://www.digitalocean.com/community/tutorials/web-components-polyfills-transpilation)的情况下，在任何主流浏览器（Chrome、Firefox、Safari）上使用它。

## 特效
TODO:郭菊锋：把特效合集的地址贴这里。
TODO:郭菊锋：贴图几张画的很好看的照片、GIF在这里

## 安装/引用和使用

### cdn 引用：
https://unpkg.com/css-doodle@0.15.3/css-doodle.min.js

```js
<script src="https://unpkg.com/css-doodle@0.15.3/css-doodle.min.js"></script>
```

### npm 引用：
```bash
npm install css-doodle
``` 
使用：直接在主js文件中将css-doodle引入即可
```js
import 'css-doodle';
```

## 语法

css-doodle 的语法基于 `CSS`，并提供了一些额外的实用程序功能（utility functions）和速记属性（shorthand properties）。

语法大致可以分为以下五类，每一类下都有对应的API可以用：

- **`Attributes` 特性**：grid，use，seed
- **`Selectors`选择器**：:doodle，:container，@nth，@even，@odd，@at，@random，@row，@col
- **`Properties` 属性**：@grid，@use，@size, @min-size, @max-size，@place-cell，@shape
- **`Functions` 方法**：@index，@row，@col，@size-row，@size-col，@size，@pick，@pick-n，@pick-d，@rand，@last-\\*，@repeat，@multiple，@n,nx,ny,N，@stripe，**@svg**，@&lt;Math>，@calc，@var，@hex，**@doodle**，**@shaders**，@shape
- **`JS API` API 接口**：grid，use，seed，update，export

> 有一些是0.15以后的版本新增的API，比如@doodle、@shaders。作者也一直在更新增加功能更强大的API

接下来会详细整理一下每个API的作用和实例。最后会抽象归纳一张表格来简洁地概括下每个API。

## 各API详细介绍

如上所说，语法总共分为五大类。我们先来详细看一遍他的语法，在梳理过程中每一个语法都会配备demo实例、使用技巧和坑点等。

因为语法基于CSS，所以对于工作一两年了解过canvas、svg等语法的开发者来说，基本上没啥成本。所以前边的细节文档如果嫌啰嗦，可以拉到最后看所有语法的一览总结表。

另外，我将尽量按照官方文档的顺序先来介绍相关的API。这样大家在看到不明白或者有问题的地方，也可以去官方文档的对应顺序里求正解。

TODO:郭菊锋：把分文章拼接到这里
1. Attributes
1. Selectors
1. Properties
1. Functions
1. JS API
1. 其他

## 各API总结一览表
TODO:郭菊锋：把「总笔记」里的一览表整理过来

## 引申
要画好画，还要学的有：
- SVG
    - &lt;foreignObject>
- Unicode
    - \u则代表unicode编码，是一个字符；
    - 0x开头代表十六进制，实际上就是一个整数；
    - \x对应的是UTF-8编码的数据，通过转化规则可以转换为Unicode编码，就能得到对应的汉字，转换规则很简单，先将\x去掉，转换为数字;
- Hex
- ASCLL
- 数学函数等各种编码
- GLSL（OpenGL的语言）
- C语言
- WebGL