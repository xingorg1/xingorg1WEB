var JosnList = [
  { name: "龙头镇", value: "111" },
  { name: "大埔镇", value: "222" },
  { name: "太平镇", value: "458" },
  { name: "沙埔镇", value: "445" },
  { name: "东泉镇", value: "456" },
  { name: "凤山镇", value: "647" },
  { name: "六塘镇", value: "189" },
  { name: "冲脉镇", value: "864" },
  { name: "寨隆镇", value: "652" },
];
var optionFour = {
  backgroundColor: '#f40',
  tooltip: {
    show: true
  },
  series: [{
    name: '词云图学习',
    type: 'wordCloud',
    sizeRange: [20, 50],//文字范围
    //文本旋转范围，文本将通过rotationStep45在[-90,90]范围内随机旋转
    rotationRange: [-45, 90],
    rotationStep: 45,
    textRotation: [0, 45, 90, -45],
    //形状
    shape: 'circle',
    textStyle: {
      normal: {
        color: '#fff'
        // function () {//文字颜色的随机色
        //   return 'rgb(' + [
        //     Math.round(Math.random() * 250),
        //     Math.round(Math.random() * 250),
        //     Math.round(Math.random() * 250)
        //   ].join(',') + ')';
        // }
      },
      //悬停上去的颜色设置
      emphasis: {
        shadowBlur: 10,
        shadowColor: '#333'
      }
    },
    data: JosnList
  }]
};
console.log(optionFour)
var myChartFour = echarts.init(document.getElementById('cyt'));
//使用制定的配置项和数据显示图表
myChartFour.setOption(optionFour);