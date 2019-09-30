wx.getSetting({
  success: function(res) {
    if (res.authSetting['scope.userInfo']) {
      //do your things
    } else {
      if (res.authSetting['scope.userInfo'] == undefined) {
        wx.authorize({
          scope: 'scope.userInfo',
          success: (res) => {
            //do your things
          },
          fail: function(err) {
            console.log(err);
            wx.showToast({
              title: '接口调用失败',
              icon: 'none'
            });
            return;
          }
        });
      } else {
        wx.authorize({
          scope: 'scope.userInfo',
          success: (res) => {
            //do your things
          },
          fail: function(res) {
            wx.showModal({
              title: '提示',
              content: '请设置允许小程序的需求接口',
              success: function(res) {
                console.log(res);
                if (res.confirm) {//触发“去授权”按钮
                  wx.openSetting({
                    success: (res) => {
                      // 跳转到小程序授权设置界面
                    }
                  });
                }
              }
            });
          }
        });
      }
    }
  },
  fail: function(err) {
    console.log(err);
    wx.showToast({
      title: '接口调用失败',
      icon: 'none'
    });
  }
});