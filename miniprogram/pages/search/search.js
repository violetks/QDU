Page({
    data: {
        inputValue: "",
        recordData: "",
        tabArr: {
            curHdIndex: 0,
            curBdIndex: 0
        }
    },
    onLoad: function(t) {
        wx.cloud.init();
    },
    iptKeyword: function(t) {
        this.data.inputValue = t.detail.value;
    },
    btnSearch: function(t) {
        if (this.data.inputValue) {
            var a = this.data.inputValue;
            wx.navigateTo({
                url: "../list/list?label=" + a
            });
        } else wx.showModal({
            title: "提示",
            content: "请输入搜索内容",
            showCancel: !1,
            icon: "none"
        });
    },
    tabFun: function(t) {
        var a = t.target.dataset.id, e = {};
        e.curHdIndex = a, e.curBdIndex = a, this.setData({
            tabArr: e
        });
    },
    goListPage: function(t) {
        console.log(t.currentTarget.id);
        var a = t.currentTarget.id;
        wx.navigateTo({
            url: "../list/list?label=" + a
        });
    }
});