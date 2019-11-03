function t(t) {
    return function() {
        var n = t.apply(this, arguments);
        return new Promise(function(t, e) {
            function r(o, u) {
                try {
                    var i = n[o](u), a = i.value;
                } catch (t) {
                    return void e(t);
                }
                if (!i.done) return Promise.resolve(a).then(function(t) {
                    r("next", t);
                }, function(t) {
                    r("throw", t);
                });
                t(a);
            }
            return r("next");
        });
    };
}

module.exports = function() {
    var n = t(regeneratorRuntime.mark(function t(n, e) {
        return regeneratorRuntime.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                1 === n.state.$wxInfo.loginState ? n.state.data = n.state.$wxInfo.userinfo : n.state.code = -1;

              case 1:
              case "end":
                return t.stop();
            }
        }, t, void 0);
    }));
    return function(t, e) {
        return n.apply(this, arguments);
    };
}();