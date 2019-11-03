function e(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function n(u, o) {
                try {
                    var i = r[u](o), c = i.value;
                } catch (e) {
                    return void t(e);
                }
                if (!i.done) return Promise.resolve(c).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(c);
            }
            return n("next");
        });
    };
}

var r = function() {
    var r = e(regeneratorRuntime.mark(function e(r, t) {
        var u, o, i, c, s;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                u = r.query, o = u.signature, i = u.timestamp, c = u.nonce, s = u.echostr, n(o, i, c) ? r.body = s : r.body = "ERR_WHEN_CHECK_SIGNATURE";

              case 2:
              case "end":
                return e.stop();
            }
        }, e, this);
    }));
    return function(e, t) {
        return r.apply(this, arguments);
    };
}(), t = function() {
    var r = e(regeneratorRuntime.mark(function e(r, t) {
        var u, o, i, c, s;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                u = r.query, o = u.signature, i = u.timestamp, c = u.nonce, n(o, i, c) || (r.body = "ERR_WHEN_CHECK_SIGNATURE"), 
                s = r.request.body, r.body = "success";

              case 4:
              case "end":
                return e.stop();
            }
        }, e, this);
    }));
    return function(e, t) {
        return r.apply(this, arguments);
    };
}(), n = require("../qcloud").message.checkSignature;

module.exports = {
    post: t,
    get: r
};