## relative 对 absolute的限制作用

### 限制left/top/right/bottom(方位值)定位

  限制描述：absolute设置了方位值时，这些方位值是相对于position不为static的最近的父元素来定位的。如果父元素设置了relative，方位值就会相对于这个父元素，所以说relative限制absolute的方位值目标对象。

### 限制z-index层级

  限制描述：
    父元素没有relative的时候，绝对定位元素的z-index值越大，则层级越高。
    但是如果两个绝对定位元素的父元素都有relative控制，则绝对定位元素自身的层级再高也没用，还是受其父元素的限制。只有带着relative的父元素的层级越高，绝对定位元素的层级才越高。

    之所以relative能够限制absolute，是因为z-index为具体数值。当z-index为数值的时候，就会创建层叠上下文。
    
    也就说，只要z-index为数值，就会创建层叠上下文。

    在ie7+以上的浏览器中，如果z-index值为auto，那么relative就限制不了absolute的层级，这种情况下，带有absolute的元素具体层级还是看其自身不看父元素。
    z-index：auto;相当于z-index:0;的效果。

    ie6、7中就算z-index为auto，也会创建层叠上下文。即，在ie6、7中，只要有z-index就会创建层叠上下文。（这是一个bug）

### 限制absolute超越overflow的现象

  限制描述：
    absolute又一个特性，就是设置absolute的元素，如果不设置方位值，父元素也不设置relative，那么父元素的overflow：hidden；对这个absolute元素就没有作用。
    当然，如果父元素设置了relative和overflow，那么即使子元素设置了absolue，他也会超出父元素被隐藏。

## relative对fixed的影响
只能限制fixed的层级，其他对于absolute限制的两条，即方位值和overflow的限制不存在。

## relative和自身定位
1. 相对自身特性： relative定位的目标是自身，相对于自身。
```css
postion: relative;
left: 0;
top: 0;
```
则不会发生位移。
2. 无侵入特性： 不会脱离文档流，不会影响其他元素布局。自己移来移去，其他元素不会位移。

## relative与方位值

### relative里边设置相反方向的方位值会有什么现象？
1. absolute绝对定位元素设置left+right，现象是拉伸

2. relative相对定位元素设置left+right，现象是斗争
### 斗争现象：
两个之间，只有一个起作用。

* 如果设置了left和right，则只有left起作用

* 如果设置了top和bottom，则只有top起作用

## relative和层级
relative可以提高元素的层级（层叠上下文）

普通的两个元素，如果发生重叠，是后边的元素覆盖前边的元素

前边的元素设置relative+z-index，则可以反过来覆盖后边的元素

## 新建层叠上下文
当z-index的值为数值的时候，就会新建层叠上下文。包括ie6、7

当z-index为auto的时候，

  ie8及以上现代浏览器不会新建层叠上下文。

  ie6、7会新建层叠上下文。

## relative的最小化影响原则

即，尽量降低relative属性对其他元素或布局的潜在影响

尽量避免使用relative：很多时候只设置一个position：absolute即可，因为absolute不设置方位值的时候，只是在原有位置腾空而起，不会发生位移，根本没必要设置父元素的相对定位。

relative最小化原则：比如如果absolute元素需要一个relative的父元素，可以单独建立一个div，就是设置position：relative用。
