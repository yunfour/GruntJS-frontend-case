/**
 * @Author：陈海云
 * @Date：2014-05-27
 * @Memo：提供一个获取指定日期的制定格式时间的函数（时间格式化）
 * @param：
 *        theDate——Date对象，需要格式化的日期/时间
 *        formatStr——字符串，格式化的字符串，如：'yyyy年MM月dd日  hh时mm分ss秒 SS毫秒'
 * @return：字符串，经过格式化的时间字符串，如：'2014年05月27日 10时20分33秒'
 */
define("base/dateFormat/0.0.1/dateFormat-debug", [], function(require) {
    var dateFormat = function(theDate, formatStr) {
        if (theDate.constructor !== Date) {
            throw new Error("函数：dateFormat(theDate, formatStr)的参数 theDate 必须为 Date 的实例.");
        }
        var formatMapping = {
            // month/月份，必须为大写，否则会和minutes（分钟）冲突
            "M+": theDate.getMonth() + 1,
            // day/日，不支持大写
            "d+": theDate.getDate(),
            // hour/小时，不支持大写
            "h+": theDate.getHours(),
            // minutes/分，必须为小写
            "m+": theDate.getMinutes(),
            // seconds/秒，不支持大写
            "s+": theDate.getSeconds(),
            // 刻钟、时刻
            //'q+': Math.floor((theDate.getMonth() + 3) / 3),
            // milliseconds/豪秒，不支持小写
            "S+": theDate.getMilliseconds()
        };
        if (/(y+)/.test(formatStr)) {
            formatStr = formatStr.replace(RegExp.$1, (theDate.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in formatMapping) {
            if (new RegExp("(" + k + ")").test(formatStr)) {
                formatStr = formatStr.replace(RegExp.$1, RegExp.$1.length === 1 ? formatMapping[k] : ("00" + formatMapping[k]).substr(("" + formatMapping[k]).length));
            }
        }
        return formatStr;
    };
    return dateFormat;
});