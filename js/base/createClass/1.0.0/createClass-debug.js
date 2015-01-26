/**
 * @Author：陈海云
 * @Date：2013-10-15
 * @Update：2014-04-10
 * @Update-memo：增加配置属性superClass，使在创建新类的时候，可以继承该属性设置的类（超类）
 * @Memo：提供一个创建类的构造函数的方法
 * @param：properties
 * properties = {
 *     superClass: 所继承的超类的构造函数
 *     init: 构造函数的初始化方法（函数类型）
 *     methods: 构造函数的实例拥有的方法（对象类型）
 * }
 */
define("base/createClass/1.0.0/createClass-debug", [], function(require, exports, module) {
    var createClass = function(properties) {
        // 构造函数的原型对象
        var fn;
        // 所有的方法
        var methods = properties.methods;
        // 定义构造函数
        var Constructor = function() {
            var that = this;
            // 判断是否设置了父类
            if (typeof properties.superClass === "function") {
                // 继承父类的构造函数
                properties.superClass.apply(that, arguments);
            }
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
        // 方法:添加属性
        fn.setAttr = function(attrName, attrVal) {
            var that = this, attrObj = {};
            if (!that._attr || typeof that._attr !== "object") {
                that._attr = {};
            }
            if (typeof attrName === "object") {
                attrObj = attrName;
            } else if (typeof attrName === "string") {
                attrObj[attrName] = attrVal;
            }
            if (attrObj) {
                for (var key in attrObj) {
                    if (attrObj.hasOwnProperty(key)) {
                        that._attr[key] = attrObj[key];
                    }
                }
            }
            return that;
        };
        // 方法:获取属性值
        fn.getAttr = function(attrName) {
            var that = this, attrVal;
            if (typeof attrName !== "string") {
                throw new Error("方法 getAttr() 的参数 attrName 必须为字符串类型");
            }
            if (typeof that._attr === "object") {
                attrVal = that._attr[attrName];
            }
            return attrVal;
        };
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