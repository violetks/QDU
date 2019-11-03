function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, r) {
            function n(o, a) {
                try {
                    var u = e[o](a), c = u.value;
                } catch (t) {
                    return void r(t);
                }
                if (!u.done) return Promise.resolve(c).then(function(t) {
                    n("next", t);
                }, function(t) {
                    n("throw", t);
                });
                t(c);
            }
            return n("next");
        });
    };
}

var e = require("debug")("koa-weapp-demo");

module.exports = function() {
    var r = t(regeneratorRuntime.mark(function t(r, n) {
        return regeneratorRuntime.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                return t.prev = 0, t.next = 3, n();

              case 3:
                r.body = r.body ? r.body : {
                    code: void 0 !== r.state.code ? r.state.code : 0,
                    data: void 0 !== r.state.data ? r.state.data : {}
                }, t.next = 11;
                break;

              case 6:
                t.prev = 6, t.t0 = t.catch(0), e("Catch Error: %o", t.t0), r.status = 200, r.body = {
                    code: -1,
                    error: t.t0 && t.t0.message ? t.t0.message : t.t0.toString()
                };

              case 11:
              case "end":
                return t.stop();
            }
        }, t, this, [ [ 0, 6 ] ]);
    }));
    return function(t, e) {
        return r.apply(this, arguments);
    };
}();