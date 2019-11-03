var e = new (require("koa"))(), r = require("debug")("koa-weapp-demo"), u = require("./middlewares/response"), o = require("koa-bodyparser"), i = require("./config");

e.use(u), e.use(o());

var s = require("./routes");

e.use(s.routes()), e.listen(i.port, function() {
    return r("listening on port " + i.port);
});