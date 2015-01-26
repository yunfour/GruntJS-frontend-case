// seajs模块
define("base/attribute/0.0.1/attribute-debug", [ "base/createClass/1.0.2/createClass-debug", "base/pubSub/1.0.3/pubSub-debug" ], function(require) {
    var createClass = require("base/createClass/1.0.2/createClass-debug"), pubSub = require("base/pubSub/1.0.3/pubSub-debug");
    var Attrbute = createClass({
        superClass: [ pubSub ],
        init: function() {},
        methods: {
            getAttr: function(attrName) {},
            setAttr: function(attrName, attrVal) {}
        }
    });
});
;/**
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
;/**
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
;/**
 * @Author      : 陈海云
 * @Date        : 2014-12-01
 * @Memo        : 提供一个实现Promise/Deffer模式的构造函数
 * 
 * @param       : 无
 * 
 * @methods:
 *      bind:
 *          描述: 绑定（订阅）事件；
 *          参数: 
 *              eventsName——事件名称（必填），
 *              callback——事件回调函数（选填，未设置该参数或者该参数为非function类型时则绑定无效）；
 *          返回值: 当前对象
 */
define("base/promise/0.0.1/promise-debug", [ "base/createClass/1.0.2/createClass-debug", "base/pubSub/1.0.3/pubSub-debug" ], function(require) {
    var createClass = require("base/createClass/1.0.2/createClass-debug"), PubSub = require("base/pubSub/1.0.3/pubSub-debug");
    var UNFULFILLED = 0, // 未完成
    RESOLVED = 1, // 已完成
    REJECTED = 2;
    // 拒绝
    var Promise = createClass({
        superClass: PubSub,
        methods: {
            then: function(onResolved, onRejected) {
                if (typeof onResolved === "function") {
                    this.once("resolve", onResolved);
                }
                if (typeof onRejected === "function") {
                    this.once("reject", onRejected);
                }
                return this;
            }
        }
    });
    var Deffered = createClass({
        init: function() {
            var promise = new Promise();
            this.setAttr("promise", promise);
            this.setAttr("state", UNFULFILLED);
        },
        methods: {
            resolve: function(data) {
                var promise = this.getAttr("promise");
                promise.trigger("resolve", data);
                this.setAttr("state", RESOLVED);
                return this;
            },
            reject: function(data) {
                var promise = this.getAttr("promise");
                promise.trigger("reject", data);
                this.setAttr("state", REJECTED);
                return this;
            }
        }
    });
    var getData = function(callback) {
        setTimeout(function() {
            var data = {
                date: new Date(),
                r: parseInt(Math.random() * 1e5)
            };
            if (typeof callback === "function") {
                callback(data);
            }
        }, 5e3);
    };
    function promisy() {
        var deffered = new Deffered();
        getData(function(data) {
            if (data.r > 1e4) {
                deffered.resolve(data);
            } else {
                deffered.reject(data);
            }
        });
        return deffered.getAttr("promise");
    }
    promisy().then(function(data) {
        console.log("Resolve");
        console.log(data);
    }, function(data) {
        console.log("Reject");
        console.log(data);
    });
    return Deffered;
});
;/**
 * @Author：陈海云
 * @Date：2014-05-16
 * @Memo：提供一个实现订阅-发布模式的构造函数，使用场景：需要事件处理的场景
 * @param：无
 * @methods：
 *      bind：
 *          描述：绑定（订阅）事件；
 *          参数：
 *              eventName——事件名称（必填），
 *              callback——事件回调函数（选填，未设置该参数或者该参数为非function类型时则绑定无效）；
 *          返回值：当前对象
 *      unbind：
 *          描述：解绑（取消订阅）事件；
 *          参数：
 *              eventName——事件名称（选填，不设置该参数的时候则解绑所有事件的所有回调函数），
 *              callback——事件回调函数（选填，不设置该参数的时候则删除eventName对应事件的所有回调函数）
 *                        如果两个参数均设置，则只删除eventName对应和callback函数相同的回调函数；
 *          返回值：当前对象
 *      trigger：
 *          描述：发布消息（触发事件）；
 *          参数：
 *              eventName——事件名称（选填，不设置该参数的时候则解绑所有事件的所有回调函数），
 *              callback——事件回调函数（选填，不设置该参数的时候则删除eventName对应事件的所有回调函数）
 *                        如果两个参数均设置，则只删除eventName对应和callback函数相同的回调函数；
 *          返回值：当前对象
 *      on：
 *          描述：扩展方法，可以使用该方法绑定/触发事件；
 *          参数：
 *              eventName——事件名称（必填，需要绑定/触发的事件名称）
 *              callback——事件回调函数，选填，如果添加了该参数，则将callback函
 *                        数绑定到eventName事件中，如果没有该参数，则触发名字
 *                        为：eventName的事件
 *          返回值：当前对象
 */
