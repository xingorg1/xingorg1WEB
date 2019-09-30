;
function disPBL(id){
	var oBox = document.getElementById(id);
//	appendImg();
	//1.获得浏览器的宽和高，div宽度默认为一个值
	var vW = document.documentElement.clientWidth;
	var vH = document.documentElement.clientHeight;
	
	//2.计算容器内最多可容纳div的个数，使用Math.floor向下取整
	var divWidth = 230 + 16;//左右各8的间距
	var divNum = Math.floor( vW / divWidth );//获取可容纳的个数
//	alert(divNum)
	//3.设置div#box的总宽度，居中设置已写在css中。
	oBox.style.width = divWidth * divNum + "px";//记得加“px”
	
	//4.初始化一个高度数组【关键】相当于浮动式时，创建几个ul
		//这里，数组被设置成长度为7，我觉得不太合适，因为既然要做自适应的，有的屏幕不一样的话，不一定都是一排装7个啊
	var arrHeight = [0,0,0,0,0,0,0];
	//5.循环创建元素
//	function appendImg(){
		var  str = "";
		for(var a = 1; a <= 19; a++){
//			str = '<div style="position:absolute;"><img src="../../img/'+ a +'.jpg"/></div>';
//			oBox.innerHTML += str;
//因为涉及到还要定义div的top和left的位置，所以这里不用字符串创建元素。
			var oDiv = document.createElement("div");
			oDiv.style.position = "absolute";
			var oImg = document.createElement("img");
			oImg.src = "../../img/"+ a +".jpg";
			oDiv.appendChild(oImg);
	//6-1.获得最小列
			//这里不会了。自己写的时候
			var index = compare(arrHeight);
	//7.设置div定位
			oDiv.style.top = arrHeight[index] + "px";//高度数组存的是高度。
			oDiv.style.left = index * divWidth + "px";//总是忘记加上px值
	//8.跟随内容
			oBox.appendChild(oDiv);
	//9.更新高度数组
			arrHeight[index] += oDiv.offsetHeight + 8;
//			alert(oDiv.offsetHeight)
//		}
	};
	//6-2.获得最小列
	function compare(obj){
		var oldHeight = 120120120;
		var index = 0;
		for(var i = 0;i < obj.length; i++){
			var newHeight = obj[i];//obj[i]就是div的高度值，因为arrHeight数组中存的是7个高度值。
			if(newHeight < oldHeight){
				oldHeight = newHeight;
				index = i;
			}
		}
		return index;
	};
	//end
};
