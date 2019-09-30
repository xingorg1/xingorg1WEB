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

// 地图配置
function mapOption(callback) {
	return {
		backgroundColor: '#404a59',
    title: {
        text: '全国主要城市空气质量',
        subtext: 'data from PM25.in',
        sublink: 'http://www.pm25.in',
        left: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip : {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        y: 'bottom',
        x:'right',
        data:['pm2.5'],
        textStyle: {
            color: '#fff'
        }
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#111'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    series : [
        {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(dataInit),
            symbolSize: function (val) {
                return val[2] / 10;
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
                    color: '#ddb926'
                }
            }
        },
        // {
        //     name: 'Top 5',
        //     type: 'effectScatter',
        //     coordinateSystem: 'geo',
        //     data: convertData(data.sort(function (a, b) {
        //         return b.value - a.value;
        //     }).slice(0, 6)),
        //     symbolSize: function (val) {
        //         return val[2] / 10;
        //     },
        //     showEffectOn: 'render',
        //     rippleEffect: {
        //         brushType: 'stroke'
        //     },
        //     hoverAnimation: true,
        //     label: {
        //         normal: {
        //             formatter: '{b}',
        //             position: 'right',
        //             show: true
        //         }
        //     },
        //     itemStyle: {
        //         normal: {
        //             color: '#f4e925',
        //             shadowBlur: 10,
        //             shadowColor: '#333'
        //         }
        //     },
        //     zlevel: 1
        // }
    ]}
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