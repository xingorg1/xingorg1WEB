// 基础配置、设置啥的，官网都有，不再赘余
let myChart = echarts.init(document.getElementById('idName'));
myChart.showLoading();//友好用户体验。。。。。。
// 画一个空表格 —— 先给客户上点水，别让桌面空着
let option={
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [],
        type: 'bar'
    }]
};
myChart.setOption(option);
//如果觉得就上一杯白开水有点寒酸难看，这一步可以等ajax响应成功后再做
// 因为数据没回来之前，饼图啥的还好，柱图和线图（有x、y轴的图），就只有两根线比较丑。但也有优点
// 提前准备好上菜的程序
function fillNewData(echartsBox,optionData){
	echartsBox.setOption({
	  xAxis: {
	    data: optionData.xData
	  },
	  series : [
	    {
	      name: optionData.seriesName,
	      data: optionData.seriesData
	    }
	  ]
	});
}
// 初始化填充一组数据，数据可以是ajax返回值来的
fillNewData(myChart,{
	xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	seriesName: '可有可无看你需要',
	seriesData: [120, 200, 150, 80, 70, 110, 130]
})
myChart.hideLoading();//友好用户体验。。。。。。

// 然后就是正经事了
myChart.on('click',(params)=>{
	console.log(params);
	// 点击后拿着params里你需要的参数去找后台大佬要新的数据,response再填充进来，如下：
	myChart.clear(); //上新菜前擦擦桌子吧。
	fillNewData(myChart,{
		xData: response.xDataFromDB,
		seriesName: response.NameFromDB,
		seriesData: response.DataFromDB
	});
});

// 至此，一个真正意义上的下钻轮回就成功了，好像也没有特别难，注意点就是重新赛数据时最好只塞几个数据的属性，样式的就不要重复搞了。
// 总结：利用echarts强大的回调函数和飞上天的params回参，貌似什么事情都能干呢~！
这只是很简陋的一个下钻思路，真正做下钻的时候，可能用户点击后你拿到的返回参数需要经过处理再返给后台，而这就需要用户点击的下标，并且把上次返回的数据保存下来用于查找具体值啥的。神烦~
