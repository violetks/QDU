var t = getApp();

Page({
  data: {
    iptT: "",
    iptPh: "",
    iptPr: "",
    iptN: "",
    iptD: "",
    tempFilePaths: [],
    updatePath: [],
    picturePaths: [],
    goodId: "",
    height: 200,
    form_info: "",
    multiArray: [
      ["二手书", "生活用品", "衣物", "电子产品", "运动健身", "杂物", ],
      ["教材", "中外文学","反正是书"]
    ],
    objectMultiArray: [
      [{
        id: 0,
        name: "二手书"
      }, {
        id: 1,
        name: "生活用品"
      }, {
        id: 2,
        name: "衣物"
      }, {
        id: 3,
        name: "电子产品"
      }, {
        id: 4,
        name: "运动健身"
      }, {
        id: 5,
        name: "杂物"
      }],
      [{
        id: 0,
        name: "教材"
      }, {
        id: 1,
        name: "文学"
      },{
        id: 2,
        name: "反正是书"
      }]
    ],
    multiIndex: [0, 0],

    array: ["9.9成新", "9成新", "8成新", "7成新", "6成新"],
    objectArray: [{
      id: 0,
      name: "9.9成新"
    }, {
      id: 1,
      name: "9成新"
    }, {
      id: 2,
      name: "8成新"
    }, {
      id: 3,
      name: "7成新"
    }, {
      id: 4,
      name: "6成新"
    }],
    index: 0,

    addressArray: ["东校区东院", "东校区西院", "中心校区东院", "中心校区西院", "松山校区"],
    objectArray: [
      {
        id: 0,
        name: "东校区东院"
      }, {
        id: 1,
        name: "东校区西院"
      }, {
        id: 2,
        name: "中心校区东院"
      }, {
        id: 3,
        name: "中心校区西院"
      }, {
        id: 4,
        name: "松山校区"
      }
    ],
    addressIndex: 0,
  },

  onLoad: function() {
    wx.cloud.init();
    wx.cloud.database();
  },
  iptTitle: function(t) {
    this.data.iptT = t.detail.value;
  },
  iptPrice: function(t) {
    this.data.iptPr = t.detail.value;
  },
  iptName: function(t) {
    this.data.iptN = t.detail.value;
  },
  iptPhone: function(t) {
    this.data.iptPh = t.detail.value;
  },
  iptDetail: function(t) {
    this.data.iptD = t.detail.value;
  },

// 实现分类选择
  bindMultiPickerColumnChange: function(t) {
    console.log("修改的列为", t.detail.column, "值为", t.detail.value);
    var a = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    switch (a.multiIndex[t.detail.column] = t.detail.value, t.detail.column) {
      case 0:
        switch (a.multiIndex[0]) {
          case 0:
            a.multiArray[1] = ["教材", "中外文学"];
            break;

          case 1:
            a.multiArray[1] = ["化妆品", "寝室家具"];
            break;

          case 2:
            a.multiArray[1] = ["衣服", "鞋子", "箱包", "配饰"];
            break;

          case 3:
            a.multiArray[1] = ["手表", "手机相关", "摄像机那些", "电脑和它的配件"];
            break;

          case 4:
            a.multiArray[1] = ["健身器材", "球类", "轮滑类", "运动相关"];
            break;

          case 5:
            a.multiArray[1] = ["杂物"];
            break;
        }
        a.multiIndex[1] = 0;
    }
    this.setData(a);
  },

//  实现成色选择
  bindPickerChange: function(t) {
    console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
      index: t.detail.value
    });
  },

