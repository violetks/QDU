var o = getApp();

Page({
  data: {
    goods: [],
    recordData: [],
    loveid: "",
    recordid: "",
    list: []
  },

  onLoad: function(a) {
    var t = this;
    wx.cloud.init(), wx.cloud.database().collection("love").where({
      _openid: o.globalData.openid
    }).get({
      success: function(o) {
        t.setData({
          goods: o.data[0].goods,
          loveid: o.data[0]._id,
          recordData: [],
          list: []
        }), console.log(t.data.goods.length);
        for (var a = 0; a < o.data[0].goods.length; a++) wx.cloud.database().collection("commodity").where({
          _id: o.data[0].goods[a]
        }).get({
          success: function(o) {
            console.log(o), o.data.length && t.setData({
              recordData: t.data.recordData.concat(o.data[0])
            });
          },
          fail: function() {
            wx.showToast({
              title: "无法连接数据库",
            }), console.log("无法连接数据库");
          }
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
    var a = o.currentTarget.dataset._id;
    console.log(a), wx.navigateTo({
      url: "../details/details?_id=" + a
    });
  },
  deleted: function(o) {
    console.log(o);
    var a = this;
    a.setData({
      recordid: o.currentTarget.id
    }), wx.showModal({
      title: "该操作不可逆",
      content: "确定删除该条动态",
      success: function(o) {
        if (o.confirm) {
          console.log("删除它");
          for (var t = 0; t < a.data.goods.length; t++)
            if (a.data.goods[t] == a.data.recordid || "nofond" == a.data.goods[t]) {
              var e = a.data.goods;
              e.splice(t, 1), a.setData({
                goods: e
              });
            }
          wx.cloud.database().collection("love").doc(a.data.loveid).update({
            data: {
              goods: a.data.goods
            },
            success: function(o) {
              a.onLoad();
            },
            fail: console.error
          });
        }
      },
      fail: console.error
    });
  }
});