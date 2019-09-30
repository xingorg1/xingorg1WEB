
function slid(sOne){
    $(sOne.a).each(function () {
    var $this = $(this);
    if (!$this.find("a").length > 0) {
        $this.remove();
    }
});
var nIn = $(sOne.b).index();
var len = $(sOne.c).length;
 function pd(){
     //判断
      if (nIn < len - 1) {
        nIn++;
        //nIn是下边小圆点的
    } else {
        nIn = 0;
    }
 }
 function sc(){
     //改变效果
     $(sOne.d).removeClass("current").eq(nIn).addClass("current");
    $(sOne.c).eq(nIn).fadeIn().siblings().hide();
 }
 //定时变换
var serveTimer = setTimeout(function () {
       pd();
    sc();
    serveTimer = setTimeout(arguments.callee, 2000);
}, 2000);
//上一张
$(sOne.p).click(function () {
    clearTimeout(serveTimer);
    if (nIn < len && nIn > 0) {
        nIn--;
    } else {
        nIn = len - 1;
    }
    sc();
});
//下一张
$(sOne.n).click(function () {
    clearTimeout(serveTimer);
    pd();
    sc();
});
//小圆点
$(sOne.d).click(function () {
    clearTimeout(serveTimer);
    var nIn = $(this).index();
    $(this).addClass("current").siblings().removeClass("current");
	$(sOne.c).eq(nIn).fadeIn().siblings().hide();
});
}