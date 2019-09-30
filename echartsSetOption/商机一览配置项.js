export function btOption(data){
  return {
    color: colorGather.line1Clr,
    title: titleCenter(data.title),
    legend: legendTop(data.legend),
    tooltip: {
        trigger: 'axis',
        formatter: function(params){
            return params[0].name +": "+ parseInt((params[0].value)*100) +"%"
        },
        axisPointer: {
            type: 'line',
        }
    },
    grid: {
        top: 85,
        right: 10,
        bottom: 30,
        left: 20,
        containLabel: true
    },
    xAxis: {
      type : 'category',
      data : [],
      axisLabel: {
        fontSize: 10,
        color: labelColor,
        interval: 0,
        rotate: 0,
      },
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {//轴线样式
        show: true,
        lineStyle: {
            color: yAxisColor
        }
      }
    },
    yAxis: yAxisStyle,
    series: [{
      name: '',
      data: [],
      type: 'line',
      cursor: 'auto',
      smooth: true,
      symbolSize: 3.5,
      label: {
        normal: {
          formatter: function(params){
            return parseInt((params.value)*100)+'%';
          },
          position: 'top',
          show: true,
          color: '#333'
        }
      }
    }]
  };
}