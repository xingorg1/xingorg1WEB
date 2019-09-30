//浮动瀑布流jq写法
function pblOfFloatJQ(oUl) {
	var oUl = $(oUl);
	appendImg();
	$(window).scroll(function() {
		var sT = document.documentElement.scrollTop || document.body.scrollTop;
		var cH = document.documentElement.clientHeight;
		var bH = document.body.scrollHeight * .8;
		if(sT + cH >= bH) {
			appendImg();
		}
	});

	function appendImg() {
		var str = null;
		for(var n = 1; n < 20; n++) {
			str = '<li><img src="../img/' + n + '.jpg" alt="第' + n + '张"/></li>';
			var index = compare();
			oUl[index].innerHTML += str;
		}
	};

	function compare() {
		var oldHeight = 23333333333;
		var index = 0;
		for(var i = 0; i < oUl.length; i++) {
			var newHeight = oUl[i].offsetHeight;
			if(newHeight < oldHeight) {
				oldHeight = newHeight;
				index = i;
			}
		}
		return index;
	}
}