window.onload = function(){
	getClass("main","box");
	function getClass(oParent,clsName){
		var oParent = document.getElementById(oParent);
		var boxArr = new Array();
		oElements  = oParent.getElementsByTagName('*');
		for(var i=0;i<oElements.length;i++){
			if(oElements[i].className == clsName){
				boxArr.push(oElements[i]);
			}
		}
		alert(boxArr)
		return boxArr;
	}
}
