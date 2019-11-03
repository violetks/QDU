var o = getApp();

Page({
  data: {
    detailsPageData: "",
    src1: "../../images/likeS.png",
    src2: "../../images/show.png",
    src3: "../../images/like.png",
    recordid: "",
    loveid: "",
    goods: [],
    _openid: "",
    collected: !1,
    total: ""
  },
  onLoad: function(a) {
    console.log(a), this.setData({
      recordid: a._id
    });
    var e = this;
    wx.cloud.init(), wx.cloud.database().collection("commodity").where({
      _id: e.data.recordid
    }).get({
      success: function(o) {
        console.log("商品信息下面是"), console.log(o), e.setData({
          detailsPageData: o.data[0]
        }), wx.cloud.database().collection("commodity").where({
          _openid: o.data[0]._openid
        }).count({
          success: function(o) {
            e.setData({
              total: o.total
            });
          }
        });
      }
    });
    var t = wx.cloud.database();
    t.collection("love").where({
      _openid: o.globalData.openid
    }).get({
      success: function(o) {
        console.log(o), console.log(o.data.length), o.data.length ? (e.setData({
          loveid: o.data[0]._id,
          goods: o.data[0].goods
        }), console.log(e.data.goods)) : t.collection("love").add({
          data: {
            goods: []
          },
          success: function(o) {
            console.log("下面是新建收藏表的返回值"), console.log(o), e.setData({
              loveid: o._id
            }), console.log(e.data.loveid);
          },
          fail: console.error
        }), console.log("下面是本地goods列表的长度"), console.log(e.data.goods.length);
        for (var a = 0; a < e.data.goods.length; ++a) e.data.goods[a] == e.data.recordid ? e.setData({
          collected: !0
        }) : console.log("没收藏");
      },
      fail: function() {
        console.log("无法连接数据库");
      }
    });
  },
  // 预览图片API
  preview: function(o) {
    wx.previewImage({
      current: o.currentTarget.dataset.src,
      urls: this.data.detailsPageData.photo
    });
  },
  // 到我的商品列表页
  goMysellPage: function(o) {
    var a = this.data.detailsPageData._openid;
    wx.navigateTo({
      url: "../mysell/mysell?openid=" + a
    });
  },
  // 点击收藏
  collectTap: function(o) {
    var a = this;
    if (a.setData({
        collected: !a.data.collected
      }), a.data.collected) {
      var e = a.data.recordid,
        t = [];
      t[0] = e, this.setData({
          goods: a.data.goods.concat(t)
        }), console.log("下面是本地goods表的内容"), console.log(a.data.goods),
        wx.cloud.database().collection("love").doc(a.data.loveid).update({
          data: {
            goods: a.data.goods
          },
          success: console.log,
          fail: console.error
        });
    } else {
      console.log("删除收藏商品");
      for (var l = 0; l < a.data.goods.length; l++)
        if (a.data.goods[l] == a.data.recordid) {
          var d = a.data.goods;
          d.splice(l, 1), a.setData({
            goods: d
          });
        }
      wx.cloud.database().collection("love").doc(a.data.loveid).update({
        data: {
          goods: a.data.goods
        },
        success: console.log,
        fail: console.error
      });
    }
    wx.showToast({
      title: this.data.collected ? "收藏成功" : "取消收藏",
      icon: "success",
      duration: 500,
      mask: !0
    });
  },
  onShareAppMessage: function(o) {
    return console.log(o), id = this.data.recordid, {
      title: "你的小可爱向你分享了ta的最爱，快点开看看吧",
      path: "/pages/details/details?_id=" + id,
      query: "id=id",
      success: function(o) {
        console.log(o);
      },
      fail: function(o) {}
    };
  },
  show: function(o) {
    this.onShareAppMessage(o);
  },
  call: function(o) {
    wx.makePhoneCall({
      phoneNumber: this.data.detailsPageData.phone
    });
  }
});