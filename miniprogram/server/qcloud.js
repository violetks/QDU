var e = require("fs"), r = require("wafer-node-sdk"), s = require("./config"), n = function() {
    try {
        if (!e.statSync("/data/release/sdk.config.json").isFile()) return console.log("sdk.config.json 不存在，将使用 config.js 中的配置"), 
        {};
    } catch (e) {
        return {};
    }
    try {
        var r = e.readFileSync("/data/release/sdk.config.json", "utf8");
        return JSON.parse(r);
    } catch (e) {
        return console.log("sdk.config.json 解析错误，不是 JSON 字符串"), {};
    }
}();

module.exports = r(Object.assign({}, n, s));