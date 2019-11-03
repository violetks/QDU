//年月日时分秒
module.exports = {
    js_date_time: function(e) {
        var t = new Date(1e3 * parseInt(e)), a = t.getFullYear(), n = t.getMonth() + 1, r = t.getDate(), s = t.getHours(), g = t.getMinutes(), o = (t.getSeconds(), 
        new Date());
        Date.parse(o.toDateString());
        return a + "-" + n + "-" + r + " " + s + ":" + g;
    }
};