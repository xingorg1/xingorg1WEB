// js版本的tab选项卡。
function tab(){
	var oDiv = document.getElementById("div1");
	var oLi = oDiv.getElementsByTagName("input");
	var oDivs = oDiv.getElementsByTagName("div");
	for(var i = 0; i < oLi.length; i++){
		oLi[i].index = i;
		oLi[i].onclick = function(){
			for(var j = 0; j < oLi.length; j++){
				oLi[j].className = "";
				oDivs[j].style.display = "none";
			}
			this.className = "active";
			oDivs[this.index].style.display = "block";
		}
	}
}
// 弹窗设置div的样式
function mwjs1(){
	var startBtn = document.getElementById("mwjs1BtnSet"),
			beSet = document.getElementById("mwjs1bySeted"),
			wrapOfSet = document.getElementById("mwjsPopWrap"),
			closeSet = document.getElementById("mwjsPopClose"),
			resetSet = document.getElementById("mwjs1Reset"),
			submitSet = document.getElementById("mwjs1Submit"),
			w200 = document.getElementById("mwjsWidth200"),
			w300 = document.getElementById("mwjsWidth300"),
			w500 = document.getElementById("mwjsWidth500"),
			h200 = document.getElementById("mwjsHeight200"),
			h300 = document.getElementById("mwjsHeight300"),
			h500 = document.getElementById("mwjsHeight500"),
			bor4 = document.getElementById("mwjsBorder4"),
			bor6 = document.getElementById("mwjsBorder6"),
			bor8 = document.getElementById("mwjsBorder8"),
			bgRed = document.getElementById("mwjsBorderRed"),
			bgYellow = document.getElementById("mwjsBorderYellow"),
			bgBlue = document.getElementById("mwjsBorderBlue");
	// open
	function displayFun(a,b,c,m){
		m.onclick = function(){
			b.style.display = a;
			c.style.display = a;
		}
	}
	displayFun("none",mask,wrapOfSet,submitSet);
	displayFun("block",mask,wrapOfSet,startBtn);
	closeSet.onclick  = function(){
		if(confirm("设置还没保存确定要关闭吗？")){
			mask.style.display = "none";
			wrapOfSet.style.display = "none";
		}
	}
	// reset
	resetSet.onclick = function(){
			beSet.style.width = 100 + "px";
			beSet.style.height = 100 + "px";
			beSet.style.borderWidth = 1 + "px";
			beSet.style.backgroundColor = "#fff";
	}
	// change
	// function widthFun(a,c){
	// 	a.onclick = function(){
	// 		beSet.style.width = c+"px";
	// 		this.className = "mwjs-1-seting-cur";
	// 	}
	// }
	// widthFun(w200,200);
	// widthFun(w300,300);
	// widthFun(w500,500);
	// function heightFun(a,c){
	// 	a.onclick = function(){
	// 		beSet.style.height = c+"px";
	// 		this.className = "mwjs-1-seting-cur";
	// 	}
	// }
	// heightFun(h200,200);
	// heightFun(h300,300);
	// heightFun(h500,500);
	// function borFun(a,c){
	// 	a.onclick = function(){
	// 		beSet.style.borderWidth = c+"px";
	// 		this.className = "mwjs-1-seting-cur";
	// 	}
	// }
	// borFun(bor4,2);
	// borFun(bor6,6);
	// borFun(bor8,8);
	// function bgFun(a,c){
	// 	a.onclick = function(){
	// 		beSet.style.backgroundColor = c;
	// 		this.className = "mwjs-1-seting-cur";
	// 	}
	// }
	// bgFun(bgRed,"red");
	// bgFun(bgYellow,"yellow");
	// bgFun(bgBlue,"blue");
	// 二度封装版
	function clickFun(a,b,c,d){
		a.onclick = function(){
			beSet.style[b] = d;
			beSet.style[b] = c+"px";
			this.className = "mwjs-1-seting-cur";
		}
	}
	clickFun(w200,"width","200");
	clickFun(w300,"width","300");
	clickFun(w500,"width","500");
	clickFun(h200,"height","200");
	clickFun(h300,"height","300");
	clickFun(h500,"height","500");
	clickFun(bor4,"borderWidth","4");
	clickFun(bor6,"borderWidth","6");
	clickFun(bor8,"borderWidth","8");
	clickFun(bgRed,"backgroundColor","","red");
	clickFun(bgYellow,"backgroundColor","","yellow");
	clickFun(bgBlue,"backgroundColor","","blue");
}
// 时间函数
function timeFun(a,b){
	var time = new Date();
	var year = time.getFullYear();
	var mouth = time.getMonth()+1;
	var day = time.getDate();
	var xs = time.getHours();
	var min = time.getMinutes();
	var sec = time.getSeconds();
	mouth<10?mouth = "0"+mouth:mouth;
	xs<10?xs = "0"+xs:xs;
	day<10?day = "0"+day:day;
	min<10?min = "0"+min:min;
	sec<10?sec = "0"+sec:sec;
	console.log(year+"-"+mouth+"-"+day+" "+xs+":"+min+":"+sec);
	var show = year+"-"+mouth+"-"+day+" "+xs+":"+min+":"+sec;
	var timeBox = document.getElementById(a);
	var timeShow = document.getElementById(b);
		timeBox.innerText = time;
		timeShow.innerText = show;
	console.log(time)
}
window.onload = function(){
	var mask = document.getElementById("mask");
	tab();
	mwjs1();
	timeFun("time-box","time-show");
	setInterval('timeFun("time-box","time-show")',1000);
}