// 实现地址选择
  bindPickerChange1: function (t) {
    console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
      addressIndex: t.detail.value
    });
  },

  formSubmit: function(a) {
    var e = this;
    if ("" == this.data.iptT || "" == this.data.iptPr || "" == this.data.iptPh) 
    wx.showToast({
      title: "必填内容不能为空",
      icon: "none"
    });
    else if (/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))[0-9]{8}$/.test(this.data.iptPh))
      if (this.data.iptPr > 99999) wx.showToast({
        title: "请输入价格",
        icon: "none"
      });
      else if (this.data.tempFilePaths.length < 1) wx.showToast({
      title: "请添加图片",
      icon: "none"
    });
    else {
      if (wx.cloud) {
        wx.cloud.init();
        var i = wx.cloud.database(),
          n = wx.cloud.database(),
          o = new Date(),
          l = o.getMinutes() < 10 ? "0" + o.getMinutes() : o.getMinutes(),
          d = o.getFullYear() + "-" + (o.getMonth() + 1) + "-" + o.getDate() + " " + o.getHours() + ":" + l;

          // 向云数据库插入数据
        i.collection("commodity").add({
          data: {
            title: this.data.iptT,
            Price: this.data.iptPr,
            phone: this.data.iptPh,
            detail: this.data.iptD,
            percentage: this.data.array[this.data.index],
            sort1: this.data.multiArray[0][this.data.multiIndex[0]],
            label: this.data.multiArray[1][this.data.multiIndex[1]],
            address: this.data.addressArray[this.data.addressIndex],
            // address1: this.data.multiArray1[0][this.data.multiIndex1[0]],
            time: d,
            timestamp: Date.now(),
            authorName: t.globalData.userInfo.nickName,
            photo: {},
            authorIcon: t.globalData.userInfo.avatarUrl
          },
          success: function(t) {
            e.setData({
              goodId: t._id
            });
            for (var a = 0; a < e.data.tempFilePaths.length; a++) e.data.updatePath.push("cloud://lin-0b53dc.6c69-lin-0b53dc/GoodImage/" + e.data.goodId + "/photo" + (a + 1).toString() + ".png"),
              wx.cloud.uploadFile({
                cloudPath: "GoodImage/" + e.data.goodId + "/photo" + (a + 1).toString() + ".png",
                filePath: e.data.tempFilePaths[a].pic,
                name: "file",
                formData: {
                  douploadpic: "1"
                },
                success: function(t) {
                  console.log("res.fileID的值是"), console.log(t.fileID);
                },
                fail: function(t) {
                  console.log("失败"), console.log(t.errMsg);
                }
              });
            console.log("that.data.updatePath的值是"), console.log(e.data.updatePath), console.log(e.data.updatePath[1]),
              n.collection("commodity").doc(e.data.goodId).update({
                data: {
                  photo: e.data.updatePath
                },
                success: function(t) {
                  console.log(t), console.log("修改成功");
                },
                fail: function() {
                  console.log("修改失败");
                }
              }), wx.showToast({
                title: "发布成功",
                icon: "none",
                duration: 800
              }), setTimeout(function() {
                e.setData({
                  multiIndex1: [0, 0],
                  index: 0,
                  iptT: "",
                  iptPh: "",
                  iptPr: "",
                  iptN: "",
                  iptD: "",
                  tempFilePaths: [],
                  updatePath: [],
                  picturePaths: [],
                  goodId: "",
                  form_info: ""
                }), wx.switchTab({
                  url: "../main/main"
                });
              }, 1e3);
          },

          fail: function() {
            wx.showToast({
              title: "发布失败",
              icon: "none"
            });
          }

        });
      } else console.error("请使用 2.2.3 或以上的基础库以使用云能力");
      console.log("标题：" + this.data.iptT + "\n价格：" + this.data.iptPr + "\n电话：" + this.data.iptPh);
    } else wx.showToast({
      title: "格式有误，请重新输入",
      icon: "none"
    });
    wx.navigateTo({
      url: "../main/main"
    });
  },

  joinPicture: function(t) {
    var a = this.data.tempFilePaths,
      e = this;
    a.length >= 3 ? wx.showModal({
      title: "",
      content: "最多上传三张图片",
      showCancel: !1
    }) : wx.showActionSheet({
      itemList: ["从相册中选择", "拍照"],
      itemColor: "#50B397",
      success: function(t) {
        t.cancel || (0 == t.tapIndex ? e.chooseWxImage("album", a) : 1 == t.tapIndex && e.chooseWxImage("camera", a));
      }
    });
  },
  chooseWxImage: function(t, a) {
    var e = a,
      i = [],
      n = e.length,
      o = this;
    wx.chooseImage({
      count: 3,
      sizeType: ["original", "compressed"],
      sourceType: [t],
      success: function(t) {
        console.log(t.tempFilePaths);
        var a = t.tempFilePaths,
          l = a.length;
        if (n + l > 3)
          for (var d = 0; d < l - n; d++)(r = {}).pic = a[d], e.push(r), i[d] = t.tempFilePaths[d];
        else
          for (var s = 0; s < l; s++) {
            var r = {};
            r.pic = a[s], e.push(r), i[d] = t.tempFilePaths[d];
          }
        o.setData({
          tempFilePaths: e,
          picturePaths: o.data.picturePaths.concat(i)
        });
      }
    });
  },
  clearImg: function(t) {
    console.log(t);
    var a = t.currentTarget.dataset.index,
      e = this.data.tempFilePaths;
    e.splice(a, 1), this.setData({
      tempFilePaths: e
    });
  },
  
  formReset: function() {
    console.log("form发生了reset事件");
  }
});