define("base/pubSub/1.0.0/pubSub-debug", [ "base/createClass/1.0.1/createClass-debug" ], function(require, exports, module) {
    var createClass = require("base/createClass/1.0.1/createClass-debug");
    var PubSub = createClass({
        init: function() {
            // 声明事件对象（存放存储所有时间的对象）
            this._events = {};
        },
        methods: {
            /*
             * 类型: 方法
             * 名称: bind
             * 作用: 添加绑定（自定义）事件：
             * 参数: eventName——事件名称（必填）
             *      callback——事件回调函数（选填，未设置该参数或者该参数为非function类型时则绑定无效）
             */
            bind: function(eventName, callback) {
                var that = this;
                if (typeof eventName !== "string") {
                    throw new Error("方法 bind(eventName, callback) 的参数eventName 必须为字符串");
                }
                // 判断是否有事件对象（存放存储所有时间的对象）
                if (typeof that._events !== "object") {
                    that._events = {};
                }
                // 判断当前事件数组是否存在，并初始化
                if (!(that._events[eventName] instanceof Array)) {
                    that._events[eventName] = [];
                }
                // 将事件的回调函数加入事件数组
                if (typeof callback === "function") {
                    that._events[eventName].push(callback);
                }
                return that;
            },
            /*
             * 类型: 方法
             * 名称: unbind
             * 作用: 解绑（自定义）事件：
             * 参数: 
             *      eventName——事件名称（必填，需要触发的事件名称）
             *      targetObj——回调函数中的this对应的对象（选填，不设置
             *                 该参数的时候为当前订阅器对象本身）
             */
            unbind: function(eventName, callback) {
                var that = this;
                if (arguments.length === 0) {
                    that._events = null;
                    that._events = {};
                } else if (arguments.length === 1) {
                    if (typeof eventName !== "string") {
                        throw new Error("方法 unbind(eventName, callback) 的参数 eventName 必须为字符串");
                    }
                    if (that._events && that._events[eventName] instanceof Array) {
                        that._events[eventName].length = 0;
                    }
                } else {
                    if (typeof eventName !== "string") {
                        throw new Error("方法 unbind(eventName, callback) 的参数 eventName 必须为字符串");
                    }
                    if (that._events && that._events[eventName] instanceof Array) {
                        if (typeof callback === "function") {
                            var _eventArr = that._events[eventName];
                            for (var i = _eventArr.length - 1; i >= 0; i--) {
                                if (_eventArr[i] === callback) {
                                    _eventArr.splice(i, 1);
                                }
                            }
                        } else {
                            that._events[eventName].length = 0;
                        }
                    }
                }
            },
            /*
             * 类型: 方法
             * 名称: trigger
             * 作用: 触发绑定事件
             * 参数: eventName——事件名称（必填，需要触发的事件名称）
             *      targetObj——回调函数中的this对应的对象（选填，不设置该参数的时候为当前订阅器对象本身）
             */
            trigger: function(eventName, targetObj) {
                var that = this;
                that.eventName = eventName;
                targetObj = targetObj || that;
                if (typeof eventName !== "string") {
                    throw new Error("方法 trigger(eventName) 的参数eventName 必须为字符串");
                }
                if (that._events && that._events[eventName] instanceof Array) {
                    // 变量事件数组中的所有回调函数并触发
                    for (var i = 0, l = that._events[eventName].length; i < l; i++) {
                        if (typeof that._events[eventName][i] === "function") {
                            var result = that._events[eventName][i].apply(targetObj, [ that ]);
                            // 绑定的函数中有返回false的，则中止其后绑定的函数
                            if (result === false) {
                                break;
                            }
                        }
                    }
                }
                return this;
            },
            /*
             * 类型: 方法
             * 名称: on
             * 作用: 扩展方法，可以使用该方法绑定/触发事件
             * 参数: 
             *      eventName——事件名称（必填，需要绑定/触发的事件名称）
             *      callback——事件回调函数，选填，如果添加了该参数，则将callback函
             *                数绑定到eventName事件中，如果没有该参数，则触发名字
             *                为：eventName的事件
             */
            on: function(eventName, callback) {
                var that = this;
                if (arguments.length === 1) {
                    that.trigger(eventName);
                } else if (arguments.length > 1) {
                    that.bind(eventName, callback);
                }
                return that;
            }
        }
    });
    return PubSub;
});
;/*
 * 函数: singleton(obj, init)
 * 
 * 作用: 单例模式的实现，向该函数传递一个对象，该函数返回一个function，
 *       该function在所有地方执行后的返回结果都是同一个对象
 * 
 * 参数:
 *      obj : 目标对象
 * 
 * 返回值: function类型；返回一个函数，该函数在任何地方执行都会返回
 *        同一个对象
 */
define("base/singleton/1.0.0/singleton-debug", [], function(require) {
    function singleton(obj) {
        var singletonObj = obj || {};
        return function() {
            return singletonObj;
        };
    }
    return singleton;
});