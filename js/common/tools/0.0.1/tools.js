define("common/tools/0.0.1/tools", [ "$" ], function(require) {
    var $ = require("$");
    // 常用的工具和函数
    var tools = {};
    // 函数：判断文件名是否为图片格式（jpg、jpeg、git、png）
    tools.isImgType = function(fileName) {
        var isImg = /\.(jpg|jpeg|gif|png)$/i.test(fileName);
        return isImg;
    };
    // 函数：保留小数位
    tools.decimalPlace = function(theNum, digit) {
        digit = parseInt(digit, 10);
        if (isNaN(Number(theNum))) {
            throw new Error("参数 theNum 必须为数字");
        }
        if (isNaN(digit) || digit < 0) {
            throw new Error("参数 digit 必须为大于0的数字");
        }
        theNum = theNum + "";
        if (theNum.indexOf(".") !== -1) {
            var splitArr = theNum.split("."), decimalPlace = splitArr[1], zeroFillNum = digit - decimalPlace.length;
            if (digit === 0) {
                theNum = splitArr[0];
            } else {
                if (zeroFillNum > 0) {
                    // 补0
                    for (;zeroFillNum > 0; zeroFillNum--) {
                        decimalPlace = decimalPlace + "0";
                    }
                    decimalPlace = "." + decimalPlace;
                } else {
                    // 截取
                    decimalPlace = "." + decimalPlace.substring(0, digit);
                }
                theNum = splitArr[0] + decimalPlace;
            }
        }
        return theNum;
    };
    // 判断类型
    tools.isType = function(type) {
        return function(target) {
            return Object.prototype.toString(target) === "[object " + type + "]";
        };
    };
    tools.isString = tools.isType("String");
    tools.isObject = tools.isType("Object");
    tools.isArray = tools.isType("Array");
    tools.isNumber = tools.isType("Number");
    tools.isFunction = tools.isType("Function");
    // 重复字符串
    tools.repeatStr = function(str, repeat) {
        return new Array(repeat + 1).join(str);
    };
    return tools;
});
