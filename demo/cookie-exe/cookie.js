/*****设置cookie*****/
function setCookie(name, value, iDay) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);
	document.cookie = name + '=' + value + ';expires=' + oDate;
}
/*****获取cookie*****/
function getCookie(name) {
	var arr = document.cookie.split("; ");
	for(var i = 0; i < arr.length; i++) {
		var arr2 = arr[i].split("=");
		if(arr2[0] == name) {
			return arr2[1]
		}
	}
	return ""
}
/*****移除cookie*****/
function removeCookie(name) {
	setCookie(name, 1, -1);
};
