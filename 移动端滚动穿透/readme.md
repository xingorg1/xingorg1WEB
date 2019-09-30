# 滚动穿透的6中解决方案【已自测】

### 目录
1. [body无滚动 + 弹层无滚动[css-超出隐藏]](https://github.com/xingorg1/jsStudy/tree/master/移动端滚动穿透#body%E6%97%A0%E6%BB%9A%E5%8A%A8--%E5%BC%B9%E5%B1%82%E6%97%A0%E6%BB%9A%E5%8A%A8css-%E8%B6%85%E5%87%BA%E9%9A%90%E8%97%8F "body无滚动 + 弹层无滚动[css-超出隐藏]")

2. [body无滚动 + 弹层内部滚动[css-真机有bug]](#num02 "body无滚动 + 弹层内部滚动[css-真机有bug]")

3. [body滚动 + 弹层无滚动[js-阻止弹层中touchmove的默认行为]](#num03 "body滚动 + 弹层无滚动[js-阻止弹层中touchmove的默认行为]")

4. [body滚动 + 弹层内部滚动[js-检测touchmove的target]](#num04 "body滚动 + 弹层内部滚动[js-检测touchmove的target]")

5. [body滚动 + 弹层内部滚动[js-代码模拟上下滑动效果]](#num05 "body滚动 + 弹层内部滚动[js-代码模拟上下滑动效果]")

6. [body滚动 + 弹层内部滚动[css+js-记录滚动位置]](#num06 "body滚动 + 弹层内部滚动[css+js-记录滚动位置]")

7. 据说fastclick插件可以解决[我没使用]

--- 

在移动端中，如果我们使用了一个固定定位的遮罩层，且其下方的dom结构的宽度|高度超出屏幕的宽度|高度，那么即使遮罩层弹出后铺满了整个屏幕，其下方的dom结构依然可以滚动，这就是大家所说的“滚动穿透”。
而且经常是你在pc模拟器上没有问题，但是真机打开就一定会出现。

这个经典八阿哥也是面试时经常会被追问的问题。
 
接下来我网罗了网络，整理了别人说的方案和我自己的方案，一共实现了六种方法，并经过了自己手机自测。

各方法操作难易不同，分别针对弹层和body是否超出一屏可滚动等不同情况。看官可以对症下药。

### 赠送一套自定义手势滚动效果的代码哦~



<h2 id="num01">一、body无滚动 + 弹层无滚动[css-超出隐藏]</h2>

### 适用场景需满足以下条件：

	1. body最好是一屏、无滚动

	2. 虽然body内容超出一屏需滚动，但触发弹层出现的按钮在第一屏中

	3. 弹层不用滚动效果

### 解决方案：

弹层出现时，用css给body设置固定定位和超出隐藏。

### 关键代码：
```js
btn.onclick = function () {
  // 弹层出现
  layer.style.display = 'block';
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';//果然是因为加了fixed，就会自动回滚到顶部
}
var closeBtn = document.getElementById('close');
closeBtn.onclick = function () {
  // 弹层关闭
  layer.style.display = 'none';
  document.body.style.overflow = 'auto';
  document.body.style.position = 'static';
}
```
ps，我偷懒直接js控制了行间样式，但标准写法应该是给body添加类名来控制

局限问题：滚动后的body触发弹层，会使页面回滚到顶部。


### 赘述：

这个方案是简单粗暴的让```body{ overflow:hidden; position:fixed;}```

起初，我只给body一个```overflow```隐藏，弹窗出现后上下滑动，底部的body也不会滑动，瞬间感觉世界很美好。

但是晴天霹雳来的太快，在模拟器是起作用的，但是到了真机上，body还是会滚动。所以必须添加上fixed固定定位，才能在弹窗出现后，body不能被拖动。
 
但是，也因为加了```position: fixed；```出现了新问题：
它会导致触发弹层后，body回滚、定位到顶部。假如用户向下翻页了几屏后，再触发弹层，整个页面就会回滚到最初的顶部，这对用户体验来说是非常不好的。
 
因此，这种方案的适用环境也就非常局限，只能适用触发弹层出现的按钮位于第一屏中的情况。需要我们能确保用户在不发生上滑页面滚动屏幕的情况下就能触发弹层出现，就不会出现我上边说的问题。
 
或者干脆我们就是一个swiper项目，每一页都是一屏，body不能滚动，那么在项目中用这个方法，还是性价比很高的。



<h2 id="num02">二、body无滚动 + 弹层内部滚动[css-真机有bug]</h2>

### 适用场景需满足以下条件：

  1、body最好是一屏、无滚动

  2、虽然body内容超出一屏需滚动，但触发弹层出现的按钮在第一屏中
 
### 解决方案：

弹层出现时，用css给body设置固定定位和超出隐藏。

至于弹层内部的滚动，设置一个```overflow: scroll;```即可。

不过为了流畅体验，可以加上```-webkit-overflow-scrolling: touch```，以解决在IOS上滚动惯性失效的问题，提高滚动的流畅度。
 
### 关键代码：

JS控制弹窗的交互、body的禁止滚动

```js
btn.onclick = function () {
  layer.style.display = 'block';
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed'; //果然是因为加了fixed，就会自动回滚到顶部
}
var closeBtn = document.getElementById('close');
closeBtn.onclick = function () {
  layer.style.display = 'none';
  document.body.style.overflow = 'auto';
  document.body.style.position = 'static';
}
```
 
css添加弹层的超出滚动效果
```css
overflow-y: scroll;
-webkit-overflow-scrolling: touch;/* 解决在IOS上滚动惯性失效的问题 */
```

### 局限问题：

弹层中内容滚动到顶部或底部后，还会连带页面body一起滚动。也就是还会发生穿透效果。
 
### 赘述：

第一条中，我们只是在弹窗打开的时候，简单的禁止了body的滚动效果。但是限制条件是，我们的弹窗也不能滚动。这次，我们优化一下 -- 允许弹窗内部滚动。
 
在前边代码的基础上，通过css单纯的设置一下纵轴的超出滚动。

```overflow-y: scroll;```

只有这一句滚动效果不太好，没有原生滚动流畅。加一个属性```-webkit-overflow-scrolling: touch;```/* 解决在IOS上滚动惯性失效的问题 */
 
但是这只是简单地解决了一个问题：实现了滑动弹窗其他地方（蒙层背景），底部body页面确实未跟随滚动。

真正的问题是当我们滑动弹窗可滚动区域，把可滚动区域的内容上滑到底部或下拉到顶部后，再触发弹窗可滚动区域准备滑动，此时的背景页面就会跟随滚动。真是恐怖。
 
因此还需要我们对弹层的可滚动区域的滑动事件做监听：

第一种情况，若向上滑动时，到达底部；或者第二种情况，若向下滑动时，已到顶部。

这两种情况任意一种发生时，就阻止滑动事件。

### 这段逻辑代码如下：
```js
var targetY = null;
layerBox.addEventListener('touchstart', function (e) {
  //clientY-客户区坐标Y 、pageY-页面坐标Y
  targetY = Math.floor(e.targetTouches[0].clientY);
});
layerBox.addEventListener('touchmove', function (e) {
  // 检测可滚动区域的滚动事件，如果滑到了顶部或底部，阻止默认事件
  var NewTargetY = Math.floor(e.targetTouches[0].clientY),//本次移动时鼠标的位置，用于计算
    sTop = layerBox.scrollTop,//当前滚动的距离
    sH = layerBox.scrollHeight,//可滚动区域的高度
    lyBoxH = layerBox.clientHeight;//可视区域的高度
  if (sTop <= 0 && NewTargetY - targetY > 0 && '鼠标方向向下-到顶') {
    // console.log('条件1成立：下拉页面到顶');
    e.preventDefault();
  } else if (sTop >= sH - lyBoxH && NewTargetY - targetY < 0 &&
    '鼠标方向向上-到底') {
    // console.log('条件2成立：上翻页面到底');
    e.preventDefault();
  }
}, false);
```



<h2 id="num03">三、body滚动 + 弹层无滚动[js-阻止弹层中touchmove的默认行为]</h2>

### 适用场景：

  1、（适用）body可滚动

  2、（适用）触发弹层出现的按钮可以在任意位置


### 需满足以下条件：

    1、（需满足）弹层内容不需要滚动
 
### 解决方案：

当弹层出现的时候不需要再禁掉body的滚动效果了，我们可以从弹层方面入手，阻止弹框的touchmove事件的默认行为。就能阻止滚动穿透。
 
### 关键代码：

js控制弹窗的交互、弹窗的禁止滚动
```js
btn.onclick = function () {
  layer.style.display = 'block';
  layer.addEventListener('touchmove',function(e){
    e.preventDefault();
  },false);
}
var closeBtn = document.getElementById('close');
closeBtn.onclick = function () {
  layer.style.display = 'none';
    // 弹窗关闭后，可解除所有禁止 - 懒人就不写了
}
```

 
### 局限问题：

因为touchmove被禁掉了，就会造成弹窗内部所有位置都不能响应touchmove事件，效果上就是弹窗内部不能再滚动了。
 
### 赘述：

在弹层不需要超出滚动的情况下，才可以使用这个。也就是禁止整个弹窗的touchmove的默认事件，以阻止滚动穿透。

同样，如果弹层中需要滚动效果，则不能解决了。那么这时，就引来我们的主题难点，可以有以下几种思路解决：
 


<h2 id="num04">四、body滚动 + 弹层内部滚动[js-检测touchmove的target]</h2>

简单粗暴，一针见血：谁能动谁动，谁不能动就禁止touchmove事件的preventEvent默认行为。
 
### 适用以下场景：

    1、body可滚动

    2、触发弹层出现的按钮可以在任意位置
    
    3、弹层可以滚动

### 简单来说，就是适用任何场景
 
### 解决方案：

检测touchmove事件，如果touch的目标是弹窗不可滚动区域（背景蒙层）就禁掉默认事件，反之就不做控制。
 
但是同样的问题是，需要判断滚动到顶部和滚动到底部的时候禁止滚动。否则，就和第二条一样，触碰到上下两端，弹窗可滚动区域的滚动条到了顶部或者底部，依旧穿透到body，使得body跟随弹窗滚动。
 
所以依旧需要同样的代码，对可滚动区域的touchmove做监听：若到顶或到底，同样阻止默认事件。
 
### 需要做的事情有：

1、预存一个全局变量targetY

2、监听可滚动区域的```touchstart```事件，记录下第一次按下时的```e.targetTouches[0].clientY```值，赋值给targetY

3、后期touchmove里边获取每次的```e.targetTouches[0].clientY```与第一次的进行比较，可以得出用户是上滑还是下滑手势。

4、如果手势是向上滑，且页面现在滚动的位置刚好是整个可滚动高度——弹窗内容可视区域高度的值，说明上滑到底，阻止默认事件。

同理，如果手势是向下滑，并且当前滚动高度为0说明当前展示的已经在可滚动内容的顶部了，此时再次阻止默认事件即可。

两个判断条件可以写到一个if中，用 || (或)表示即可。
```js
layerBox.addEventListener('touchmove', function (e) {
  if (sTop <= 0 && NewTargetY - targetY > 0 && '鼠标方向向下-到顶' || sTop >= sH - lyBoxH && NewTargetY - targetY < 0 &&
    '鼠标方向向上-到底') {
    //...
  }
}, false);
```
我这里为了代码可读性，分开写了：
```js
layerBox.addEventListener('touchmove', function (e) {
  //...
  if (sTop <= 0 && NewTargetY - targetY > 0 && '鼠标方向向下-到顶') {
    //...
  } else if (sTop >= sH - lyBoxH && NewTargetY - targetY < 0 &&
    '鼠标方向向上-到底') {
    //...
  }
}, false);
```
 
### 完整代码：
出现弹窗时：
```js
btn.onclick = function () {
  layer.style.display = 'block';
  layer.addEventListener('touchmove', function (e) {
    e.stopPropagation();
    if (e.target == layer) {
      // 让不可以滚动的区域不要滚动
      console.log(e.target, '我就是一个天才！！！');
      e.preventDefault();
    }
  }, false);
  var targetY = null;
  layerBox.addEventListener('touchstart', function (e) {
    //clientY-客户区坐标Y 、pageY-页面坐标Y
    targetY = Math.floor(e.targetTouches[0].clientY);
  });
  layerBox.addEventListener('touchmove', function (e) {
    // 检测可滚动区域的滚动事件，如果滑到了顶部或底部，阻止默认事件
    var NewTargetY = Math.floor(e.targetTouches[0].clientY),//本次移动时鼠标的位置，用于计算
      sTop = layerBox.scrollTop,//当前滚动的距离
      sH = layerBox.scrollHeight,//可滚动区域的高度
      lyBoxH = layerBox.clientHeight;//可视区域的高度
    if (sTop <= 0 && NewTargetY - targetY > 0 && '鼠标方向向下-到顶') {
      // console.log('条件1成立：下拉页面到顶');
      e.preventDefault();
    } else if (sTop >= sH - lyBoxH && NewTargetY - targetY < 0 &&
      '鼠标方向向上-到底') {
      // console.log('条件2成立：上翻页面到底');
      e.preventDefault();
    }
  }, false);
}
```
隐藏弹窗时：
```js
var closeBtn = document.getElementById('close');
closeBtn.onclick = function () {
  layer.style.display = 'none';
    // 弹窗关闭后，可解除所有禁止 - 懒人就不写了
}
```



<h2 id="num05">body滚动 + 弹层内部滚动[js-代码模拟上下滑动效果]</h2>

我想，既然我们监控弹层、监控touchY那么辛苦了已经，还差再辛苦一点，自己写一个模拟手势滚动效果嘛！
 
这次依旧从弹层上入手，不让弹层用css自动的超出滚动，而是超出隐藏，然后简单粗暴地利用JS的touchstart、touchmove、touchend等事件，手动写一个自定义滚动效果。
 
### 适用场景：

一切，这种做法应用到项目中过，经得起测试的考验。
 
### 解决方案与思路：

具体制作思路写在js注释上。

1、交互代码
```js
/* 交互代码 */
btn.onclick = function () {
  layer.style.display = 'block';
  //为了我的css能统一使用，这里偷个懒，加个行间样式，
  // 把之前做demo用的overflow滚动给禁掉，然后改了点别的样式
  layerBox.style.overflow = 'hidden'; 
  layerBox.style.paddingTop = 0; 
  layerList.style.paddingTop = 0; 
  layerList.style.paddingBottom = 0; 
}
var closeBtn = document.getElementById('close');
closeBtn.onclick = function () {
  console.log('?/*  */');
  layer.style.display = 'none';
  // 弹窗关闭后，可解除所有禁止 - 懒人就不写了
}
```
 
2、禁掉弹窗的touchmove 的默认事件
```js
/* 禁掉所有的touchmove事件 */
layer.addEventListener('touchmove', function (e) {
  e.preventDefault();
}, false);
```
 
3、重写手势滑动效果
```js
/* 重新写touchmove效果 */
var targetY = null,
  transH = 0,
  lastY = 0;
layerBox.addEventListener('touchstart', function (e) {
  //这里简单的把整个layerBox的默认事件给禁止了，所以close的click事件就不起作用了。
  // 可以把结构再改改把close挪出来。或者js把close绕开：
  if(e.target != closeBtn){
    e.preventDefault();
  }
  //clientY-客户区坐标Y 、pageY-页面坐标Y
  lastY = targetY = Math.floor(e.targetTouches[0].clientY);
});
layerBox.addEventListener('touchmove', function (e) {
  // 为了写这个，还得改动一下结构
  var NewTargetY = Math.floor(e.targetTouches[0].clientY), //本次移动时鼠标的位置，用于计算
    sTop = layerBox.scrollTop, //当前滚动的距离
    sH = layerBox.scrollHeight, //可滚动区域的高度
    lyBoxH = layerBox.clientHeight; //可视区域的高度
  if (NewTargetY - targetY > 0 && '鼠标方向向下滑-上翻效果') {
    transH += NewTargetY - lastY;// 先把这次鼠标滑动的距离计算出来，叠加给transH
    transH = transH >= 0 ? 0 : transH;//原本transH是负值，如果一直向上翻，就需要一直+正值，一旦正负相加抵消到>=0,说明翻到顶了，就直接赋值为顶，不再上翻。
  } else if (NewTargetY - targetY < 0 && '鼠标方向向上滑动-下拉效果') {
    transH -= lastY - NewTargetY;// 先把这次鼠标滑动的距离计算出来，叠减给transH
    transH = Math.abs(transH) > sH - lyBoxH ? -(sH - lyBoxH) : transH;//如果transH的绝对值大于可滚动的距离了，说明翻到底，则把可滚动区域翻到底的值赋给他。否则就一直下滚鼠标移动的距离
  }
  layerList.style.transform = `translateY(${ transH }px)`;
  lastY = NewTargetY;
}, false);

```
 
### 大致思路关键点就在touchmove里边：

1、在touchstart的时候，监听用户手势按下，记录初次按下的坐标点y的值y1。

2、touchmove手势移动的时候，再次获取最新的坐标点y的值y2，（其实记录可滚动区域的可滚动高度、当前滚动距离等可以在一开始就记录，我这里写到了touchmove里，还可以再优化）。

3、然后通过计算y1和y2 的差值判断出用户是朝哪个方向移动的手势。

4、进而根据不同的手势方向给弹层可滚动内容的transform添加位移translate效果（或者基础用position: absolute，再根据手势移动的距离，动态设置top的值。代码不止一种）。思路就是把手势移动的长度添加到弹层上下移动的距离上。

5、可能需要多考虑的一点是，当用户一直上翻到底或者一直下拉到顶时，做一下极值的判断和限制。

6、最后把本次移动到的点y2替换给y1，根据手势移动实时更新当前手势的地址。
 
7、另外这里还可以在touchend事件里，把touchstart和touchmove包括自身touchend的事件都解绑掉。我偷懒就不写了。
 
### 问题局限：

不好的点就是没有原生滚动条那种效果，一点也不灵动，只能鼠标移动多少、可滚动区域挪动多少。
 
 

<h2 id="num06">六、body滚动 + 弹层内部滚动[css+js-记录滚动位置]</h2>

换个脑子，回到最初 寻找新的思路。

不从弹层上入手，也就是不禁掉弹层的touchmove默认事件。

而是继续给body一个overflow: hidden;和position: fixed;就会有页面跳转到顶部的现象。
 
这时，我们可以通过记录用户打开弹窗前所滚动页面的位置，在弹层展开的时候赋给body在css中的top值，等关闭弹层的时候，再把这个值赋值给body在js中的scrollTop值，还原body的滚动位置。
 
这种原理简单，理解方便。并且各方面都能实现。比如说：

body可以继续滚动、弹层出来后他的top值限制他不会跳到顶部、

弹层中不管短还是长，需不需要滚动，都不care，自由活动、

然后关闭弹层后，body还可以继续滚动，丝毫不受影响、

兼容性虽然都写了，但是我也没测试~

这个神不知鬼不觉的人工介入方案也是各位前辈写烂的一个点。很是巧妙，很是经典。
 
### 代码：

1、事先准备一个工具：

```js
function getScrollOffset() {
  /*
    * @Author: @Guojufeng 
    * @Date: 2019-01-31 10:58:54 
    * 获取页面滚动条的距离-兼容写法封装
    */
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  } else {
    return {
      x: document.body.scrollLeft || document.documentElement.scrollLeft,
      y: document.body.scrollTop || document.documentElement.scrollTop
    }
  }
};
```

2、获取页面的滚动距离：

```js
/* 动态获取当前页面的滚动位置 */
var scrollT = null;
var LastScrollT = 0;
window.onscroll = function (e) {
  scrollT = getScrollOffset().y;//滚动条距离
}
```

3、弹层出现/消失的主流程

```js
btn.onclick = function () {
  layer.style.display = 'block';
  // 在这里获取滚动的距离，赋值给body，好让他不要跳上去。
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = -scrollT + 'px';//改变css中top的值，配合fixed使用
  // 然后找个变量存一下刚才的scrolltop，要不然一会重新赋值，真正的scrollT会变0
  LastScrollT = scrollT;
}
var closeBtn = document.getElementById('close');
closeBtn.onclick = function () {
  console.log(LastScrollT)
  layer.style.display = 'none';
  document.body.style.overflow = 'auto';
  document.body.style.position = 'static';

  // 关闭close弹层的时候，改变js中的scrollTop值为上次保存的LastScrollT的值。并根据兼容性赋给对应的值。
  if (window.pageXOffset) {
    window.pageYOffset = LastScrollT;
  }else{
    document.body.scrollTop = LastScrollT;
    document.documentElement.scrollTop = LastScrollT;
  }
}
```
 
### 局限问题：

这个方法我在真机上测试时发现一个问题，是IOS的：

大家应该都知道IOS的页面顶部继续下拉或者底部继续上拉，都会出现页面后边的背景，这个在手机上很常见。但是到了这个解决方法里边，如果用户在弹窗黑屏上继续下拉漏出了底部背景，那弹层的滚动效果就都没了。

我。。。

只有在这个时候，会很讨厌IOS。

## 最后总结：

接着最后一个方案的问题，我返回去测试了所有方案在真机上打开弹窗时的上滑或下拉问题。

结论是：以上解决方案中，第四种没有出现这种问题，第五种也没有，共同点都是因为用了touchmove的preventDefault。
 
第二种方法和第六种有一致的情况，如果不小心碰到了弹窗黑色蒙层的上拉下滑，然后滑的太狠出现了body的底部背景，弹层的滚动效果也就下岗了~
 
当然，这个问题也是我们为了测试而特意在黑色蒙层中使劲上拉下滑，倒也不至于是必现的影响用户主要流程的问题，不知道你家的产品介不介意~
 
### 综上所述，我粉第四种方案。
 
 

代码贴图偷个懒就不整理了，原文地址：
[博文链接](https://www.cnblogs.com/padding1015/p/10568070.html)



日后我发现更好的方法会继续补充，也欢迎各位看官提出问题，帮我补充不足的地方。

这些方案我只是经过自己的iphone自测（没有看安卓内的效果），哪位在项目中用了以后，测试测出什么坑点，也恳请能告知。让我们一起填坑，让世界更"太平"。


