function pbl(oJson) {
	//传入参数，获取必要数据以备使用。
	var oDiv = document.getElementById(oJson.Box);
	var oUl = oDiv.getElementsByTagName(oJson.Ul);
	var nNum = oJson.num;
	var sUrl = oJson.Url;
	//在滚动之前先加载一次，防止空白页面。
	createImg();
	//滚动持续加载，onscroll来触发页面的滚动事件
	window.onscroll = function() {
		//准备参数
		var sT = document.documentElement.scrollTop || document.body.scrollTop;
		var vH = document.documentElement.clientHeight;
		var bH = document.body.scrollHeight * 0.9;
		var bHq = document.body.scrollHeight;
		/*
		 * sT:滚动条滚动的高度
		 * vH：浏览器窗口的高度
		 * bH：总的内容高度，所有文本组起来撑开body的总高度.乘以0.9表示获得高度的90%的值
		 * sT + vH == bH 就表示，滚动条已经滚到底部了。大于就表示滚超过了，
		 * 大于90%，想让滚动条还没到底的时候就加载，让效果更流畅。
		 */
		
		//做测试，计算三个元素值之间得关系，
		//		if(sT + vH == bHq) {
		//			console.log(sT + vH);
		//			console.log(bHq)
		//			判断得知，documentElement.scrollTop || document.body.scrollTop + documentElement.clientheight === body.scrollHeight的值
		//			createImg();
		//		}
		
		
		//做判断，监听滚轮的位置，
		if(sT + vH > bH) {
			createImg();//当其将要打过html高度的90%时，再次加载插入img的函数。
		}
	};
	//ulIndex函数，判断ul的高度谁最短，然后返回索引值
	/*
	 * 传参，传进来之前准备好的几个ul集合。
	 * 思考：这里不传参就不能用准备好的ul集合？
	 * 涉及函数的作用域：http://www.jb51.net/article/43068.htm
	 * 函数内的变量无法在函数外面访问，在函数内却可以访问函数外的变量。所以这里不用传参
	 * js作用域链的变量访问规则是：如果当前作用域内存在要访问的变量，则使用当前作用域的变量，否则到上一层作用域内寻找，直到全局作用域，如果找不到，则该变量为未声明。
	 */
	function ulIndex(oUl) {
		var oldHeight = 1000000000;
		//设定一个很大很大的高度值，让页面在一开始加载的时候，作比较用，目的上让随便一个ul都小于他，这样后边的if就会成立
		var index = 0
		//初始化index值
		for(var i = 0; i < oUl.length; i++) {
			//在现有的几个ul集合中遍历，循环。
			var nowHeight = oUl[i].offsetHeight;
			//错误想法：oUl.offsetHeight = oUl.style.height；
//			这种情况下,适用于css设置了高度时,用js获取高度,两个方法获取的是一样的,但如果只是用js填入内容,在css来说,高度还是不变的.所以就不能达到效果.
			//			alert(nowHeight)
			if(nowHeight <= oldHeight) {
				//通过赋值，来达到比较几个集合的目的
				oldHeight = nowHeight;//错误写法newHeight = oldHeight;//注意二者关系是谁等于谁！！
				//获取到这个ul的下标赋给index
				index = i;
			}
		}
		return index;
		//返回这个ul的索引值
	};

	//createImg函数：一个完整版本的创建
	function createImg() {
		var src = null;
		//小于等于19的话，一次性就会加载19张
		for(var a = 1; a <= nNum; a++) {
			//创建li和img结构，并将图片序号设为动态
			src = "<li><img " + sUrl + a + ".jpg' alt=''/></li>"
			//这里再次取得传过来的符合条件的ul下标，
			/*
			 * 这个处理方法很巧妙。因为ul的循环次数和图片的插入不同，应该是两个步骤。
			 * 而通过回调函数传参的方法把ul遍历计算出来的符合条件的下标传进这个函数中，
			 * 利用了另一个函数return和这个函数调用获得结果这一思想。很巧妙地化解了碰撞的难题。
			 */
			var index = ulIndex(oUl);
			//最后把当前的图片加入到符合条件的ul中。
			oUl[index].innerHTML += src;
		}
	};
}