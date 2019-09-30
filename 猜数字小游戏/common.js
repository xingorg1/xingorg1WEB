var content = document.querySelector(".content");
var oP = document.querySelector(".cont1 p");
var btn = document.querySelector("button");
var resetBtn = document.querySelector(".reset");
var clientNum = document.querySelector("input");
var oldNum = document.querySelector(".cont3-box");
var resultBox = document.querySelector(".cont2 span");
var infoBox = document.querySelector(".cont4 span");
var oBtn = document.querySelector("button");
var timesNum = 0;
var radomNum = parseInt(Math.random()*100);
oBtn.onclick = function(){
	var oValue = clientNum.value;
	if(oValue == ""){//控制数字的输入格式
		oP.innerText = "空字符您让我咋猜呢？请输入数字!";
	}else if(oValue < 0 || oValue > 100){
		oP.innerText = "只要0-100以内的正整数";
	}else if(isNaN(oValue)){
		oP.innerText = "只支持数字格式，别乱填啊大爷！";
	}else{//格式无误且非空后再调用逻辑函数
		content.className = "content"; // 确定输入的是数字后，展示结果界面
		innerText(oValue);//调用“添加已测数据span结构”的innerText函数
		timesNum++;// 添加一次记录一次机会，到了十次以后输入框状态关闭
		if(timesNum == 10){
			clientNum.disabled = true;
			oBtn.disabled = true;
			content.className = "content gameover";// 十次后，game over 出现。
		}else{
			checkFun(oValue)
		}
		oP.innerText = "";//第二次填写格式正确，就去掉格式错误的提醒文字
	}
	clientNum.value = ""; //点击按钮传出去后销毁input里边的内容
}
function innerText(oValue){
	var oldNumBox = document.createElement("span");
	oldNumBox.className = 'old-num';
	oldNumBox.innerText = oValue;
	oldNum.appendChild(oldNumBox);
}
function checkFun(oValue){

	console.log(oValue);
	if(oValue > radomNum){
		resultBox.className = "info-up";
		resultBox.innerText = "你的猜测高了!";
		infoBox.className = "error";
		infoBox.innerText = "错误!";
	}else if(oValue < radomNum){
		resultBox.className = "info-down";
		resultBox.innerText = "你的猜测低了!";
		infoBox.className = "error";
		infoBox.innerText = "错误!";
	}else{
		resultBox.className = "success";
		resultBox.innerText = "你的猜测正确!";
		infoBox.className = "success";
		infoBox.innerText = "恭喜你答对了!";
	}
}
resetBtn.onclick = function(){
	// 游戏重来，刷新页面
	window.location.reload(true);
}