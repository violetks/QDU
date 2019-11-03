var e = require("koa-router")({
    prefix: "/weapp"
}), t = require("../controllers"), o = require("../qcloud").auth, r = o.authorizationMiddleware, s = o.validationMiddleware;

e.get("/login", r, t.login), e.get("/user", s, t.user), e.post("/upload", t.upload), 
e.get("/tunnel", t.tunnel.get), e.post("/tunnel", t.tunnel.post), e.get("/message", t.message.get), 
e.post("/message", t.message.post), module.exports = e;