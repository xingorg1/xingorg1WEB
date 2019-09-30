var checkPhone = function(inputId){
	var oPhoneNum = document.getElementById(inputId);
	var filter = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
	return filter.test(oPhoneNum.value);
}
// checkPhone('phoneNum','submit');
function test(btnId){
	var oSubmit = document.getElementById(btnId);
	oSubmit.onclick = function(){
		var a = checkPhone('phoneNum');
		console.log(a);
	};
};
test('submit');

var name1 = document.getElementById('name1');
var name1btn = document.getElementById('name1btn');
function trimSpace(str){ 
	return str.replace(/(^\s*)|(\s*$)/g, ""); 
}
name1btn.onclick = function(){
	console.log(name1.value)
	var trimValue = trimSpace(name1.value)
	var filter = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
	console.log(filter.test(trimValue))
}