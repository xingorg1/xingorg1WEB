/*
 * @Author: guojufeng@ 
 * @Date: 2017-12-18 11:04:22
 * 分页
 * @param {object=} parameter 参数配置
 * @param {number} parameter.btnSums: 每页当中显示按钮个数
 * @param {number} parameter.showSums: 单页中数据展示条数
 * @param {number} parameter.dataSum: 数据条数总和
 * @param {string} parameter.idName: ul元素的id名
 * @param {boolean} parameter.isEP: 是否平台
 * btnSums,showSums,dataSum,idName,callBack
*/
function initPagination(parameter){
	var currentPage = 1,	//当前页数
			// btnNum = parameter.btnSums,				//按钮个数
			// showSum = parameter.showSums,			//每次展示的条数
			// arrSum = parameter.dataSum,			//记录的总条数
			pageSum = parseInt(Math.ceil(parameter.dataSum/parameter.showSums));//总页数,也是末尾页btn的页码
			pagination();
	function pagination(){
		// console.log(this.currentPage)
	//  	console.log(currentPage,parameter.btnSums,parameter.showSums,parameter.dataSum,pageSum);
	// 生成【假的】数据
		var arr = [];
		for (var i = 0; i < parameter.dataSum; i++) {
			arr.push[i];
			//问题1：arr每次都是0条？console后length都是0？但是看示例代码就不是。
			// console.log(arr)
		}

	// 生成页数模板
		// 定义首末两个btn
		var startPage = Math.max(1, currentPage - parseInt(parameter.btnSums / 2)),
				endPage = Math.min(pageSum, startPage + (parameter.btnSums - 1));
				 // endPage = Math.min(pageSum, (currentPage + parseInt(parameter.btnSums / 2))-1);//这种适用于btnNum能整除2的情况
				// console.log(startPage,endPage,pageSum)

		// 拼接字符串
		var pageStr = '';
		var pageTxts = {
			lessThanOne: '<li class="prev disable"><span class="normal-state">首页</span></li><li class="prev disable"><span class="normal-state"><i class="icon icon-previouspage"></i>《</span></li>',
			oneToSix: '<li class="prev"><a href="javascript:;" data-num="1">首页</a></li><li class="prev"><a href="javascript:;" data-num="' + (currentPage - 1) + '"><i class="icon icon-previouspage"></i>《</a></li>',
			equalToSeven: '<li><a data-num="1" href="javascript:;">...</a></li>',
			greaterThanSenven: '<li><a data-num="' + (currentPage - 5) + '" href="javascript:;">...</a></li>',
			greaterThanPageSum: '<li class="next disable"><span class="normal-state"><i class="icon icon-nextpage"></i>》</span></li><li class="next disable"><span class="normal-state">末页</span></li>',
			lessThanEleven: '<li class="next"><a href="javascript:;" data-num="' + (currentPage + 1) + '"><i class="icon icon-nextpage"></i>》</a></li><li class="next"><a href="javascript:;" data-num="' + pageSum + '">末页</a></li>',
			lessEqualTen: '<li><a data-num="11" href="javascript:;">...</a></li>',
			othersPage: '<li><a data-num="' + (currentPage + 5) + '" href="javascript:;">...</a></li>'
		};
		if(!parameter.isEP){
      pageTxts.lessThanOne = '<li class="prev disable"><span class="normal-state">&lt;</span></li>';
      pageTxts.oneToSix = '<li class="prev"><a href="javascript:;" data-num="' + (currentPage - 1) + '">&lt;</a></li>';
      pageTxts.equalToSeven = '<li><a href="javascript:;" data-num="1">1</a></li><li><a data-num="1" href="javascript:;">...</a></li>';
      pageTxts.greaterThanSenven = '<li><a href="javascript:;" data-num="1">1</a></li><li><a data-num="' + (currentPage - 5) + '" href="javascript:;">...</a></li>';
      pageTxts.greaterThanPageSum = '<li class="next disable"><span class="normal-state">&gt;</span></li>';
      pageTxts.lessThanEleven = '<li class="next"><a href="javascript:;" data-num="' + (currentPage + 1) + '">&gt;</a></li>';
      pageTxts.lessEqualTen = '<li><a data-num="11" href="javascript:;">...</a></li><li><a href="javascript:;" data-num="' + pageSum + '">' + pageSum + '</a></li>';
      pageTxts.othersPage = '<li><a data-num="' + (currentPage + 5) + '" href="javascript:;">...</a></li><li><a href="javascript:;" data-num="' + pageSum + '">' + pageSum + '</a></li>';
    };
		if(pageSum > 1){
			// 上一页和首页按钮
			if(currentPage <= 1){
				// 注意使用 “+=” 连接符
				pageStr += pageTxts.lessThanOne;
			}else{
				if(currentPage >= 1 && currentPage < 7){
					pageStr += pageTxts.oneToSix;
				}else{
					if(currentPage == 7){
						pageStr += pageTxts.oneToSix + pageTxts.equalToSeven;
					}else{
						pageStr += pageTxts.oneToSix + pageTxts.greaterThanSenven;
					}
				}
				
			};
			// 中间页遍历实现 25 30 34
			for(var centerPage = startPage; centerPage <= endPage; centerPage++){
				// 遇到当前页就会样式不一样，其他页都是一个样子
				if(currentPage == centerPage){
					pageStr += '<li class="active"><span class="normal-state">'+ centerPage +'</span></li>';
				}else{
					pageStr += '<li><a href="javascript:;" data-num="' + centerPage + '">' + centerPage + '</a></li>';
				}
			}
			// 下一页和尾页按钮
			if(currentPage >= pageSum){
				pageStr += pageTxts.greaterThanPageSum;
			}else{
				if(pageSum < 11){
						pageStr += pageTxts.lessThanEleven;
				}else{
					if(currentPage <= 10){
						pageStr += pageTxts.lessEqualTen + pageTxts.lessThanEleven;
					}else{
						if((pageSum - currentPage)<=5){
							pageStr += pageTxts.lessThanEleven;
						}else{
							pageStr += pageTxts.othersPage + pageTxts.lessThanEleven;
						}
					}
				}
			};
		};
		var pageBox = document.getElementById(parameter.ulId);
	  pageBox.innerHTML = pageStr;

	  // 开始监听分页的交互、发送页码ajax
		var listTag = pageBox.getElementsByTagName('a');
		for (var linkA = 0; linkA < listTag.length; linkA++) {
			listTag[linkA].onclick = function(){
				var clickedPage = Number(this.getAttribute('data-num'));
				clickedNum(clickedPage);
				parameter.callbackFun(clickedPage);
				return false;//这里为什么要return false？是不是阻止a链接的默认事件？
			}
		};
	}
	function clickedNum(dataNum){
		currentPage = dataNum;
		pagination();
	};
	// 每次点击按钮，循环把获取的数据套进模板里
}
		