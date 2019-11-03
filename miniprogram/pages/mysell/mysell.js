getApp();

Page({
  data: {
    recordData: "",
    photo: []
  },
  onLoad: function(o) {
    var t = this;
    wx.cloud.init(), wx.cloud.database().collection("commodity").orderBy("timestamp", "desc").where({
      _openid: o.openid
    }).get({
      success: function(o) {
        console.log(o), t.setData({
          recordData: o.data
        });
      },
      fail: function() {
        wx.showToast({
          title: "无法连接数据库",
        }), console.log("无法连接数据库");
      }
    });
  },
  goDetailsPage: function(o) {
    console.log(o);
    var t = o.currentTarget.dataset._id;
    console.log(t), wx.navigateTo({
      url: "../details/details?_id=" + t
    });
  }
});