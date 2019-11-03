function e(e) {
    return function() {
        var n = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function r(o, u) {
                try {
                    var a = n[o](u), c = a.value;
                } catch (e) {
                    return void t(e);
                }
                if (!a.done) return Promise.resolve(c).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(c);
            }
            return r("next");
        });
    };
}

function n(e) {
    console.log("[onConnect] =>", {
        tunnelId: e
    }), e in a ? (c.push(e), s("people", {
        total: c.length,
        enter: a[e]
    })) : (console.log("Unknown tunnelId(" + e + ") was connectd, close it"), l(e));
}

function t(e, n, t) {
    switch (console.log("[onMessage] =>", {
        tunnelId: e,
        type: n,
        content: t
    }), n) {
      case "speak":
        e in a ? s("speak", {
            who: a[e],
            word: t.word
        }) : l(e);
    }
}

function r(e) {
    if (console.log("[onClose] =>", {
        tunnelId: e
    }), !(e in a)) return console.log("[onClose][Invalid TunnelId]=>", e), void l(e);
    var n = a[e];
    delete a[e];
    var t = c.indexOf(e);
    ~t && c.splice(t, 1), c.length > 0 && s("people", {
        total: c.length,
        leave: n
    });
}

var o = require("../qcloud").tunnel, u = require("debug")("koa-weapp-demo"), a = {}, c = [], s = function(e, n) {
    o.broadcast(c, e, n).then(function(e) {
        var n = e.data && e.data.invalidTunnelIds || [];
        n.length && (console.log("检测到无效的信道 IDs =>", n), n.forEach(function(e) {
            delete a[e];
            var n = c.indexOf(e);
            ~n && c.splice(n, 1);
        }));
    });
}, l = function(e) {
    o.closeTunnel(e);
};

module.exports = {
    get: function() {
        var n = e(regeneratorRuntime.mark(function e(n) {
            var t, r;
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, o.getTunnelUrl(n.req);

                  case 2:
                    t = e.sent, r = t.tunnel, a[r.tunnelId] = t.userinfo, n.state.data = r;

                  case 6:
                  case "end":
                    return e.stop();
                }
            }, e, void 0);
        }));
        return function(e) {
            return n.apply(this, arguments);
        };
    }(),
    post: function() {
        var a = e(regeneratorRuntime.mark(function e(a) {
            var c;
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, o.onTunnelMessage(a.request.body);

                  case 2:
                    c = e.sent, u("Tunnel recive a package: %o", c), e.t0 = c.type, e.next = "connect" === e.t0 ? 7 : "message" === e.t0 ? 9 : "close" === e.t0 ? 11 : 13;
                    break;

                  case 7:
                    return n(c.tunnelId), e.abrupt("break", 13);

                  case 9:
                    return t(c.tunnelId, c.content.messageType, c.content.messageContent), e.abrupt("break", 13);

                  case 11:
                    return r(c.tunnelId), e.abrupt("break", 13);

                  case 13:
                  case "end":
                    return e.stop();
                }
            }, e, void 0);
        }));
        return function(e) {
            return a.apply(this, arguments);
        };
    }()
};