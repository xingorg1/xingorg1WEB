//-公司
/*首屏动画-1*/
$(".scrol_4 li").each(function () {
    var $this = $(this);
    if (!$this.find("a").length > 0) {
        $this.remove();
    }
});
var serveTimer = setTimeout(function () {
    var nIn = $(".slider-menu-1 .current").index();
    var len = $(".slider_stage li").length;
    if (nIn < len - 1) {
        nIn++;
    } else {
        nIn = 0;
    }
    $(".slider-menu-1 li").removeClass("current").eq(nIn).addClass("current");
    $(".slider_stage li").eq(nIn).fadeIn().siblings().hide();
    serveTimer = setTimeout(arguments.callee, 5000);
}, 5000);
$(".prev1").click(function () {
    clearTimeout(serveTimer);
    var nIn = $(".slider-menu-1 .current").index();
    var len = $(".slider_stage li").length;
    if (nIn < len && nIn > 0) {
        nIn--;
    } else {
        nIn = len - 1;
    }
    $(".slider-menu-1 li").removeClass("current").eq(nIn).addClass("current");
    $(".slider_stage li").eq(nIn).fadeIn().siblings().hide();
});

$(".next1").click(function () {
    clearTimeout(serveTimer);
    var nIn = $(".slider-menu-1 .current").index();
    var len = $(".slider_stage li").length;
    if (nIn < len - 1) {
        nIn++;
    } else {
        nIn = 0;
    }
    $(".slider-menu-1 li").removeClass("current").eq(nIn).addClass("current");
    $(".slider_stage li").eq(nIn).fadeIn().siblings().hide();
});
$(".slider-menu-1 li").click(function () {
    clearTimeout(serveTimer);
    var nIn = $(this).index();
    $(this).addClass("current").siblings().removeClass("current");
    $(".slider_stage li").eq(nIn).fadeIn().siblings().hide();
});
/*//首屏动画*/
//首图轮播-2
var current = 0,num
function autoPlay() {
    current++
    if(current>=num) current = 0
    $($(".header_top")[current]).fadeIn(500).siblings(".header_top").hide();
    $($(".nav_h li")[current]).addClass("cur").siblings("li").removeClass("cur");
}

$(document).ready(function (e) {
     num = $(".header_top").size();
     
     $(".nav_h li").hover(function(){
         window.clearInterval(wid)
         var $this = $(this);
         $this.addClass("cur").siblings("li").removeClass("cur");
         $(".header_top[tabcon="+$this.attr("tabnav")+"]").fadeIn(500).siblings(".header_top").hide();
     },
     function(){
       wid = window.setInterval("autoPlay()",4000)
     });
     
      $(".header_top").hover(function(){
         window.clearInterval(wid)
      },
      function(){
         wid = window.setInterval("autoPlay()",4000)
      });
        
      wid = window.setInterval("autoPlay()",4000)
      
/*=============================slider=封装=============================*/
slid({
     a : ".scrol01 li",
     b : ".sliderMenu01 .current",
     c : ".sliderStage01 li",
     d : ".sliderMenu01 li",
     p : ".prev01",
     n : ".next01"
 });
slid({
       a : ".scrol02 li",
       b : ".sliderMenu02 .current",
       c : ".sliderStage02 li",
       d : ".sliderMenu02 li",
       p : ".prev02",
       n : ".next02"
   });
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
    $(this).addClass("current").siblings().removerClass("current");
    $(sOne.c).eq(nIn).fadeIn().siblings().hide();
});
}


/*==========================tab切换==========================*/
    function tabs(tabMenu, on, tabContent) {
        $(tabContent).each(function() {
            $(this).children().eq(0).show();
        });
        $(tabMenu).each(function() {
            $(this).children().eq(0).addClass(on);
        });
        $(tabMenu).children().hover(function() {
            $(this).addClass(on).siblings().removeClass(on);
            var index = $(tabMenu).children().index(this);
            $(tabContent).children().eq(index).show().siblings().hide();
        });
    }
    tabs(".aTapHeadWrap", "tapActiveLi", ".aTapCont");

/*我要购车*/
$('.pop_close').click(function () {
    $(this).parent().fadeOut(200)
    $('.mask_layer').fadeOut(200);
})

