// seajs模块
define("base/attribute/0.0.1/attribute-debug", [ "base/createClass/1.0.2/createClass-debug" ], function(require) {
    var createClass = require("base/createClass/1.0.2/createClass-debug");
    var Attrbute = createClass({
        init: function() {}
    });
});

/**
 * @Author  : 陈海云
 * @Version : 1.0.2
 * @Date    : 2013-10-15
 * @Update  : 2014-06-19
 * @Update-memo: 
 *          1、实现了多继承
 *          2、子类实例继承父类实例的私有变量集合（attr）
 *          3、创建类时可以直接初始化私有属性，在参数conf的attrs属性配置枚举（对象）
 * 
 * @Memo    : 提供一个创建类的构造函数的方法
 * 
 * @param   : conf
 *      conf = {
 *         superClass: 所继承的超类（父类）的构造函数：可以设置多个超类，
 *                 为超类的时候需将该属性设为一个数组，数组每个元素为
 *                 需要创建的目标类类要继承的超类，在实现时，数组中第一个类
 *                 为目标类的直接父类，而目标类只继承类其他类的属性（和方法）
 *                 因此在使用instanceOf运算符判断和父类中的关系时，只有第
 *                 一个父类会得到true的结果；如果不需要多继承则可以将该属
 *                 性设置一个构造函数即可
 * 
 *         attrs    : 初始化的私有属性，对象类型
 * 
 *         init     : 构造函数的初始化方法（函数类型）
 *         methods  : 构造函数的实例拥有的方法（对象类型）
 *      }
 * @return  : 创建类对应的构造函数，通过该构造函数创建的实例（对象）默认包含
 *            有两个方法，getAttr(attrName), setAttr(attrName, attrVal)
 *            通过这两个方法去获取、设置私有属性的值，如果该类继承了 PubSub 类，
 *            在调用setAttr方法时会触发setAttrBefore 和 setAttr，分别在设置
 *            前和设置后触发
 * 
 */
