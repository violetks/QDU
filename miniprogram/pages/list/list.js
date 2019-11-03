Page({
  data: {
    inputValue: "",
    recordData: "",
    selectAddress: !0,
    firstAddress: "全校",
    selectArea1: !1,
    selectRank: !0,
    firstRank: "最新发布",
    selectArea2: !1,
    fieldName: "timestamp",
    order: "desc",
    skip: "",
    loading: !1,
    loaded: !1,
    hidden: ""
  },
  onLoad: function(a) {
    var t = this;
    this.setData({
      inputValue: a.label // 根据label搜索
    }), wx.cloud.init();
    var e = wx.cloud.database(),
      s = e.command;
    // 查询记录按时间排列
    e.collection("commodity").limit(5).orderBy(t.data.fieldName, t.data.order).where(
      s.or({
        label: a.label
      }, {
        authorName: a.label
      }, {
        sort1: a.label
      }, {
        title: a.label
      })).get({
      success: function(a) {
        a.data.length ? t.setData({
          recordData: a.data,
          skip: 5,
          hidden: !0
        }) : t.setData({
          hidden: !1
        });
      },
      fail: function() {
        wx.showToast({
          title: "无法连接数据库",
        }), console.log("无法连接数据库");
      }
    });
  },
  iptKeyword: function(a) {
    this.data.inputValue = a.detail.value;
  },
  btnSearch: function(a) {
    var t = this;
    if (this.data.inputValue) {
      var e = wx.cloud.database(),
        s = e.command;
      e.collection("commodity").limit(5).orderBy(t.data.fieldName, t.data.order).where(
        s.or({
          label: this.data.inputValue
        }, {
          authorName: this.data.inputValue
        }, {
          sort1: this.data.inputValue
        }, {
          title: this.data.inputValue
        })).get({
        success: function(a) {
          a.data.length ? t.setData({
            recordData: a.data,
            skip: 5,
            hidden: !0
          }) : t.setData({
            hidden: !1,
            recordData: ""
          });
        },
        fail: function() {
          wx.showToast({
            title: "无法连接数据库",
          }), console.log("无法连接数据库");
        }
      });
    } else wx.showModal({
      title: "提示",
      content: "请输入搜索内容",
      showCancel: !1,
    });
  },
  goDetailsPage: function(a) {
    console.log(a);
    var t = a.currentTarget.dataset._id;
    console.log(t), wx.navigateTo({
      url: "../details/details?_id=" + t
    });
  },
  clickAddress: function() {
    1 == this.data.selectAddress ? this.setData({
      selectArea1: !0,
      selectAddress: !1
    }) : this.setData({
      selectArea1: !1,
      selectAddress: !0
    });
  },
  clickRank: function() {
    1 == this.data.selectRank ? this.setData({
      selectArea2: !0,
      selectRank: !1
    }) : this.setData({
      selectArea2: !1,
      selectRank: !0
    });
  },
  addressSelect: function(a) {
    this.setData({
      firstAddress: a.target.dataset.address,
      selectAddress: !0,
      selectArea1: !1
    }), this.selectShow();
  },
  rankSelect: function(a) {
    this.setData({
      firstRank: a.target.dataset.rank,
      selectRank: !0,
      selectArea2: !1
    }), this.selectShow();
  },
  selectShow: function() {
    var a = this;
    "价格最高" == a.data.firstRank ? a.setData({
      fieldName: "Price",
      order: "desc"
    }) : "价格最低" == a.data.firstRank ? a.setData({
      fieldName: "Price",
      order: "asc"
    }) : a.setData({
      fieldName: "timestamp",
      order: "desc"
    });
    var t = wx.cloud.database(),
      e = t.command;
    "全校" == a.data.firstAddress ? t.collection("commodity").limit(5).orderBy(a.data.fieldName, a.data.order).where(e.or({
      label: this.data.inputValue
    }, {
      authorName: this.data.inputValue
    }, {
      sort1: this.data.inputValue
    }, {
      title: this.data.inputValue
    })).get({
      success: function(t) {
        t.data.length ? a.setData({
          recordData: t.data,
          skip: 5,
          hidden: !0
        }) : a.setData({
          hidden: !1,
          recordData: ""
        });
      },
      fail: function() {
        wx.showToast({
          title: "无法连接数据库"
        }), console.log("无法连接数据库");
      }
    }) : t.collection("commodity").limit(5).orderBy(a.data.fieldName, a.data.order).where(e.and({
      label: this.data.inputValue
    }, {
      address1: a.data.firstAddress
    })).get({
      success: function(t) {
        t.data.length ? a.setData({
          recordData: t.data,
          skip: 5,
          hidden: !0
        }) : a.setData({
          hidden: !1,
          recordData: ""
        });
      },
      fail: function() {
        wx.showToast({
          title: "无法连接数据库"
        }), console.log("无法连接数据库");
      }
    });
  },
  onReachBottom: function() {
    console.log("上拉加载"), this.setData({
      loading: !0
    });
    var a = this,
      t = wx.cloud.database(),
      e = t.command;
    "全校" == a.data.firstAddress ? (t.collection("commodity").limit(5).skip(this.data.skip).orderBy(a.data.fieldName, a.data.order).where(e.or({
      label: this.data.inputValue
    }, {
      authorName: this.data.inputValue
    }, {
      sort1: this.data.inputValue
    }, {
      title: this.data.inputValue
    })).get({
      success: function(t) {
        t.data.length ? a.setData({
          recordData: a.data.recordData.concat(t.data)
        }) : this.setData({
          loaded: !0
        });
      },
      fail: function() {
        this.setData({
          loaded: !0
        });
      }
    }), a.setData({
      skip: a.data.skip + 5,
      loading: !1
    })) : (t.collection("commodity").limit(5).orderBy(a.data.fieldName, a.data.order).where(e.and({
      label: this.data.inputValue
    }, {
      address1: a.data.firstAddress
    })).get({
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
    }), a.setData({
      skip: a.data.skip + 5,
      loading: !1
    }));
  }
});