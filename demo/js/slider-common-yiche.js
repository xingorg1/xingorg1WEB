/* 20161109 */
/*首屏动画*/
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

/**轮播图左侧列表**/
function topLeftList() {
    var $storeList = $("#storeListJs");
    var $storeNav = $(".store_nav");
    var $slDivH = $storeList.find("div").height();
    $storeList.height($slDivH + 26 + 15);
    $storeNav.find("b").height($slDivH + 26 + 15 + 19);
    /*旗舰店导航*/
    $storeList.hover(function () {
        var $this = $(this);
        // $this.find("span").hide();
        $this.addClass("cur");
        $this.find($storeNav).show();
    }, function () {
        var $this = $(this);
        // $this.find("span").show();
        $this.removeClass("cur");
        $this.find($storeNav).hide();
    });
};

/*左右切换图片组 品牌旗舰店*/
function brandStore() {
    var $top = $("#Btn_top");
    var $bot = $("#Btn_bot");
    $("#scrol_1 a").hover(function () {
        $(this).find("p").stop(true, true).animate({ left: "-1px" });
    }, function () {
        $(this).find("p").stop(true, true).animate({ left: "-200px" });
    });
    $bot.click(function () {
        $("#scrol_1").height("auto");
        $(this).hide();
        $top.show();
    });
    $top.click(function () {
        $("#scrol_1").height("309px");
        $(this).hide();
        $bot.show();
    });
};

/*一元试驾*/
function driveCar() {
    $("#js-drive").autoTopic_scroll({ autoPlay: true, speed: 300, space: 3000, control: "#js-driveCar-list", leftBtn: "#js-pre", rightBtn: "#js-next" });
}

/*优惠信息*/
function hoverShow() {
    $(".hover_show li").hover(function () {
        $(this).stop(true, true).animate({ top: "-10px" });
        $(this).find("p").stop(true, true).animate({ left: "33px" });
    }, function () {
        $(this).stop(true, true).animate({ top: "0px" });
        $(this).find("p").stop(true, true).animate({ left: "23px" });

    });
};

/*优惠车型*/
function saleCar() {
    $(".hotCar_box").hover(function () {
        var $this = $(this);
        $this.addClass("cur");
        $this.find('img,.line_1').animate({ top: "-5px" }, "slow");
        $this.find('.txt_now').hide().next('.txt_h').show();
    }, function () {
        var $this = $(this);
        $this.removeClass("cur");
        $this.find('img,.line_1').animate({ top: "0px" }, "fast");
        $this.find('.txt_now').show().next('.txt_h').hide();
    });
};


/*加载数据*/
function loadJs() {
    $(window).scroll(function (e) {
        s = $(document).scrollTop();
        s = s + $(".safe").offset().top + 104;
        if (s >= $(".driveCar").offset().top - 100) {
            //此处为一元试驾开始处，调用应对方法
            loadDataDriveCar();
        }
        if (s >= $(".falgship").offset().top - 100) {
            //此处为品牌推荐开始处,调用对应方法
            loadDataInsHtml();
            loadDataCarP();
        }
        if (s >= $(".newCar").offset().top - 100) {
            //此处为优惠车型开始处,调用对应方法
            loadDataCarX();
        }
        if (s >= $(".sale_activity").offset().top - 100) {
            //此处为品牌旗舰店开始处,调用对应方法
            loadDataCarS();
        }
        if (s >= $(".saleHot").offset().top - 100) {
            //此处为新车预售开始处,调用对应方法
            loadDataTeMaiHtml();
        }
    });
};

$(document).ready(function () {
    $(".slider_stage li").each(function () {
        var $this = $(this);
        if ($this.find("a").length < 0) {
            $this.addClass("cur");
        }
    });
    /*优惠信息*/
    hoverShow();
    /*焦点图左侧list*/
    topLeftList();
    /*优惠车型*/
    saleCar();
    /*旗舰店*/
    brandStore();
    /*一元试驾*/
    //driveCar();
    /*加载数据*/
    loadJs();
});