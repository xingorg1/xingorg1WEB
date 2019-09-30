function lbt(oJson) {
	var playTime = oJson.playTime;
	var duration = oJson.duration;
	var oBox = $(oJson.oBox);
	var oUl = $(oJson.oUl);
	//	//难点1：克隆并获取新的长度
	//写错var oneLi = oLis.eq(0).clone();
	var oneLi = $(oJson.oLi).eq(0).clone()
	oUl.append(oneLi);
	var oLis = oUl.children();
	var Prev = $(oJson.Prev);
	var Next = $(oJson.Next);
	var Nums = $(oJson.Nums).children();
	var liWidth = oneLi.width();
	var index = 0;
	var imgLength = oLis.length - 1;
	//箭头隐藏与实现
	oBox.hover(function() {
		Next.show();
		Prev.show();
	}, function() {
		Next.hide();
		Prev.hide();
	})
	//下一张
	Next.click(function() {
//		clearInterval(timer);
		index++;
		if(index >= imgLength) {
			index = 0;
		}
		Ulmove(index);
	});
	//上一张
	Prev.click(function() {
//		clearInterval(timer);
		index--;
		if(index < 0) {
			index = imgLength - 1;
		}
		Ulmove(index);
	});
	//挑选张
	Nums.click(function() {
//		clearInterval(timer);
		index = $(this).index();
		Ulmove(index);
	})
	//	//难点2：自动播放与清楚定时器，总会开n个定时器。
	//自动播放
	var timer = null;
	clearInterval(timer);
	timer = setInterval(function() {
		Next.click();
	}, duration)
	//暂停自动播放
	function clearTimer(ele) {
		//这里定义成一个函数，多次方便调用，改变参数就可以改变使用者
		ele.hover(function() {
			clearInterval(timer);
		}, function() {
		    timer = setInterval(function() {
				Next.click();
			}, duration)
		})
	}
	clearTimer(oUl);
	//轮播运动
	function Ulmove(index) {
		Nums.removeClass(oJson.cur);
		Nums.eq(index).addClass(oJson.cur);
		oUl.stop().animate({
			"left": (-liWidth) * index + "px"
		}, playTime);
	}
};