function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, n) {
            function r(o, a) {
                try {
                    var u = e[o](a), i = u.value;
                } catch (t) {
                    return void n(t);
                }
                if (!u.done) return Promise.resolve(i).then(function(t) {
                    r("next", t);
                }, function(t) {
                    r("throw", t);
                });
                t(i);
            }
            return r("next");
        });
    };
}

module.exports = function() {
    var e = t(regeneratorRuntime.mark(function t(e, n) {
        return regeneratorRuntime.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                e.state.$wxInfo.loginState && (e.state.data = e.state.$wxInfo.userinfo, e.state.data.time = Math.floor(Date.now() / 1e3));

              case 1:
              case "end":
                return t.stop();
            }
        }, t, void 0);
    }));
    return function(t, n) {
        return e.apply(this, arguments);
    };
}();