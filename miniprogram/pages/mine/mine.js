// var e = getApp();

// Page({
//     data: {
//         userInfo: {},
//         hasUserInfo: 0,
//         canIUse: wx.canIUse("button.open-type.getUserInfo"),
//     },

//     onLoad: function() {
//         var a = this;
//         e.globalData.userInfo ? this.setData({
//             userInfo: e.globalData.userInfo,
//             hasUserInfo: 1
//         }) : this.data.canIUse ? e.userInfoReadyCallback = function(e) {
//             a.setData({
//                 userInfo: e.userInfo,
//                 hasUserInfo: 1
//             });
//         } : wx.getUserInfo({
//             success: function(o) {
//               colsole.log("哈哈"+o.userInfo)
//                 e.globalData.userInfo = o.userInfo, a.setData({
//                     userInfo: o.userInfo,
//                     hasUserInfo: 1
//                 });
//             }
//         });
//     },

//     getUserInfo: function(a) {
//         console.log(a), 
//         e.globalData.userInfo = a.detail.userInfo, 
//         e.globalData.nickName = e.globalData.userInfo.nickName, 
//         this.setData({
//             userInfo: a.detail.userInfo,
//             hasUserInfo: 1
//         });
//     },

//     goLoveTap: function(e) {
//         wx.navigateTo({
//             url: "../love/love"
//         });
//     },

//     goShelvesTap: function(e) {
//         wx.navigateTo({
//             url: "../shelves/shelves"
//         });
//     },

//     goVersionTap: function (e) {
//       wx.navigateTo({
//         url: "../version/version"
//       });
//     },

//     goAboutTap: function(e) {
//         wx.navigateTo({
//             url: "../about/about"
//         });
//     }

// });
var e = getApp();

Page({
  data: {
    // motto: "Hello World",
    userInfo: {},
    hasUserInfo: !1,
    canIUse: wx.canIUse("button.open-type.getUserInfo")
  },
  onLoad: function () {
    var a = this;
    e.globalData.userInfo ? this.setData({
      userInfo: e.globalData.userInfo,
      hasUserInfo: !0
    }) : this.data.canIUse ? e.userInfoReadyCallback = function (e) {
      a.setData({
        userInfo: e.userInfo,
        hasUserInfo: !0
      });
    } : wx.getUserInfo({
      success: function (o) {
        e.globalData.userInfo = o.userInfo, a.setData({
          userInfo: o.userInfo,
          hasUserInfo: !0
        });
      }
    });
  },
  getUserInfo: function (a) {
    console.log(a), e.globalData.userInfo = a.detail.userInfo, e.globalData.nickName = e.globalData.userInfo.nickName,
      this.setData({
        userInfo: a.detail.userInfo,
        hasUserInfo: !0
      });
  },
  goLoveTap: function (e) {
    wx.navigateTo({
      url: "../love/love"
    });
  },
  goShelvesTap: function (e) {
    wx.navigateTo({
      url: "../shelves/shelves"
    });
  },
  goAboutTap: function (e) {
    wx.navigateTo({
      url: "../about/about"
    });
  },
  goVersionTap: function (e) {
    wx.navigateTo({
      url: "../version/version"
    });
  }
});