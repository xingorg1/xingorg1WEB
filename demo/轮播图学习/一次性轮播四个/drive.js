function lbt(oJson) {
	var playTime = oJson.playTime;
	var duration = oJson.duration;
	var oBox = $(oJson.oBox);
	var oUl = $(oJson.oUl);
	var Prev = $(oJson.Prev);
	var Next = $(oJson.Next);
	var liWidth = $(oJson.oLi).width();
	oUl.css("width",liWidth*oUl.children().length +"px");
	var index = 0;
	var indexNum = Math.ceil(oUl.children().length/4);
	for(var i=0;i<indexNum;i++){
		var oA = $('<a href="javascript:void(0)"></a>');
		$(oJson.Nums).append(oA);
	}
	$(oJson.Nums).children().eq(0).addClass("cur");
	var Nums = $(oJson.Nums).children();
	Next.click(function() {
		index++;
		if(index >= indexNum) {
			index = 0;
		}
		Ulmove(index);
	});
	Prev.click(function() {
		index--;
		if(index < 0) {
			index = indexNum - 1;
		}
		Ulmove(index);
	});
	Nums.click(function() {
		index = $(this).index();
		Ulmove(index);
	})
	var timer = null;
	clearInterval(timer);
	timer = setInterval(function() {
		Next.click();
	}, duration)
	function clearTimer(ele) {
		ele.hover(function() {
			clearInterval(timer);
		}, function() {
		    timer = setInterval(function() {
				Next.click();
			}, duration)
		})
	}
	clearTimer(oUl);
	clearTimer(Next);
	clearTimer(Prev);
	clearTimer(Nums);
	//轮播运动
	function Ulmove(index) {
		Nums.removeClass(oJson.cur);
		Nums.eq(index).addClass(oJson.cur);
		oUl.stop().animate({
			"left": (-liWidth*4) * index + "px"//轮播四个的关键点
		}, playTime);
	}
};