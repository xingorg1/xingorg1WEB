/*
 * @Author: @Guojufeng 
 * @Date: 2019-06-25 16:46:27 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-06-25 17:57:07
 */
const {
  log
} = console;

function fieWFLB() {
  // 非无缝轮播  
  var oList = document.getElementById('demo-list'),
    oItem = oList.getElementsByTagName('li'),
    len = oItem.length,
    oH = oItem[0].offsetHeight,
    num = 0,
    timer1 = null;
  if (len > 0) {
    timer1 = setInterval(function () {
      oList.style.transform = `translateY(-${ num * oH }px) translateZ(0)`;
      // log(num,len);
      if (num == 0) {
        oList.style.transition = 'none';
      } else {
        oList.style.transition = `transform .35s linear`;
      }
      ++num;
      if (num > len - 1) {
        num = 0;
      }
    }, 1500);
  }
};

function carouselOld() {
  // 无缝轮播
  var oList = document.getElementById('demo-list'),
    oItem = oList.getElementsByTagName('li'),
    one = oItem[0].cloneNode(true), //获取第一个li，克隆
    len = oItem.length,
    oH = oItem[0].offsetHeight,
    num = 0, //记录当前播放的张数
    timer = null,
    timer1 = null;
  /* 旋转木马 */
  function movement() {
    clearTimeout(timer);
    clearTimeout(timer1);
    startMove(oList, {
      'top': -(num * oH)
    }, function () {
      if (num >= len) {
        num = 0;
        oList.style.top = '0px';
      }
      timer = setTimeout(function () {
        num++;
        movement();
      }, 1000);
    });
  }
  /* 类名获取 */
  function getStyle(dom, attr) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(dom, null)[attr];
    } else {
      return dom.currentStyle(attr);
    }
  }
  /* 运动封装 */
  function startMove(dom, attrObj, callback) {
    var speed = null,
      dis = null;
    clearInterval(dom.timer);
    dom.timer = setInterval(function () {
      var isEnd = true; //1、先假定运动可以停止
      for (const key in attrObj) {
        if (attrObj.hasOwnProperty(key)) {
          var curAttr,
            curTarget = attrObj[key],
            isOpa = key == 'opacity' ? true : false;
          if (isOpa) {
            curAttr = parseFloat(getStyle(dom, key)) * 100;
            curTarget *= 100;
          } else {
            curAttr = parseInt(getStyle(dom, key));
          }
          speed = (curTarget - curAttr) / 7;
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
          // 2、让物体直接运动，先不做停止判断。
          if (isOpa) {
            dom.style[key] = (curAttr + speed) / 100;
          } else {
            dom.style[key] = curAttr + speed + 'px';
          }
          // 3、在for循环中判断，只要有一个属性的当前所在点不等于设置的目标点，就把总的变量置否。
          if (curAttr != curTarget) {
            isEnd = false;
          }
        }
      }
      // 最后在for循环的外边判断是否能够真正的停止了。如果可以，停止定时器
      if (isEnd) {
        clearInterval(dom.timer);
        dom.timer = null;
        typeof (callback) == 'function' ? callback(): new Error('你不用回调吗？');
      }
    }, 40);
  }

  oList.appendChild(one);
  // 轮播开始
  timer = setTimeout(movement, 1000);
}
// 原生写法
// carouselOld();

/* 面向对象 */
function Carousel(oID,tagName) {
  // 无缝轮播
  this.oList = document.getElementById(oID);
  this.oItem = this.oList.getElementsByTagName(tagName);
  this.one = this.oItem[0].cloneNode(true); //获取第一个li，克隆
  this.len = this.oItem.length;
  this.oH = this.oItem[0].offsetHeight;
  this.num = 0; //记录当前播放的张数
  this.timer = null;
  this.timer1 = null;
  if(this.one){
    this.oList.appendChild(this.one);
    this.init();
  }
 
}
Carousel.prototype = {
  init(){
    // 轮播开始
    this.timer = setTimeout(this.movement.bind(this), 1000);
  },
  movement() {
    /* 旋转木马 */
    clearTimeout(this.timer);
    clearTimeout(this.timer1);
    this.startMove(this.oList, {
      'top': -(this.num * this.oH)
    }, function () {
      if (this.num >= this.len) {
        this.num = 0;
        this.oList.style.top = '0px';
      }
      this.timer = setTimeout(function () {
        this.num++;
        this.movement();
      }.bind(this), 1000);
    }.bind(this));
  },
  getStyle(dom, attr) {
    /* 类名获取 */
    if (window.getComputedStyle) {
      return window.getComputedStyle(dom, null)[attr];
    } else {
      return dom.currentStyle(attr);
    }
  },
  startMove(dom, attrObj, callback) {
     /* 运动封装 */
    var speed = null,
      self = this,
      dis = null;
    clearInterval(dom.timer);
    dom.timer = setInterval(function () {
      var isEnd = true; //1、先假定运动可以停止
      for (const key in attrObj) {
        if (attrObj.hasOwnProperty(key)) {
          var curAttr,
            curTarget = attrObj[key],
            isOpa = key == 'opacity' ? true : false;
          if (isOpa) {
            curAttr = parseFloat(self.getStyle(dom, key)) * 100;
            curTarget *= 100;
          } else {
            curAttr = parseInt(self.getStyle(dom, key));
          }
          speed = (curTarget - curAttr) / 7;
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
          // 2、让物体直接运动，先不做停止判断。
          if (isOpa) {
            dom.style[key] = (curAttr + speed) / 100;
          } else {
            dom.style[key] = curAttr + speed + 'px';
          }
          // 3、在for循环中判断，只要有一个属性的当前所在点不等于设置的目标点，就把总的变量置否。
          if (curAttr != curTarget) {
            isEnd = false;
          }
        }
      }
      // 最后在for循环的外边判断是否能够真正的停止了。如果可以，停止定时器
      if (isEnd) {
        clearInterval(dom.timer);
        dom.timer = null;
        typeof (callback) == 'function' ? callback(): new Error('你不用回调吗？');
      }
    }, 40);
  }
}
let carousel = new Carousel('demo-list','li');
