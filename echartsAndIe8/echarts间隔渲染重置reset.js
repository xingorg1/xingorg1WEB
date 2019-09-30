$(()=>{
  // 制作echarts重新渲染动画效果
  setInterval(function () {
    // 方法一
    // 缺点，数据无改动时，动画速度过快
    var copyOption = myChart.getOption(option);
    var copyOption1 = myChart1.getOption(option1);
    var copyOption2 = myChart2.getOption(option2);
    myChart.clear();
    myChart.setOption(copyOption);
    myChart1.clear();
    myChart1.setOption(copyOption1);
    myChart2.clear();
    myChart2.setOption(copyOption2);
    console.log(copyOption1)
    // 方法二
    // myChart.setOption({
    //     xAxis: {
    //       data: ['Mon1', 'Tue1', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //     },
    //     series : [
    //       {
    //         name: '直接访问',
    //         data: [0,0,0,0,0,0,0]
    //         // data: []
    //       }
    //     ]
    // });
    // setTimeout(function(){
    //     myChart.setOption({
    //         xAxis: {
    //           data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //         },
    //         series : [
    //           {
    //             name: '直接访问',
    //             data: resetData
    //           }
    //         ]
    //     });
    // }, 800);
  }, 3000);
})