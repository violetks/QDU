App({
  onLaunch: function () {
    var n = this, e = wx.getStorageSync("logs") || [];
    e.unshift(Date.now()), wx.setStorageSync("logs", e), wx.login({
      success: function (n) { }
    }), wx.getSetting({
      success: function (e) {
        e.authSetting["scope.userInfo"] && wx.getUserInfo({
          success: function (e) {
            n.globalData.userInfo = e.userInfo, n.userInfoReadyCallback && n.userInfoReadyCallback(e);
          }
        });
      }
    }), wx.cloud.init(), wx.cloud.callFunction({
      name: "test",
      complete: function (e) {
        n.globalData.openid = e.result.userInfo.openId;
      }
    });
  },
  globalData: {
    userInfo: null,
    openid: ""
  }
});