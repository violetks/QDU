// 参考文章：https://www.jianshu.com/p/17a4c00d5831
function r(r) {
  return function () {
    var n = r.apply(this, arguments);
    return new Promise(function (r, e) {
      function t(u, i) {
        try {
          var o = n[u](i), c = o.value;
        } catch (r) {
          return void e(r);
        }
        if (!o.done) return Promise.resolve(c).then(function (r) {
          t("next", r);
        }, function (r) {
          t("throw", r);
        });
        r(c);
      }
      return t("next");
    });
  };
}

require("wx-server-sdk").init(), exports.main = function () {
  var n = r(regeneratorRuntime.mark(function r(n, e) {
    return regeneratorRuntime.wrap(function (r) {
      for (; ;) switch (r.prev = r.next) {
        case 0:
          return r.abrupt("return", n);

        case 1:
        case "end":
          return r.stop();
      }
    }, r, void 0);
  }));
  return function (r, e) {
    return n.apply(this, arguments);
  };
}();