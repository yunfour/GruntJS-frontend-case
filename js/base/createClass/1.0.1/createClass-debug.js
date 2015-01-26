/**
 * @Author：陈海云
 * @Date：2013-10-15
 * @Update：2014-04-10
 * @Update-memo：将方法setAttr()和getAttr()转移到构造方法中，并
 *     将两个方法操作的attr对象变为私有属性
 * @Memo：提供一个创建类的构造函数的方法
 * @param：properties
 * properties = {
 *     superClass: 所继承的超类的构造函数
 *     init: 构造函数的初始化方法（函数类型）
 *     methods: 构造函数的实例拥有的方法（对象类型）
 * }
 */
define("base/createClass/1.0.1/createClass-debug", [], function(require, exports, module) {
    var createClass = function(properties) {
        // 构造函数的原型对象
        var fn;
        // 所有的方法
        var methods = properties.methods;
        // 定义构造函数
        var Constructor = function() {
            var that = this, attrs;
            // 判断是否设置了父类
            if (typeof properties.superClass === "function") {
                // 继承父类的构造函数
                properties.superClass.apply(that, arguments);
            }
            // 方法:添加属性
            that.setAttr = function(attrName, attrVal) {
                var that = this, attrObj = {};
                if (!attrs || typeof attrs !== "object") {
                    attrs = {};
                }
                if (typeof attrName === "object") {
                    attrObj = attrName;
                } else if (typeof attrName === "string") {
                    attrObj[attrName] = attrVal;
                }
                if (attrObj) {
                    for (var key in attrObj) {
                        if (attrObj.hasOwnProperty(key)) {
                            attrs[key] = attrObj[key];
                        }
                    }
                }
                return that;
            };
            // 方法:获取属性值
            that.getAttr = function(attrName) {
                var that = this, attrVal;
                if (arguments.length !== 0) {
                    if (typeof attrName !== "string") {
                        throw new Error("方法 getAttr() 的参数 attrName 必须为字符串类型");
                    }
                    if (typeof attrs === "object") {
                        attrVal = attrs[attrName];
                    }
                }
                return attrVal;
            };
            // 调用初始化方法
            if (typeof properties.init === "function") {
                properties.init.apply(that, arguments);
            }
        };
        // 继承父类原形对象上的属性
        if (typeof properties.superClass === "function") {
            var subClass = function() {};
            subClass.prototype = properties.superClass.prototype;
            Constructor.prototype = new subClass();
            Constructor.prototype._superClass = properties.superClass;
        } else {
            Constructor.prototype._superClass = Object;
        }
        // 缓存构造函数的原型对象
        fn = Constructor.fn = Constructor.prototype;
        if (methods && typeof methods === "object") {
            // 遍历：methods，将遍历得到的函数，追加至构造函数的原型对象中
            for (var key in methods) {
                if (typeof methods[key] === "function" && methods.hasOwnProperty(key)) {
                    fn[key] = methods[key];
                }
            }
        }
        // 返回构造函数
        return Constructor;
    };
    return createClass;
});