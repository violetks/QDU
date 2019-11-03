var o = getApp();

Page({
    data: {
        recordData: "",
        photo: []
    },
    onLoad: function(t) {
        var e = this;
        wx.cloud.init(), wx.cloud.database().collection("commodity").orderBy("timestamp", "desc").where({
            _openid: o.openid
        }).get({
            success: function(o) {
                console.log(o), e.setData({
                    recordData: o.data
                });
            },
            fail: function() {
                wx.showToast({
                    title: "无法连接数据库"
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
    },
    deleted: function(o) {
        var t = this;
        console.log(o.currentTarget.id);
        var e = o.currentTarget.id;
        wx.showModal({
            title: "该操作不可逆",
            content: "确定删除该条动态",
            success: function(a) {
                a.confirm && (wx.cloud.database().collection("commodity").where({
                    _id: e
                }).get({
                    success: function(o) {
                        t.setData({
                            photo: o.data[0].photo
                        }), console.log(t.data.photo), wx.cloud.callFunction({
                            name: "shanchu",
                            data: {
                                list: o.data[0].photo
                            },
                            complete: function(o) {
                                console.log(o);
                            }
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "无法连接数据库",
                        }), console.log("无法连接数据库");
                    }
                }), wx.cloud.database().collection("commodity").doc(o.currentTarget.id).remove({
                    success: function(o) {
                        console.log(o), t.onLoad();
                    },
                    fail: console.error
                }));
            },
            fail: console.error
        });
    },
    polish: function(o) {
        console.log(o.currentTarget.id);
        var t = o.currentTarget.id;
        wx.cloud.database().collection("commodity").doc(t).update({
            data: {
                timestamp: Date.now()
            },
            success: console.log,
            fail: console.error
        }), wx.showToast({
            title: "成功擦亮",
            icon: "success",
            duration: 2e3
        });
    }
});