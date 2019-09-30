absolute绝对定位
### 绝对定位与浮动鲜为人知的兄弟关系
即是说，absolute后，元素和浮动元素的特性差不多，只不过absolute脱离文档流，元素飘在天上，float还在凡间。

所以，absolute元素的特性：
1. 包裹性
  容器使用absolute后，就形成一个inline-block包裹了内部元素，具有包裹性。
2. 破坏性
 子元素绝对定位，脱离父元素文档流，父元素高度塌陷。

这俩特性和float是一模一样的，所以说其兄弟关系。

### absolute和relative的关系
二者并不是兄弟。而是自由与枷锁的关系，即限制与被限制的关系。分离的，对立的关系。
就像：clear限制float一样，relative限制absolute。

### absolute越独立越强大
如果没有relative的限制，他能在整个可视区域漂流。
行为表现上是不使用top/right/bottom/left任何一个属性或使用auto作为值。
很强大！
甚至超越overflow的限制，超出范围也可以不被隐藏。

### absolute行为表现
在给一个元素单独设置了absolute之后，其表现如下:
1. 脱离文档流让位给后人，自己原来的位子让出来给后边的元素
2. 自己却垂直而上飞上天，但只是垂直而上，还是在自己原来位置的上空，不进行任何位移(初始不设置方位值得情况下)
  这种现象就好像是一条排着长队的人龙，里边一个人使用了absolute后，向上弹出，后边的人向前一步占据他的位置，而他则骑到了后边人的脖子上。
  ~~对于前后排列的多个浮动兄弟元素，其中一个使用absolute，只是飘起来不改位置的行为不适用此情景~~

### absolute特性表现
1. 去浮动：absolute和float不能同时存在，如果之前有float，使用absolute后，float失效。
2. 位置跟随：也就是行为表现里的第二条，自己垂直飞上天后，其位置还是跟随原来在地面时的点，如果地面的点移动，他也会移动，如果地面的点不动，他就是在原来点的垂直方向上稳住。就像旗杆上的旗子，虽然飘在天上，但是永远飘不走。
  利用这个特性可以制作覆盖类型的小图标：详情见位置跟随特性应用.html

### absolute和层级
**误区**

不是所有的绝对定位元素都需要z-index控制层级。

1. 如果只有一个绝对定位元素，不需要z-index，他会自动覆盖普通元素;

2. 如果两个绝对定位，通过控制DOM流的前后顺序达到需要的覆盖效果，依然无z-index；

3. 如果多个绝对定位交错，非常非常少见，z-index:1控制。

4. 如果非弹框类的绝对定位元素z-index>2，必定z-index冗余，请优化。

**回流与重绘** 

* 动画尽量作用在绝对定位元素上

### left，top，right，bottom
使用了这些方位值，原来absolute的位置依赖特性会消失，不再停留在原位置的上方，而是受方位值的影响进行偏移，

而偏移的原则是：相对于最近一个position不为static的父元素进行。

**方位值和width、height的表现**
双方有异曲同工的表现：
比如，
```css
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
```
得到的结果和设置
```css
width: 100%;
height: 100%
```
是一样的。
因为如果设置的方位值是对立的，比如设置left+right，则不会产生位移，而是对应方向上的拉伸效果。
```css
position: absolute;
top: 0;
left: 0;
width: 50%;
```
等同于
```css
position: absolute;
left: 0;
top: 0;
right: 50%;
```

#### 实现一个距离右侧200像素的全屏自适应的容器层，你会怎么实现？
1. 使用拉伸直接：
```css
position: absolute;
left: 0;
right: 200px;
```
2. width实现
```css
position: absolute;
left: 0;
width: calc(100% - 200px);
```

### 通常，元素百分比height要想起作用，需要父级容器的height值不是auto;
### 但是，如果容器使用绝对定位且拉伸形成，那么即使父级容器的height值是auto，百分比高度值也是支持的。

### 如果方位值和width/height尺寸同时存在，那么wdith/height设置的尺寸大于left/top/right/bottom拉伸的尺寸

## absolute不光是定位
如果仅仅是实现一些覆盖与定位，就有点大材小用。

### 使用absolute实现网页的整体布局效果
1. 满屏的单页应用：
```css
html,body{height: 100%;}
.page{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
```
2. 上下中，分左右的常规布局
```css
header,footer{
  position: absolute;
  left: 0;
  right: 0;
}
header{
  height: 48px;
  top: 0;
}
footer{
  height: 52px;
  bottom: 0;
}
aside{
  width: 250px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
}
content{
  position: absolute;
  top: 48px;
  bottom: 52px;
  left: 250px;/*如果侧边栏有宽度*/
  overflow: auto;/*超出滚动显示*/
}
```
3. 上中下，上下固定中间滚动的单页布局
上下固定，其实可以用fixed，通常情况下，遇到这种布局，第一反应也会是想到用fixed固定顶部和尾部，然后中间的有个和顶部尾部同值的上下padding，好让内容撑开与上下的距离。
然后内容区不用定位，只一个overflow即可。
但是这种布局会有bug。
如代码：
```html
  <header>头部</header>
  <section>
    <ul>
      <li>遇到这种布局，通常想到用fixed固定顶部和尾部，然后中间的有个和顶部尾部同值的上下padding，好让内容撑开与上下的距离。但是这种布局会有bug。</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项我是列表项我是列表项我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
    </ul>
  </section>
  <footer>底部</footer>
  <style>
    html,
    body {
      height: 100%;
    }
    body,ul {
      margin: 0;
    }
    header,
    footer {
      position: fixed;
      line-height: 48px;
      left: 0;
      right: 0;
      z-index: 1;
      color: aquamarine;
      text-align: center;
      background: #333;
    }
    header{
      top: 0;
    }
    footer {
      bottom: 0;
    }
    section{
      padding: 68px 0;
      /* position: absolute;
      top: 48px;
      right: 0;
      bottom: 48px;
      left: 0; */
      width: 100%;
      overflow: auto;
      background: #eee;
    }
    li{
      padding: 10px;
    }
  </style>
```
而巧妙的使用absolute也可以实现这种布局：
```html
  <header>头部</header>
  <section>
    <ul>
      <li>遇到这种布局，通常想到用fixed固定顶部和尾部，然后中间的有个和顶部尾部同值的上下padding，好让内容撑开与上下的距离。但是这种布局会有bug。</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项我是列表项我是列表项我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
    </ul>
  </section>
  <footer>底部</footer>
  <style>
    html,
    body {
      height: 100%;
    }
    body,ul {
      margin: 0;
    }
    header,
    footer {
      position: absolute;
      line-height: 48px;
      left: 0;
      right: 0;
      z-index: 1;
      color: aquamarine;
      text-align: center;
      background: #333;
    }
    header{
      top: 0;
    }
    footer {
      bottom: 0;
    }
    section{
      padding: 20px;
      position: absolute;
      top: 48px;
      right: 0;
      bottom: 48px;
      left: 0;
      overflow: auto;
    }
    li{
      padding: 10px 0;
    }
  </style>
```