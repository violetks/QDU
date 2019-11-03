function n(n) {
  return function () {
    var r = n.apply(this, arguments);
    return new Promise(function (n, e) {
      function t(i, u) {
        try {
          var o = r[i](u), c = o.value;
        } catch (n) {
          return void e(n);
        }
        if (!o.done) return Promise.resolve(c).then(function (n) {
          t("next", n);
        }, function (n) {
          t("throw", n);
        });
        n(c);
      }
      return t("next");
    });
  };
}

require("wx-server-sdk").init(), exports.main = function () {
  var r = n(regeneratorRuntime.mark(function n(r, e) {
    return regeneratorRuntime.wrap(function (n) {
      for (; ;) switch (n.prev = n.next) {
        case 0:
        case "end":
          return n.stop();
      }
    }, n, void 0);
  }));
  return function (n, e) {
    return r.apply(this, arguments);
  };
}();