$('.mask_layer').click(function () {
    $('.pop').fadeOut(200)
    $('.mask_layer').fadeOut(200);
})
///*a链接-span遮罩-替换类型*/
//$('.btn').click(function () {
//        $('.pop').fadeIn(200)
//        $('.mask_layer').fadeIn(200);
//})
/*a链接-span遮罩*/
$('.btn').hover(function () {
        $(this).children("span").animate({"top":0},150);;
    },function () {
        $(this).children("span").animate({"top":"50px"},150);;
})
 /*流程-小动画-鼠标滑过向上动一下下*/
    $(".cont_1 li").hover(function(){
        $(this).stop(true,true).animate({top:"-10px"});
    },function(){
        $(this).stop(true,true).animate({top:"0px"});

    });    
/*=====================浮动菜单============================*/
    $(window).scroll(function(e) {
        s = $(document).scrollTop();
        
/*======================回到顶部=====================*/
        if($(window).scrollTop() >= 300) {
            $('.actGotop').fadeIn(300);
        } else {
            $('.actGotop').fadeOut(300);
        }
    })
    $('.actGotop').click(function() {
        $('html,body').animate({
            scrollTop: 0
        }, 500);
    });

});
/*====================注册表单清空===================*/
    $("input[name='form-input']").bind({
        focus: function() {
            if(this.value == this.defaultValue) {
                this.value = "";
            }
        },
        blur: function() {
            if(this.value == "") {
                this.value = this.defaultValue;
            }
        }
    });


/*切换标签*/    
$(".menu li").each(function(i){
    $(this).mouseover(function(){
        $(".menu li").removeClass("cur").eq(i).addClass("cur");
        $(".jx").hide().eq(i).show()        
    })
})
    

/*隔行变色*/
$(".jxs tr:even").addClass("jxs_bg")


/*hover方式出现浮层*/
$("#txtShow li").hover(function(){
    $(this).find('.txtDiv').show();
},function(){
    $(this).find('.txtDiv').hide();
})
    
    

/*弹窗*/
$('.pop_close').click(function () {
    $(this).parent().fadeOut(200)
    $('.zbg').fadeOut(200);
})

$('.zbg').click(function () {
    $('.pop').fadeOut(200)
    $('.zbg').fadeOut(200);
})

$('.pop_login_btn').click(function () {
    $('.pop_login_box').fadeIn(200);
    $('.zbg').fadeIn(200);
})

$('.pop_btn_2').click(function () {
    $('.pop_box_2').fadeIn(200);
    $('.zbg').fadeIn(200);
})
    


/*浮动菜单*/
$(window).scroll(function(e){
    s = $(document).scrollTop();    
    if(s > 550){
        $('.flo_nav').css('position','fixed');
        $('.flo_nav').css('top',10+'px');
        if(s < 550){
            $('.flo_nav').css('top',550+'px');    
        }                
    }else{
        $('.flo_nav').css('position','');
        $('.flo_nav').css('top',550+'px');
    }
})

$('.z1').click(function(){
    $("html,body").animate({scrollTop:500},500);    
});    
$('.z2').click(function(){
    $("html,body").animate({scrollTop:1000},500);    
});
$('.z3').click(function(){
    $("html,body").animate({scrollTop:1500},500);    
});
$('.z4').click(function(){
    $("html,body").animate({scrollTop:2000},500);    
});
$('.z5').click(function(){
    $("html,body").animate({scrollTop:2500},500);    
});
$('.z6').click(function(){
    $("html,body").animate({scrollTop:3000},500);    
});
    
    
/*右侧悬浮登录*/    
function ml_close_demo() {
      $('.float-news').animate({
          right: '-450px'
      }, 312, function () {
          $('.float-open').delay(50).animate({
              right: '-2px'
          }, 312);
      });
  }
  function ml_open_demo() {
      $('.float-open').animate({
          right: '-70px'
      }, 100, function () {
          $('.float-news').delay(50).animate({
              right: '0px'
          }, 312);
      });
  }

  $('.float-close').click(function () {
      ml_close_demo();
      return false;
  });
  $('.open-btn').click(function () {
      ml_open_demo();
      return false;
  });
//切换？
$(".cont_dealer tr").each(function(){
    $(this).find("td").eq(0).addClass("tl")
    $(this).find("td").eq(1).addClass("tl")
    $(this).find("td").eq(4).addClass("tr")
})