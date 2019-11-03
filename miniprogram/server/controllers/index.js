var r = function() {
    function r(r, t) {
        var n = [], e = !0, i = !1, o = void 0;
        try {
            for (var a, u = r[Symbol.iterator](); !(e = (a = u.next()).done) && (n.push(a.value), 
            !t || n.length !== t); e = !0) ;
        } catch (r) {
            i = !0, o = r;
        } finally {
            try {
                !e && u.return && u.return();
            } finally {
                if (i) throw o;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return r(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), t = require("lodash"), n = require("fs"), e = require("path");

module.exports = function i(o) {
    var a = {}, u = t(n.readdirSync(o)).partition(function(r) {
        return n.statSync(e.join(o, r)).isDirectory();
    }), c = r(u, 2), f = c[0], s = c[1];
    return f.forEach(function(r) {
        a[r] = i(e.join(o, r));
    }), s.forEach(function(r) {
        ".js" === e.extname(r) && (a[e.basename(r, ".js")] = require(e.join(o, r)));
    }), a;
}(e.join(__dirname));