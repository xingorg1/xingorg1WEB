# z-index语法、支持的属性值等：

**z-index：**

在支持z-index的元素上，

z-index规定了元素（包括子元素）的垂直z方向的层级顺序，

z-index可以决定哪个元素覆盖在哪个元素上边。（这个学过ps的，想象一下图层的概念，z-index就像是调整图层的上下顺序。）

z-index在css2.1中需要和定位元素(position为relative、absolute、fixed、sticky等这些)配合使用才有作用。

**属性值**
z-index:auto;

z-index:整数值;(支持负值和animation动画)

z-index:inherit;
---
# z-index与层级表现的几种情况：
## 普通元素中不设置z-index的情况下：
如果 **都没有设置**z-index层级，那么后边的元素覆盖前边的元素

如果z-index设置了 **具体数值**，那么数值大的覆盖数值小的。
比如：a元素的z-index为2；b元素的z-index为1；b虽然在a后边，但是a覆盖b；

## 定位元素的嵌套父元素设置了z-index的情况下：
### 父元素z-index都设置具体数值时：
遵循 **祖先优先**原则，谁的父亲的z-index值大，谁在上边。如果父元素一般大，那么遵循后来居上，谁的dom位置靠后谁的层级在上边。

比如：a元素的z-index为2；b元素的z-index为1；
因为b在a后边，即使a和b的父元素z-index都为1。b的父元素也比a的父元素高。
同样如果a的父元素为2，b的父元素为1，那么即使b在a后边，a的父元素也比b的父元素高。

晕了么？heihei.

### 父元素z-index都设置auto时：
父元素和没设置一样，**没有祖先优先原则**，还是遵循类似普通元素的那两条，**后来居上和谁大谁上。**

### 其中一个为auto，另一个为具体数值时：
**ie8及现代浏览器**的表现是，为auto的父元素z-index值不起作用，其子元素的z-index值和不为auto的另一个父元素比较层级，谁大谁高。

还是比如a和b，a的z-index值为3，父元素z-index值为auto。b和其父元素的z-index值都为1，即使b在a后边，即使a的父元素z-index：auto；比b的父元素小，但是a的z-index值比b的父元素还大，所以a在上边。

原因：z-index:auto;生成盒子层叠水平是0，盒子不会创建一个新的层叠上下文（ie8及现代浏览器）。
回归案例，也就是说当a的父元素z-index为auto时，根本没有生成层叠上下文，父元素根本没有出来应战，只能子元素硬着头皮和别人的爹pk，不过还是自古英雄出少年，只要子元素的z-index值大，管他是谁的父元素都能打赢。

**ie6、7**中，因为z-index:auto也会触发层叠上下文，所以也遵循后来居上原则。
---
# z-index新建层叠上下文
  当z-index为数值的时候，就会新建层叠上下文。
    
  也就是说，**在所有浏览器中，只要z-index为数值，就会创建层叠上下文。**
  
  **当z-index为auto时，不会触发新建层叠上下文**。z-index：auto;相当于z-index:0;的效果。（ie6、7除外：ie6、7中就算z-index为auto，也会创建层叠上下文。）

  **在ie6、7中，只要有z-index就会创建层叠上下文。（这是一个bug）**
---
# 层叠上下文和层叠水平
## 层叠上下文（stacking context）
即，在z轴上被提升(或降低)了层级的元素。
他是
html元素中的一个三维概念，表示元素在z轴上的层级。

### 在html里边，具有层叠上下文的元素有：
1. 页面的额根元素天生自带层叠上下文。被称为“根层叠上下文”

2. 设置了z-index：不为auto时；的```定位元素``也具有层叠上下文。

3. 其他

z-index:auto;不会创建层叠上下文

### 层叠上下文的几个特性：
1. 层叠上下文可以嵌套，组合成一个分层次的层叠上下文。

2. 每个层叠上下文和兄弟元素独立，当进行层叠变化或渲染的时候，只需要考虑后代元素。（想象一个人当官，全家升天。子孙得福。但是当官的兄弟不一定得到好处）

3. 每个层叠上下文是自成体系的：当元素的内容被层叠后，整个元素被认为是在父层的层叠顺序中。（就像两个父元素大官比较层级大小，跟子元素的层级大小没有关系。子元素的层级再大，父元素层级小就比不过父元素层级大的。）

## 层叠水平（stacking level）
```层叠上下文中```的每个元素都有一个层叠水平，层叠水平决定了同一个层叠上下文中，元素在z轴上的显示循序，遮盖原则。就像事同一个元素中，几个具有层叠次序的子元素之间的排列规则：

具体原则是：

**后来居上**： 层叠水平一致时，dom结构在后边的覆盖前边的。

**谁大谁上**： 层叠水平不一致时，谁的层叠水平值大谁在上边（就是比较z-index的数值谁大）

### 普通元素也有层叠水平

## 层叠顺序（stacking order）
表示元素发生层叠时候有着特定的垂直显示顺序。

### 7阶层叠水平（stacking level）

    1.层叠上下文 background/border（根元素或者z-index值不为auto的定位元素）

      2.负z-index

        3.block块状水平盒子

          4.float浮动盒子

            5.inline/inline-block水平盒子（内联和inline-block平级）

              6.z-index：auto或当成z-index：0

                7.正z-index
              
### inline/inline-block元素竟然可以覆盖浮动元素。原因如下
1属于背景装饰类
3、4属于盒子布局类：块状盒子和float经常用于布局
5 则是主要内容类：inline和inline-block用于内容表达
内容是页面中最重要的实体。因此，层叠水平要高。

## z-index与层叠上下文
### 定位元素默认z-index：auto可以看成是z-index:0;（从层叠顺序的角度）
### z-index不为auto的定位元素会创建层叠上下文。（从层叠上下文的角度，此时auto不等于0）
### z-index层叠顺序的比较止步于父级层叠上下文。
  当z-index为数值的时候，就会新建层叠上下文。
    
  也就是说，**在所有浏览器中，只要z-index为数值，就会创建层叠上下文。**
  
  **当z-index为auto时，不会触发新建层叠上下文**。z-index：auto;相当于z-index:0;的效果。（ie6、7除外：ie6、7中就算z-index为auto，也会创建层叠上下文。）

  **在ie6、7中，只要有z-index就会创建层叠上下文。（这是一个bug）**

## 其他生成层叠上下文的属性
1. z-index值不为auto的flex项（父元素display:flex|inline-flex，且子元素的z-index值不为auto)

2. 元素的opacity值不是1

3. 元素的transform值不是none

4. 元素mix-blend-mode（混合效果）值不是normal

5. 元素的(css3)filter值不是none

6. 元素的isolation值不是isolate

7. position：fixed声明(chrome等blink/webkit内核浏览器中)

8. will-change指定的属性值为上面任意一个

9. 元素的-webkit-overflow-scrolling设为touch。

## 其他需要注意的：
1. 不支持z-index的层叠上下文元素的层叠顺序均是z-index：auto级别（就是上边9条中，不需要z-index也能产生层叠上下文的情况）

2. 依赖z-index的层叠上下文元素的层叠顺序取决于z-index值。

### 两种通过z-index创建层叠上下文的情况：
1. position值为relative、absolute、fixed（部分浏览器）

2. display：flex|inline-flex容器的子flex项。