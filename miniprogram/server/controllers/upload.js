function r(r) {
    return function() {
        var e = r.apply(this, arguments);
        return new Promise(function(r, n) {
            function t(u, o) {
                try {
                    var i = e[u](o), a = i.value;
                } catch (r) {
                    return void n(r);
                }
                if (!i.done) return Promise.resolve(a).then(function(r) {
                    t("next", r);
                }, function(r) {
                    t("throw", r);
                });
                r(a);
            }
            return t("next");
        });
    };
}

var e = require("../qcloud").uploader;

module.exports = function() {
    var n = r(regeneratorRuntime.mark(function r(n) {
        var t;
        return regeneratorRuntime.wrap(function(r) {
            for (;;) switch (r.prev = r.next) {
              case 0:
                return r.next = 2, e(n.req);

              case 2:
                t = r.sent, n.state.data = t;

              case 4:
              case "end":
                return r.stop();
            }
        }, r, void 0);
    }));
    return function(r) {
        return n.apply(this, arguments);
    };
}();