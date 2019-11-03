function e(e) {
  return function () {
    var r = e.apply(this, arguments);
    return new Promise(function (e, t) {
      function n(i, u) {
        try {
          var o = r[i](u), s = o.value;
        } catch (e) {
          return void t(e);
        }
        if (!o.done) return Promise.resolve(s).then(function (e) {
          n("next", e);
        }, function (e) {
          n("throw", e);
        });
        e(s);
      }
      return n("next");
    });
  };
}

require("wx-server-sdk").init(), 
exports.main = function () {
  var t = e(regeneratorRuntime.mark(function e(t, n) {
    var i;
    return regeneratorRuntime.wrap(function (e) {
      for (; ;) switch (e.prev = e.next) {
        case 0:
          return e.next = 2, r.deleteFile({
            fileList: t.list
          });

        case 2:
          return i = e.sent, e.abrupt("return", i.fileList);

        case 4:
        case "end":
          return e.stop();
      }
    }, e, void 0);
  }));
  return function (e, r) {
    return t.apply(this, arguments);
  };
}();