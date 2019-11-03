var e = require("fs"), o = require("path"), r = require("../config").mysql;

console.log("\n======================================"), console.log("开始初始化数据库...");

var s = o.join(__dirname, "./cAuth.sql"), n = require("knex")({
    client: "mysql",
    connection: {
        host: r.host,
        port: r.port,
        user: r.user,
        password: r.pass,
        database: r.db,
        charset: r.char,
        multipleStatements: !0
    }
});

console.log("准备读取 SQL 文件：" + s);

var t = e.readFileSync(s, "utf8");

console.log("开始执行 SQL 文件..."), n.raw(t).then(function(e) {
    console.log("数据库初始化成功！"), process.exit(0);
}, function(e) {
    throw new Error(e);
});