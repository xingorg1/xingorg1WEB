function pbl(oJson) {
	var oDiv = document.getElementById(oJson.Box);
	var oUl = oDiv.getElementsByTagName(oJson.Ul);
	var nNum = oJson.num;
	var sUrl = oJson.Url;
	createImg();
	//滚动持续加载
	window.onscroll = function() {
		var sT = document.documentElement.scrollTop || document.body.scrollTop;
		var vH = document.documentElement.clientHeight;
		var bH = document.body.scrollHeight * 0.9;
		if(sT + vH > bH) {
			createImg();
		}
	};
	//判断ul的高度谁最短，然后返回索引值
	function ulIndex(oUl) {
		var oldHeight = 1000000000;
		var index = 0
		for(var i = 0; i < oUl.length; i++) {
			var nowHeight = oUl[i].offsetHeight;
			if(nowHeight <= oldHeight) {
				oldHeight = nowHeight;
				index = i;
			}
		}
		return index;
	};
	//第一版本的创建——createImg函数；
	function createImg() {
		var src = null;
		for(var a = 1; a <= nNum; a++) {
			src = "<li><img "+ sUrl + a + ".jpg' alt=''/></li>"
			var index = ulIndex(oUl);
			oUl[index].innerHTML += src;
		}
	};
}