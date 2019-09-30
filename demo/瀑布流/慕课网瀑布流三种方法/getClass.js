//获取class名为某个的元素——函数封装
getClass("main","box");
/* 
 * 根据class获取元素.
 * 原理是，取出oparent下的所有元素，组成数组，然后遍历类名，全等判断。
*/
function getClass(oParent,clsName){
	var boxArr = new Array();
	//boxArr 用来存储获取到的所有class为clsName的元素
	
	oElements  = oParent.getElementsByTagName('*');
	//oElements 获得的是父元素下的所有元素，是一个集合
	
	for(var i=0;i<oElements.length;i++){
		//循环遍历获取到的oElements数组
		
		if(oElements[i].className == clsName){
			//判断数组中，元素的类名如果和传过来的想要获取的类名一致的话
			
			boxArr.push(oElements[i]);
			//利用数组的push功能把对应的元素装进去
		}
	}
	alert(boxArr)
	return boxArr;
	//弹出最后的结果
}
