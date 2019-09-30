/* echarts */
var commonSty = {
  dev: window.devicePixelRatio,
  fSize: function () {
    return this.dev * 12 || 24;
  },
  legendS: function () {
    return this.dev * 8 || 16;
  },
  toolLegendSize: function () {
    var str = this.dev ?
              ';vertical-align: 0px;margin-right:'+ this.dev * 3 + 'px;border-radius:' + this.dev* 1 + 'px;width:' + this.dev* 8 + 'px;height:' + this.dev* 8 + 'px;': '';
    return str || ';vertical-align: 0px;margin-right:6px;border-radius:2px;width:16px;height:16px;';
  },
  toolLegendPad: function () {
    var str = this.dev ? this.dev* 3 + 'px ' + this.dev* 6 + 'px ' + this.dev* 2 + 'px ' + this.dev* 7 + 'px' : '';
    return str || '6px 12px 4px 14px';
  },
  // 左上角图例
  Mylegend: function (arrName) {
    return {
      data: arrName,
      itemGap: 20,
      left: 0,
      itemWidth: commonSty.legendS(),
      itemHeight: commonSty.legendS(),
      padding: 0,
      textStyle: {
        fontSize: commonSty.fSize(),
      }
    }
  },
  /* 坐标指示器 */
  axisPoi: function (data) {
    return {
      value: data[data.length - 1],
      snap: false,
      lineStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [{
              offset: 0,
              color: 'rgba(234,19,99,0.15)'
            },
            {
              offset: 0.5,
              color: 'rgba(234,19,99,0.7)'
            },
            {
              offset: 1,
              color: 'rgba(234,19,99,0.15)'
            }
          ]
        ),
        opacity: 1,
        width: 2
      },
      label: {
        show: true,
        color: '#FF4389',
        fontSize: commonSty.fSize() + '',
        padding: [3, 6, 2, 7],
        backgroundColor: 'rgba(255,225,235,0.9)',
        barBorderRadius: '50%'
      },
      handle: {
        show: true,
        size: 0
      }
    }
  },
  /* tooltip的坐标指示器 */
  toolAxisPoi: function(){
    return {//坐标指示器
      type: 'line',
      axis: 'x',
      snap: false,
      lineStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [{
              offset: 0,
              color: 'rgba(234,19,99,0.15)'
            },
            {
              offset: 0.5,
              color: 'rgba(234,19,99,0.7)'
            },
            {
              offset: 1,
              color: 'rgba(234,19,99,0.15)'
            }
          ]
        ),
        opacity: 1,
        width: 2
      },
      label: {
        show: false,
        color: '#FF4389',
        fontSize: commonSty.fSize() + '',
        padding: [3, 6, 2, 7],
        backgroundColor: 'rgba(255,225,235,0.9)',
        barBorderRadius: '50%'
      },
    }
  },
  /* x轴 */
  xSty: function (data) {
    return {
      type: 'category',
      data: data,
      axisLabel: {
        color: '#999EAE',
        fontSize: commonSty.fSize(),
        fontWeight: 600
      },
      axisLine: {
        lineStyle: {
          width: 0,
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      /* 指示器 */
      // axisPointer: commonSty.axisPoi(data),
    }
  },
  /* y轴公用 */
  ySty: function () {
    return {
      type: 'value',
      offset: 40,
      axisLabel: {
        margin: 0,
        align: 'left',
        color: '#999EAE',
        fontSize: commonSty.fSize(),
        fontWeight: 600,
      },
      axisLine: {
        lineStyle: {
          width: 0,
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      }
    }
  },
  /* 网格位置 */
  gridSty: {
    left: '40',
    right: 0,
    top: '100'
  },
  /* 点击节点展示的数据 */
  singleTool: function () {
    return {
      trigger: 'axis',
      textStyle: {
        fontSize: commonSty.fSize(),
        color: '#000'
      },
      alwaysShowContent: true,
      backgroundColor: 'transparent',
      borderColor: '#eee',
      padding: 0,
      formatter: function (params) {
        return '<span style="padding:'+ commonSty.toolLegendPad() + ';border-radius: 200px;background: rgba(255,225,235,0.9);color: #FF4389;font-size: ' + commonSty.fSize() + 'px">' + params[0].value + '</span>';
      },
      position: function (pos, params, dom, rect, size) {
        let left1  = pos[0],
        top1 = pos[1],
        // Tleft = size.viewSize[0] - size.contentSize[0],
        Ttop = size.viewSize[1] - size.contentSize[1] - 70;
        if(top1 >Ttop ){
            top1 = Ttop;
        }
        return {left: left1, top: top1};
      },
      axisPointer: commonSty.toolAxisPoi()
    }
  },
  groupTool: function (percent) {
    var percent = percent || false;
    return {
      trigger: 'axis',
      textStyle: {
        fontSize: commonSty.fSize(),
        color: '#000'
      },
      backgroundColor: 'rgba(255,255,255,0.9)',
      extraCssText: 'box-shadow: 0px 8px 20px 0px rgba(56,70,140,0.13);',
      padding: [12, 16, 12, 12],
      // borderColor: '#eee',
      // width: '218',
      // shadowBlur: 5,
      // shandowColor: 'red',
      formatter: function (params) {
        var str = '';
        for (var i = 0; i < params.length; i++) {
          str += '<span style="display:inline-block;background-color:' + params[i].color + commonSty.toolLegendSize() + '"></span>' + '<span style="margin-right: 20px;">' + params[i].value;
          if ((i + 1) % 3 == 0 && i !== 0) {
            str += '</span></br>';
          } else {
            if (percent && i == 1) {
              str += '% </span>';
            } else {
              str += '</span>';
            }
          }
        }
        return str
      },
      axisPointer: commonSty.toolAxisPoi()
    }
  }
}
var dom = document.getElementById("echart011");
var myChart = echarts.init(dom);
var options = {
  color: ['#3366FF'],
  tooltip: commonSty.singleTool(),
  grid: commonSty.gridSty,
  xAxis: commonSty.xSty(['10.11', '10.12', '10.13', '10.14', '10.15', '10.16', '10.17', '10.18', '10.19', '10.20', '10.21']),
  yAxis: commonSty.ySty(),
  legend: commonSty.Mylegend([{
    name: '线索量',
    textStyle: {
      color: '#999EAE'
    }
  }]),
  dataZoom: [{
    type: 'inside',
    rangeMode: ['value','value'],
    start: 64,
    end: 100,
    preventDefaultMouseMove: false,
    zoomLock: true
  }],
  series: [{
    data: [120, 200, 150, 200, 150, 200, 150, 200, 150, 200, 150],
    type: 'line'
  }]
};
if (options && typeof options === "object") {
  console.log(2)
  myChart.setOption(options, true);
}
var echartsEle = {
  echart011: echarts.init(document.getElementById('echart011')),
  // echart012: echarts.init(document.getElementById('echart012')),
  // echart013: echarts.init(document.getElementById('echart013')),
  // echart014: echarts.init(document.getElementById('echart014')),
  // echart015: echarts.init(document.getElementById('echart015')),
  option011: {
    color: ['#3366FF'],
    tooltip: commonSty.singleTool(),
    grid: commonSty.gridSty,
    xAxis: commonSty.xSty(['10.11', '10.12', '10.13', '10.14', '10.15', '10.16', '10.17', '10.18', '10.19', '10.20', '10.21']),
    yAxis: commonSty.ySty(),
    legend: commonSty.Mylegend([{
      name: '线索量',
      textStyle: {
        color: '#999EAE'
      }
    }]),
    dataZoom: [{
      type: 'inside',
      rangeMode: ['value','value'],
      start: 64,
      end: 100,
      preventDefaultMouseMove: false,
      zoomLock: true
    }],
    series: [{
      name: "线索量",
      barMaxWidth: '40',
      data: [120, 200, 150, 200, 150, 200, 150, 200, 150, 200, 150],
      type: 'bar'
    }]
  },
  option012: {
    color: ['#3366FF', '#17CAB8', '#7A53F4', '#FBAE47', '#FC5584'],
    tooltip: commonSty.groupTool(),
    grid: commonSty.gridSty,
    xAxis: commonSty.xSty(['10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.11', '10.12']),
    yAxis: commonSty.ySty(),
    legend: commonSty.Mylegend([{
      name: '店铺话单',
      icon: 'roundRect',
      textStyle: {
        color: '#3366FF'
      }
    }, {
      name: '店铺订单',
      icon: 'roundRect',
      textStyle: {
        color: '#17CAB8'
      }
    }, {
      name: '个人话单',
      icon: 'roundRect',
      textStyle: {
        color: '#7A53F4'
      }
    }, {
      name: '个人订单',
      icon: 'roundRect',
      textStyle: {
        color: '#FBAE47'
      }
    }, {
      name: '个人聊单',
      icon: 'roundRect',
      textStyle: {
        color: '#FC5584'
      }
    }]),
    dataZoom: [{
      type: 'inside',
      start: 50,
      end: 100,
      preventDefaultMouseMove: false,
      zoomLock: true
    }],
    series: [{
      name: "店铺话单",
      data: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 4,
      },
      // symbolSize: 0,
      stack: '总量',
      areaStyle: {
        normal: {
          color: '#3366FF',
        }
      },
      emphasis: {
        itemStyle: {
          color: 'rgba(255,67,137,1)',
          borderWidth: 8,
          borderColor: 'rgba(255,38,119,0.1942)'
        },
      },
      showSymbol: false,
    }, {
      name: "店铺订单",
      data: [160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160],
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 4,
      },
      // symbolSize: 0,
      stack: '总量',
      areaStyle: {
        normal: {
          color: '#17CAB8',
        }
      },
      emphasis: {
        itemStyle: {
          color: 'rgba(255,67,137,1)',
          borderWidth: 8,
          borderColor: 'rgba(255,38,119,0.1942)'
        },
      },
      showSymbol: false,
    }, {
      name: "个人话单",
      data: [240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240],
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 4,
      },
      // symbolSize: 0,
      stack: '总量',
      areaStyle: {
        normal: {
          color: '#7A53F4',
        }
      },
      emphasis: {
        itemStyle: {
          color: 'rgba(255,67,137,1)',
          borderWidth: 8,
          borderColor: 'rgba(255,38,119,0.1942)'
        },
      },
      showSymbol: false,
    }, {
      name: "个人订单",
      data: [320, 320, 320, 320, 320, 320, 320, 320, 320, 320, 320, 320, 320, 320],
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 4,
      },
      // symbolSize: 0,
      stack: '总量',
      areaStyle: {
        normal: {
          color: '#FBAE47',
        }
      },
      emphasis: {
        itemStyle: {
          color: 'rgba(255,67,137,1)',
          borderWidth: 8,
          borderColor: 'rgba(255,38,119,0.1942)'
        },
      },
      showSymbol: false,
    }, {
      name: "个人聊单",
      data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 4,
      },
      // symbolSize: 0,
      stack: '总量',
      areaStyle: {
        normal: {
          color: '#FC5584',
        }
      },
      emphasis: {
        itemStyle: {
          color: 'rgba(255,67,137,1)',
          borderWidth: 8,
          borderColor: 'rgba(255,38,119,0.1942)'
        },
      },
      showSymbol: false,
    }]
  },
  option013: {
    color: ['#3366FF', '#FBAE47'],
    tooltip: commonSty.groupTool(true),
    grid: {
      left: '40',
      // right: '9%',
      top: '100'
    },
    xAxis: commonSty.xSty(['10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10']),
    yAxis: [
      commonSty.ySty(),
      {
        type: 'value',
        // position: 'left',
        // offset: '120',
        axisLabel: {
          color: '#999EAE',
          fontWeight: 600,
          fontSize: commonSty.fSize,
          formatter: '{value}%'
        },
        axisLine: {
          lineStyle: {
            width: 0,
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    legend: commonSty.Mylegend([{
      name: '400有效来电',
      textStyle: {
        color: '#3366FF'
      }
    }, {
      name: '店铺接起率',
      icon: 'roundRect',
      textStyle: {
        color: '#FBAE47'
      }
    }]),
    dataZoom: [{
      type: 'inside',
      start: 50,
      end: 100,
      preventDefaultMouseMove: false,
      zoomLock: true
    }],
    series: [{
      name: "400有效来电",
      data: [120, 1200, 150, 80, 270, 110, 122, 120, 200, 34150, 480, 370, 1140, 130],
      type: 'bar',
      barMaxWidth: '40',
    }, {
      name: "店铺接起率",
      yAxisIndex: 1,
      data: [1201, 22001, 1510, 801, 720, 1130, 12302, 31202, 2200, 2150, 480, 5470, 68110, 13230],
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 4,
      },
      emphasis: {
        itemStyle: {
          color: 'rgba(255,67,137,1)',
          borderWidth: 8,
          borderColor: 'rgba(255,38,119,0.1942)'
        },
      },
      // symbolSize: 0,
      showSymbol: false,
    }]
  },
  option014: {
    color: ['#3366FF'],
    tooltip: commonSty.singleTool(),
    grid: commonSty.gridSty,
    xAxis: commonSty.xSty(['10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10']),
    yAxis: commonSty.ySty(),
    legend: commonSty.Mylegend([{
      name: '店铺活跃度',
      // icon: 'roundRect',
      textStyle: {
        color: '#999EAE'
      }
    }]),
    dataZoom: [{
      type: 'inside',
      start: 50,
      end: 100,
      preventDefaultMouseMove: false,
      zoomLock: true
    }],
    series: [{
      name: "店铺活跃度",
      data: [120, 200, 150, 80, 70, 110, 222, 120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      barMaxWidth: '40',
    }]
  },
  option015: {
    color: ['#3366FF', '#FBAE47'],
    tooltip: commonSty.groupTool(),
    grid: commonSty.gridSty,
    xAxis: commonSty.xSty(['10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10', '10.10']),
    yAxis: commonSty.ySty(),
    legend: commonSty.Mylegend([{
      name: '模板促销新闻发布量',
      textStyle: {
        color: '#3366FF'
      }
    }, {
      name: '普通新闻发布量',
      icon: 'roundRect',
      textStyle: {
        color: '#FBAE47'
      }
    }]),
    dataZoom: [{
      type: 'inside',
      start: 50,
      end: 100,
      preventDefaultMouseMove: false,
      zoomLock: true
    }],
    series: [{
      name: "模板促销新闻发布量",
      data: [120, 3450, 150, 80, 270, 110, 122, 120, 200, 3450, 480, 370, 1140, 130],
      type: 'bar',
      barMaxWidth: '40',
      stack: '总量',
    }, {
      name: "普通新闻发布量",
      data: [1201, 2001, 1510, 801, 720, 1130, 2302, 1202, 2200, 2150, 480, 5470, 6110, 3230],
      type: 'bar',
      barMaxWidth: '40',
      stack: '总量',
    }]
  },
}
// 使用刚指定的配置项和数据显示图表。
// myChart.setOption(echartsEle.option011, true);
// echartsEle.echart012.setOption(echartsEle.option012);
// echartsEle.echart013.setOption(echartsEle.option013);
// echartsEle.echart014.setOption(echartsEle.option014);
// echartsEle.echart015.setOption(echartsEle.option015);
setTimeout(function(){
  myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: 10//第一种写法，根据x轴上的索引值指定，数字类型
  });
  // echartsEle.echart012.dispatchAction({
  //   type: 'showTip',
  //   seriesIndex:0,
  //   name: '10.12'//第二种写法，根据x轴上的name值执行，字符串类型
  // });
  // echartsEle.echart013.dispatchAction({
  //     type: 'showTip',
  //     seriesIndex:0,
  //     dataIndex: 0 
  // });
  // echartsEle.echart014.dispatchAction({
  //   type: 'showTip',
  //   seriesIndex:0,
  //   dataIndex: 0
  // });
  // echartsEle.echart015.dispatchAction({
  //   type: 'showTip',
  //   seriesIndex:0,
  //   dataIndex: 0
  // });
})