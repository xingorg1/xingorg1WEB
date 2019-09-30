App({
  onLaunch: function (o) {
    console.log('init,此时 page 还没有生成。');
    console.log(o)
  },
  onShow: function(o){
    console.log('‘显示’');
    console.log(o)
  },
  onHide: function(o) {
    console.log('隐藏');
    console.log(o)
  },
  onError: function(err){
    console.log('err')
    console.log(err);

  },
  onPageNotFound: function(o){
    console.log('没有发现这个页面')
    console.log(o)
  },
  mySelf: function(){
    console.log(this)
  },
  txt: '自定义的数据,下边抛出app自身'
})
// this.mySelf()
var newApp = getApp();
// getApp()是再app外边获取小程序实例，在App()内部不可用
console.log(getApp().txt)
newApp.mySelf();
//生命周期函数只能在App()内部调用，不能以app实例的身份调用，即getApp（)不能私自调用
newApp.onShow()