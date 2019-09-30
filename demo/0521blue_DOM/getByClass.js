//获取类名为某个的元素
//function getByClass(oParent, sClass){
//	var aResult = [];
//	var aEle = oParent.getElementsByTagName("*");
//	for(var i=0;i<aEle.length;i++){
//		if(aEle[i].className==sClass){
//			aResult.push(aEle[i]);
//		}
//	}
//	return aResult;
//}

function getByClass(oParent,sClass){
	var classArr = [];//准备一个空数组
	
	var aEle = oParent.getElementsByTagName("*");//获取传过来的父元素下的所有子元素来准备“体检”
	
	for(var i=0;i<aEle.length;i++){//循环遍历获取来的所有子元素，
		if(aEle[i].className == sClass){//看其classname是否为我们要查找的那一个//如果第n个元素的classname为我们要找的
		
		classArr.push(aEle[i]);//将其push装进事先准备好的数组中。
		
		}
	}
	return classArr;//最后将数组结果弹出去。
}
