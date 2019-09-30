// 渲染左上角日期下拉
let nowTime = new Date();
let nowYear = nowTime.getFullYear();
let nowMonth = nowTime.getMonth()+1;
let nowDay = nowTime.getDate();
// nowDay = 1;
if(nowDay<2){//小于1号渲染23个月
  nowMonth -= 1;
  for(let t = 1; t <= 23; t++){
    nowMonth--;
    if(nowMonth<1){
      nowMonth = 12;
      nowYear--;
    }
    $('#selectTime').append(`<option>${nowYear}年${nowMonth}月</option>`)
  }
}else{
  for(let t = 1; t <= 24; t++){
    nowMonth--;
    if(nowMonth<1){
      nowMonth = 12;
      nowYear--;
    }
    $('#selectTime').append(`<option>${nowYear}年${nowMonth}月</option>`);
  } 
};