define("base/createClass/1.0.2/createClass-debug", [], function(require, exports, module) {
    /*
     * @Memo    : 克隆对象，可以将obj的属性复制到目标对象targetObj，也可以
     *            也可以单独克隆一个对象
     * @param   : 
     *      targetObj: 对象、数组类型；必填；如果只有这一个参数，则返回值为
     *          该对象的克隆版本的对象
     *      obj      : 对象；选填；如果设置了该参数，则会将该对象的属性复制
     *          到目标对象targetObj上，然后返回targetObj
     */
    function cloneObj(targetObj, obj) {
        var result;
        if (typeof obj === "object") {
            for (var k in obj) {
                // 在 iPhone 1 代等设备的 Safari 中，prototype 也会被枚举出来，需排除
                if (k !== "prototype") {
                    targetObj[k] = obj[k];
                }
            }
            result = targetObj;
        } else {
            if (typeof targetObj === "object") {
                if (targetObj.constructor === Array) {
                    result = targetObj.slice();
                } else {
                    result = {};
                    for (var kk in targetObj) {
                        // 在 iPhone 1 代等设备的 Safari 中，prototype 也会被枚举出来，需排除
                        if (kk !== "prototype") {
                            result[kk] = targetObj[kk];
                        }
                    }
                }
            } else {
                result = targetObj;
            }
        }
        return result;
    }
    function createClass(conf) {
        // 所有的方法
        var methods = conf.methods, superClasses = conf.superClass;
        // 定义构造函数
        var Constructor = function() {
            var that = this;
            // 私有属性对象（集合）
            var attrs = {};
            // 判断是否设置了父类
            if (superClasses && superClasses.constructor === Array) {
                for (var i = 0, l = superClasses.length, superClass; i < l; i++) {
                    superClass = superClasses[i];
                    // 继承父类的构造函数中的内容
                    if (typeof superClass === "function") {
                        superClass.apply(that, arguments);
                    }
                }
            }
            if (typeof that.getAttr === "function") {
                // 获取父类的私有属性集合
                attrs = cloneObj(attrs, that.getAttr() || {});
            }
            attrs = cloneObj(attrs, conf.attrs || {});
            // 方法:添加属性
            that.setAttr = function(attrName, attrVal) {
                var that = this, attrObj = {};
                // 触发事件：setAttrBefore（设置attr之前触发）
                if (typeof that.trigger === "function") {
                    that.trigger("setAttrBefore", attrName, attrVal);
                }
                if (!attrs || typeof attrs !== "object") {
                    attrs = {};
                }
                if (typeof attrName === "object") {
                    attrObj = attrName;
                } else if (typeof attrName === "string") {
                    attrObj[attrName] = attrVal;
                }
                if (attrObj) {
                    for (var k in attrObj) {
                        if (attrObj.hasOwnProperty(k)) {
                            attrs[k] = attrObj[k];
                        }
                    }
                }
                // 触发事件：setAttr（设置attr之后触发）
                if (typeof that.trigger === "function") {
                    that.trigger("setAttr", attrName, attrVal);
                }
                return that;
            };
            // 方法:获取属性值
            that.getAttr = function(attrName) {
                var that = this, attrVal;
                if (arguments.length === 0) {
                    // 如果没有设置任何参数，则将attrs对象（所有属性集合）返回
                    attrVal = cloneObj(attrs);
                } else {
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
            if (typeof conf.init === "function") {
                conf.init.apply(that, arguments);
            }
        };
        if (typeof superClasses === "function") {
            superClasses = [ superClasses ];
        }
        if (superClasses && superClasses.constructor === Array) {
            // 遍历父类列表，实现多继承
            for (var i = 0, l = superClasses.length, superClass, subClass, subObj; i < l; i++) {
                superClass = superClasses[i];
                if (typeof superClass !== "function") {
                    continue;
                }
                subClass = function() {};
                subClass.prototype = superClass.prototype;
                subObj = new subClass();
                /*
                 * 将列表中第一个父类设置成直接父类（通过instanceOf运算符可以判
                 * 断出继承关系），而当前类之使用（继承）出第一个之外的其他类的属
                 * 性（属性和方法），因此使用instanceOf运算符判断当前类的实例和
                 * 第一个类的关系式会得到true的结果，而与其他类运算的结果则问false
                 * 如：obj为当前对象的实例，
                 * 则：
                 *    obj instanceOf superClasses[0] 的结果为true
                 *    obj instanceOf superClasses[1+] 的结果为false
                 */
                if (i === 0) {
                    Constructor.prototype = subObj;
                } else {
                    for (var k in subObj) {
                        Constructor.prototype[k] = subObj[k];
                    }
                }
            }
            if (typeof superClasses[0] === "function") {
                Constructor.prototype.superClass = superClasses[0];
            }
        } else {
            Constructor.prototype.superClass = Object;
        }
        if (methods && typeof methods === "object") {
            // 遍历：methods，将遍历得到的函数，追加至构造函数的原型对象中
            for (var key in methods) {
                if (typeof methods[key] === "function" && methods.hasOwnProperty(key)) {
                    Constructor.prototype[key] = methods[key];
                }
            }
        }
        // 返回构造函数
        return Constructor;
    }
    return createClass;
});

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

/**
 * @Author      : 陈海云
 * @Date        : 2014-05-16
 * @Update      : 2014-06-30
 * @Memo        : 提供一个实现订阅-发布模式的构造函数，使用场景: 需要事件处理的场景
 * @Update-Memo : 增加once方法
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
 *      unbind: 
 *          描述: 解绑（取消订阅）事件；
 *          参数: 
 *              eventsName——事件名称（选填，不设置该参数的时候则解绑所有事件的所有回调函数），
 *              callback——事件回调函数（选填，不设置该参数的时候则删除eventsName对应事件的所有回调函数）
 *                        如果两个参数均设置，则只删除eventName对应和callback函数相同的回调函数；
 *          返回值: 当前对象
 *      trigger: 
 *          描述: 发布消息（触发事件）；
 *          参数: 
 *              eventsName——事件名称（选填，不设置该参数的时候则解绑所有事件的所有回调函数），
 *              callback——事件回调函数（选填，不设置该参数的时候则删除eventsName对应事件的所有回调函数）
 *                        如果两个参数均设置，则只删除eventName对应和callback函数相同的回调函数；
 *          返回值: 当前对象
 *      on: 
 *          描述: 扩展方法，可以使用该方法绑定/触发事件；
 *          参数: 
 *              eventsName——事件名称（必填，需要绑定/触发的事件名称）
 *              callback——事件回调函数，选填，如果添加了该参数，则将callback函
 *                        数绑定到eventName事件中，如果没有该参数，则触发名字
 *                        为: eventName的事件
 *          返回值: 当前对象
 *      once:
 *          描述: 通过该方法绑定的事件回调，在触发对应事件时只会执行一次
 *          参数: 
 *              eventName——事件名称
 *              callback——事件回调函数
 */
define("base/pubSub/1.0.3/pubSub-debug", [ "base/createClass/1.0.2/createClass-debug" ], function(require, exports, module) {
    var createClass = require("base/createClass/1.0.2/createClass-debug");
    var SPLITTER = ",";
    var PubSub = createClass({
        methods: {
            bind: function(eventsName, callback) {
                var that = this, events = that.getAttr("events");
                eachEvents(eventsName, function(eventName) {
                    bind.apply(that, [ eventName, callback ]);
                });
                return that;
            },
            unbind: function(eventsName, callback) {
                var that = this, events = that.getAttr("events");
                if (arguments.length === 0) {
                    // 单独调用unbind方法不传递任何参数时，则解绑所有事件回调
                    events = null;
                    events = {};
                    that.setAttr("events", events);
                } else {
                    var args = Array.prototype.slice.apply(arguments);
                    args.shift();
                    eachEvents(eventsName, function(eventName) {
                        var theArgs = args.slice();
                        theArgs.unshift(eventName);
                        unbind.apply(that, theArgs);
                    });
                }
                return that;
            },
            trigger: function(eventsName) {
                var that = this, args = Array.prototype.slice.apply(arguments);
                if (arguments.length === 0) {
                    return that;
                }
                eventsName = args.shift();
                eachEvents(eventsName, function(eventName) {
                    var theArgs = args.slice();
                    theArgs.unshift(eventName);
                    trigger.apply(that, theArgs);
                });
                return that;
            },
            on: function(eventsName, callback) {
                var that = this;
                if (arguments.length === 1) {
                    that.trigger(eventsName);
                } else if (arguments.length > 1) {
                    that.bind(eventsName, callback);
                }
                return that;
            },
            once: function(eventName, callback) {
                this.bind(eventName, function() {
                    if (typeof callback === "function") {
                        callback.apply(this, arguments);
                    }
                    this.unbind(eventName, arguments.callee);
                });
            }
        }
    });
    function bind(eventName, callback) {
        var that = this, events = that.getAttr("events");
        if (typeof eventName !== "string") {
            throw new Error("方法 bind(eventName, callback) 的参数eventName 必须为字符串");
        }
        // 判断是否有事件对象（存放存储所有时间的对象）
        if (typeof events !== "object") {
            events = {};
        }
        // 判断当前事件数组是否存在，并初始化
        if (!(events[eventName] instanceof Array)) {
            events[eventName] = [];
        }
        // 将事件的回调函数加入事件数组
        if (typeof callback === "function") {
            events[eventName].push(callback);
        }
        that.setAttr("events", events);
    }
    function unbind(eventName, callback) {
        var that = this, events = that.getAttr("events");
        if (arguments.length === 0) {
            events = null;
            events = {};
            that.setAttr("events", events);
        } else if (arguments.length === 1) {
            if (typeof eventName !== "string") {
                throw new Error("方法 unbind(eventName, callback) 的参数 eventName 必须为字符串");
            }
            if (events && events[eventName] instanceof Array) {
                events[eventName].length = 0;
            }
        } else {
            if (typeof eventName !== "string") {
                throw new Error("方法 unbind(eventName, callback) 的参数 eventName 必须为字符串");
            }
            if (events && events[eventName] instanceof Array) {
                if (typeof callback === "function") {
                    var _eventArr = events[eventName];
                    for (var i = _eventArr.length - 1; i >= 0; i--) {
                        if (_eventArr[i] === callback) {
                            _eventArr.splice(i, 1);
                        }
                    }
                } else {
                    events[eventName].length = 0;
                }
            }
        }
        that.setAttr("events", events);
        return that;
    }
    function trigger(eventName) {
        var that = this, events = that.getAttr("events"), args = Array.prototype.slice.apply(arguments);
        eventName = args.shift();
        if (typeof eventName !== "string") {
            throw new Error("方法 trigger(eventName) 的参数eventName 必须为字符串");
        }
        if (events && events[eventName] instanceof Array) {
            // 变量事件数组中的所有回调函数并触发
            for (var i = 0, l = events[eventName].length; i < l; i++) {
                if (typeof events[eventName][i] === "function") {
                    var result = events[eventName][i].apply(that, args);
                    // 绑定的函数中有返回false的，则中止其后绑定的函数
                    if (result === false) {
                        break;
                    }
                }
            }
        }
        return that;
    }
    function eachEvents(eventsName, callback) {
        if (typeof eventsName !== "string") {
            throw new Error("函数 eachEvents(eventsName) 的参数 eventsName 必须为字符串");
        }
        eventsName = split(eventsName);
        for (var i = 0, l = eventsName.length, eventName; i < l; i++) {
            eventName = eventsName[i];
            if (typeof callback === "function") {
                callback(eventName);
            }
        }
    }
    function split(str) {
        return str.split(SPLITTER);
    }
    return PubSub;
});

/*
 * 函数: singleto(obj, init)
 * 作用: 单例模式的实现，向该函数传递一个对象，该函数返回一个function，
 *       该function在所有地方执行后的返回结果都是同一个对象
 * 参数:
 *      obj : 目标对象
 * 返回值: function类型；返回一个函数，该函数在任何地方执行都会返回
 *        同一个对象
 */
define("base/singleton/1.0.0/singleton-debug", [], function(require) {
    var singleton = function(obj) {
        var singletonObj = obj || {};
        return function() {
            return singletonObj;
        };
    };
    return singleton;
});
