//生成符合条件城市们的值和坐标的数组
var convertData = function (data) {
	var res = [];
	for (var i = 0; i < data.length; i++) {
		var geoCoord = geoCoordMap[data[i].name];
		var op = (data[i].value / 30000).toFixed(2);
		op = op >= 1 ? 1 : op;
		op = op <= 0.1 ? 0.1 : op;
		if (geoCoord) {
			res.push({
				name: data[i].name,
				value: geoCoord.concat(data[i].value),
				itemStyle: {
					opacity: op
				}
			});
		}
	}
	return res;
};
var echartsMap = echarts.init(document.getElementById('echartsMap'));
// var resultMapArr = [
//     {isnext: 1, dvalue: 1701, name: "沈阳", value: 840},
//     {isnext: 1, dvalue: 1301, name: "长沙", value: 756},
//     {isnext: 1, dvalue: 2301, name: "西安", value: 600},
//     {isnext: 1, dvalue: 501, name: "广州", value: 564},
//     {isnext: 1, dvalue: 2401, name: "上海", value: 540},
//     {isnext: 1, dvalue: 101, name: "合肥", value: 480},
//     {isnext: 1, dvalue: 201, name: "北京", value: 468},
//     {isnext: 1, dvalue: 2501, name: "成都", value: 456},
//     {isnext: 1, dvalue: 2101, name: "济南", value: 444},
//     {isnext: 1, dvalue: 2201, name: "太原", value: 432},
//     {isnext: 1, dvalue: 502, name: "深圳", value: 396},
//     {isnext: 1, dvalue: 906, name: "廊坊", value: 396},
//     {isnext: 1, dvalue: 901, name: "石家庄", value: 336},
//     {isnext: 1, dvalue: 1101, name: "哈尔滨", value: 336}
// ];
// 地图配置
function mapOption(callback) {
	return {
		tooltip: {
			trigger: 'item',
			formatter: function (params, ticket, callback) {
				return '线索所在城市<br/>' + params.data.name + '：' + params.data.value[2]
			}
		},
		// 图例
		legend: {
		    orient: 'vertical',
		    x:'60',
		    y: '80%',
		    textStyle: {
		        color: '#fff'
		    },
		    selectedMode: true,
		    data:['线索所在城市']
		},
		// 散点图
		geo: [{
			map: 'china',
			top: 80,
			label: {
				emphasis: {
					show: false //鼠标经过显示区域的名字
				}
			},
			zoom: 1.2,
			roam: true, //是否开启鼠标缩放和平移漫游
			itemStyle: {
				normal: { //正常情况下，
					areaColor: 'rgb(22,31,77)', //地图区域的颜色。
					borderColor: 'rgb(9,9,24)', //省份边界的border色
					borderWidth: 1
				},
				emphasis: {
					areaColor: 'rgb(22,31,77)' //悬浮于省份区域，加重显示,后取消本效果
				}
			}
		}],
		series: [
			// 地图基础信息
			{
				name: '线索所在城市',
				type: 'scatter',
				coordinateSystem: 'geo',
				data: convertData(dataInit),
				symbolSize: function (val) {
					// 设置高亮点的大小随数据大小而变。不过也有最大值和最小值
					var Val = val[2] / 10;
					if (Val > 55) {
						Val = 55;
					} else if (Val < 10) {
						Val = 10
					}
					return Val;
				},
				label: {
					normal: {
						formatter: '{b}',
						position: 'right',
						show: false
					},
					emphasis: {
						show: true
					}
				},
				itemStyle: {
					normal: {
						color: 'white' //圆点的颜色
					}
				}
			},
			// 高亮的样式+动画
			{
				name: '线索所在城市',
				type: 'effectScatter', //涟漪特效_散点气泡
				coordinateSystem: 'geo',
				data: convertData(dataInit.sort(function (a, b) {
					return b.value - a.value;
				}).slice(0, 6)),
				symbolSize: function (val) {
					var Val = val[2] / 10;
					if (Val > 55) {
						Val = 55;
					} else if (Val < 10) {
						Val = 10
					}
					return Val;
	
				},
				animationDuration: 3000,
				animationEasing: function (k) {
					return k * k * k * k;
				},
				animationDelay: 3000,
				// animationDuration: function (idx) {
				//     // 越往后的数据延迟越大
				//     return idx * 10000000;
				// },
				animationEasingUpdate: function (k) {
					return k;
				},
				showEffectOn: 'render',
				rippleEffect: {
					brushType: 'stroke', //fill
					scale: 3 //动画波动范围
				},
				hoverAnimation: false,
				label: {
					normal: { //正常情况下，都显示文字
						formatter: '{b}',
						position: 'right',
						show: true
					}
				},
				itemStyle: {
					normal: {
						opacity: 1,
						color: 'white' //样式颜色
					}
				},
				zlevel: 1 //层级
			}
		]
	};
}
echartsMap.setOption(mapOption());
// 呼吸灯
var resultMapArr = [{
		isnext: 1,
		dvalue: 1701,
		name: "沈阳",
		value: 840
	},
	{
		isnext: 1,
		dvalue: 1301,
		name: "长沙",
		value: 756
	},
	{
		isnext: 1,
		dvalue: 2301,
		name: "西安",
		value: 600
	},
	{
		isnext: 1,
		dvalue: 501,
		name: "广州",
		value: 564
	},
	{
		isnext: 1,
		dvalue: 2401,
		name: "上海",
		value: 540
	},
	{
		isnext: 1,
		dvalue: 101,
		name: "合肥",
		value: 480
	},
	{
		isnext: 1,
		dvalue: 201,
		name: "北京",
		value: 468
	},
	{
		isnext: 1,
		dvalue: 2501,
		name: "成都",
		value: 456
	},
	{
		isnext: 1,
		dvalue: 2101,
		name: "济南",
		value: 444
	},
	{
		isnext: 1,
		dvalue: 2201,
		name: "太原",
		value: 432
	},
	{
		isnext: 1,
		dvalue: 502,
		name: "深圳",
		value: 396
	},
	{
		isnext: 1,
		dvalue: 906,
		name: "廊坊",
		value: 396
	},
	{
		isnext: 1,
		dvalue: 901,
		name: "石家庄",
		value: 336
	},
	{
		isnext: 1,
		dvalue: 1101,
		name: "哈尔滨",
		value: 336
	}
]; //数据有变化的城市
dealMapData();
function dealMapData() {
	var showTimer,
		showResultArr = [],
		showNums = 0, //闪烁次数
		InitNum = 0,
		len = resultMapArr.length,
		showIntervals = parseInt(3000 / len) <= 500 ? 420 : parseInt(3000 / (len + 1)), //闪烁间隔
		showItemNum = Math.ceil(len / 6); //每次展示的条数
	function showFun() {
		showResultArr = resultMapArr.slice(InitNum, showItemNum);
		console.log(showResultArr);
		if(showResultArr.length <　1){
			return false
		}
		echartsMap.setOption({
			series: [{
					name: '线索所在城市',
					data: convertData(dataInit)
				},
				{
					name: '高亮城市',
					data: convertData(showResultArr) //每次传进来一个数据
				}
			]
		});
		showResultArr = [];
		InitNum = showItemNum;
		showItemNum = showItemNum + Math.ceil(len / 6);
		showTimer = setTimeout(() => {
			echartsMap.setOption({
				series: [{
						name: '线索所在城市',
						data: convertData(dataInit)
					},
					{
						name: '高亮城市',
						data: []
					}
				]
			});
			showFun();
		}, showIntervals);
	}
	showFun();
}