Page({
  data: {
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    tab: "0",
    recordData: "",
    findData: "",
    recordSkip: "",
    findSkip: "",
    loading: !1,
    loaded: !1,
  },
  
  onLoad: function(a) {
    console.log(a);
    var t = this;
    wx.cloud.init();
    var e = wx.cloud.database(),
      o = e.command;
    e.collection("commodity").limit(5).orderBy("timestamp", "desc").where({
      sort1: o.neq("优选")
    }).get({
      success: function(a) {
        t.setData({
          recordData: a.data,
          recordSkip: 5
        });
      },
      fail: function() {
        wx.showToast({
          title: "无法连接数据库",
        }), console.log("无法连接数据库");
      }
    }), wx.cloud.database().collection("commodity").limit(5).orderBy("timestamp", "desc").where({
      sort1: "优选"
    }).get({
      success: function(a) {
        t.setData({
          findData: a.data,
          findSkip: 5
        });
      },
      fail: function() {
        wx.showToast({
          title: "无法连接数据库",
        }), console.log("无法连接数据库");
      }
    });
  },
  tabChange: function(a) {
    console.log(a.target.dataset.id);
    var t = a.target.dataset.id,
      e = {};
    e.curHdIndex = t, e.curBdIndex = t, this.setData({
      tabArr: e,
      tab: a.target.dataset.id
    });
  },
  goDetailsPage: function(a) {
    var t = a.currentTarget.dataset._id;
    wx.navigateTo({
      url: "../details/details?_id=" + t
    });
  },
  goSearchPage: function(a) {
    wx.navigateTo({
      url: "../search/search"
    });
  },
  goVersionPage: function(a) {
    wx.navigateTo({
      url: '../version/version',
    })
  },
  goNewPage: function(a) {
    wx.navigateTo({
      url: '../new/new',
    })
  },
  goGuidePage: function(a) {
    wx.navigateTo({
      url: '../guide/guide',
    })
  },
  onPullDownRefresh: function() {
    console.log("下拉刷新");
    var a = this;
    a.setData({
      pageIndex: 0
    }), a.onLoad(), wx.stopPullDownRefresh();
  },
  onReachBottom: function() {
    console.log("上拉加载"), this.setData({
      loading: !0
    });
    var a = this;
    if (console.log(a.data.tab), "0" == a.data.tab) {
      var t = wx.cloud.database(),
        e = t.command;
      t.collection("commodity").skip(a.data.recordSkip).limit(5).orderBy("timestamp", "desc").where({
        sort1: e.neq("优选")
      }).get({
        success: function(t) {
          console.log(t.data), a.setData({
            recordData: a.data.recordData.concat(t.data)
          });
        },
        fail: function() {
          this.setData({
            loaded: !0
          });
        }
      }), this.setData({
        recordSkip: this.data.recordSkip + 5,
        loading: !1
      });
    } else wx.cloud.database().collection("commodity").skip(this.data.findSkip).limit(5).orderBy("timestamp", "desc").where({
      sort1: "优选"
    }).get({
      success: function(t) {
        console.log(t.data), a.setData({
          findData: a.data.findData.concat(t.data)
        });
      },
      fail: function() {
        this.setData({
          loaded: !0
        });
      }
    }), this.setData({
      findSkip: this.data.findSkip + 5,
      loading: !1
    });
  }
});