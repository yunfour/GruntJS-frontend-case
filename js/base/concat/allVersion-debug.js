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
            Constructor.prototype.superClass = properties.superClass;
        } else {
            Constructor.prototype.superClass = Object;
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
            Constructor.prototype.superClass = properties.superClass;
        } else {
            Constructor.prototype.superClass = Object;
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
 * @Date        : 2014-06-12
 * @Memo        : 实现一个模拟进度的过程（可用于ajax请求等场景，模拟进度条），
 *                进度的值都是模拟实现，并非任务准确的进度
 * @superClass  : PubSub，继承该类，为了实现其事件处理的机制，
 * @param       : 无
 * @methods: 
 *      start:
 *          描述       : 启动进度，当任务开始的时候调用此方法
 *          参数       : 无
 *          返回值    : 当前对象
 *      finish:
 *          描述       : 完成进度，当任务结束时调用此方法，此时进度为100%
 *          参数       : 无
 *          返回值    : 当前对象
 *      pause:
 *          描述       : 暂停进度，任务进行时出现某些情况，需要暂停进度，此时进度保持当前值
 *          参数       : 无
 *          返回值    : 当前对象
 *      stop:
 *          描述       : 停止进度，任务进行时出现某些情况，需要停止进度，此时进度会置为0
 *          参数       : 无
 *          返回值    : 当前对象
 *      restart:
 *          描述       : 重启进度，如果任务暂停、完成或者停止，则可以调用此方法重新启动进
 *                   度，此时进入则之前保持的进度开始计算
 *          参数       : 无
 *          返回值    : 当前对象
 *      getProgress:
 *          描述       : 获取当前进度的值
 *          参数       : 无
 *          返回值    : 当前进度的值，0-100的一个数字
 * 
 *      其他方法：其他方法继承自超类：PubSub，请参考该类的方法
 * @events：
 *      start   : 启动时触发
 *      finish  : 进度完成时触发
 *      pause   : 进度暂停时触发
 *      stop    : 进度停止时触发
 *      restart : 进度重启
 *      progress: 进度进行中时触发（进度每次发生变化都会触发）
 */
define("base/progress/0.0.1/progress-debug", [ "base/createClass/1.0.1/createClass-debug", "base/pubSub/1.0.0/pubSub-debug" ], function(require) {
    var createClass = require("base/createClass/1.0.1/createClass-debug"), PubSub = require("base/pubSub/1.0.0/pubSub-debug");
    var Progress = createClass({
        superClass: PubSub,
        init: function() {
            this.setAttr("percent", 0);
        },
        methods: {
            start: function() {
                var that = this, interval = that.getAttr("interval"), timeout = 20, cumulateTime = 0;
                window.clearInterval(interval);
                interval = window.setInterval(function() {
                    var percent = that.getAttr("percent"), finished = that.getAttr("finished", true);
                    if (finished) {
                        percent += 3;
                    } else if (percent < 17) {
                        percent += .61;
                    } else if (percent >= 17 && percent < 27) {
                        percent += .02;
                    } else if (percent >= 27 && percent < 37) {
                        percent += .21;
                    } else if (percent >= 37 && percent < 47) {
                        percent += .1;
                    } else if (percent >= 47 && percent < 57) {
                        percent += .08;
                    } else if (percent >= 57 && percent < 67) {
                        percent += .05;
                    } else if (percent >= 67 && percent < 77) {
                        percent += .04;
                    } else if (percent >= 77 && percent < 87) {
                        percent += .02;
                    }
                    if (percent >= 100) {
                        percent = 100;
                        window.clearInterval(interval);
                        that.on("finish");
                    }
                    cumulateTime += timeout;
                    that.setAttr({
                        percent: percent,
                        cumulateTime: cumulateTime
                    });
                    that.on("progress");
                }, timeout);
                that.setAttr("interval", interval);
                return this;
            },
            finish: function() {
                var that = this;
                that.setAttr("finished", true);
                return that;
            },
            pause: function() {
                var that = this, interval = that.getAttr("interval");
                window.clearInterval(interval);
                that.on("pause");
                return that;
            },
            stop: function() {
                var that = this;
                that.setAttr({
                    percent: 0,
                    finished: false,
                    cumulateTime: 0
                }).pause();
                that.on("stop");
                return that;
            },
            restart: function() {
                this.setAttr({
                    percent: 0,
                    finished: false,
                    cumulateTime: 0
                }).start();
                this.on("restart");
                return this;
            },
            getProgress: function() {
                return this.getAttr("percent");
            }
        }
    });
    return Progress;
});

/**
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

/**
 * @Author      : 陈海云
 * @Date        : 2014-05-16
 * @Update      : 2014-06-19
 * @Memo        : 提供一个实现订阅-发布模式的构造函数，使用场景: 需要事件处理的场景
 * @Update-Memo : 将事件回调函数的集合(attrs.events)改成私有的变量
 * @param       : 无
 * 
 * @methods:
 *      bind:
 *          描述: 绑定（订阅）事件；
 *          参数: 
 *              eventName——事件名称（必填），
 *              callback——事件回调函数（选填，未设置该参数或者该参数为非function类型时则绑定无效）；
 *          返回值: 当前对象
 *      unbind: 
 *          描述: 解绑（取消订阅）事件；
 *          参数: 
 *              eventName——事件名称（选填，不设置该参数的时候则解绑所有事件的所有回调函数），
 *              callback——事件回调函数（选填，不设置该参数的时候则删除eventName对应事件的所有回调函数）
 *                        如果两个参数均设置，则只删除eventName对应和callback函数相同的回调函数；
 *          返回值: 当前对象
 *      trigger: 
 *          描述: 发布消息（触发事件）；
 *          参数: 
 *              eventName——事件名称（选填，不设置该参数的时候则解绑所有事件的所有回调函数），
 *              callback——事件回调函数（选填，不设置该参数的时候则删除eventName对应事件的所有回调函数）
 *                        如果两个参数均设置，则只删除eventName对应和callback函数相同的回调函数；
 *          返回值: 当前对象
 *      on: 
 *          描述: 扩展方法，可以使用该方法绑定/触发事件；
 *          参数: 
 *              eventName——事件名称（必填，需要绑定/触发的事件名称）
 *              callback——事件回调函数，选填，如果添加了该参数，则将callback函
 *                        数绑定到eventName事件中，如果没有该参数，则触发名字
 *                        为: eventName的事件
 *          返回值: 当前对象
 */
define("base/pubSub/1.0.1/pubSub-debug", [ "base/createClass/1.0.2/createClass-debug" ], function(require, exports, module) {
    var createClass = require("base/createClass/1.0.2/createClass-debug");
    var PubSub = createClass({
        methods: {
            /*
             * 类型: 方法
             * 名称: bind
             * 作用: 添加绑定（自定义）事件: 
             * 参数: eventName——事件名称（必填）
             *      callback——事件回调函数（选填，未设置该参数或者该参数为非function类型时则绑定无效）
             */
            bind: function(eventName, callback) {
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
                return that;
            },
            /*
             * 类型: 方法
             * 名称: unbind
             * 作用: 解绑（自定义）事件: 
             * 参数: 
             *      eventName——事件名称（必填，需要触发的事件名称）
             *      targetObj——回调函数中的this对应的对象（选填，不设置
             *                 该参数的时候为当前订阅器对象本身）
             */
            unbind: function(eventName, callback) {
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
            },
            /*
             * 类型: 方法
             * 名称: trigger
             * 作用: 触发绑定事件
             * 参数: eventName——事件名称（必填，需要触发的事件名称）
             */
            trigger: function(eventName) {
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
            },
            /*
             * 类型: 方法
             * 名称: on
             * 作用: 扩展方法，可以使用该方法绑定/触发事件
             * 参数: 
             *      eventName——事件名称（必填，需要绑定/触发的事件名称）
             *      callback——事件回调函数，选填，如果添加了该参数，则将callback函
             *                数绑定到eventName事件中，如果没有该参数，则触发名字
             *                为: eventName的事件
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

/**
 * @Author      : 陈海云
 * @Date        : 2014-05-16
 * @Update      : 2014-06-30
 * @Memo        : 提供一个实现订阅-发布模式的构造函数，使用场景: 需要事件处理的场景
 * @Update-Memo : 在绑定、解绑事件支持多事件名称，每个事件名称直接使用逗号“,”隔开，
 *                例如: p.trigger('change,select')，同时触发：change、select
 *                事件，方法：on(), bind(), unbind()一样的方式
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
 */
define("base/pubSub/1.0.2/pubSub-debug", [ "base/createClass/1.0.2/createClass-debug" ], function(require, exports, module) {
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
                    // 单独调用unbind方法不传递任何参数时，则解绑所有时间回调
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

/**
 * @Author：陈海云
 * @Date：2014-05-16
 * @Memo：提供一个记录超时时间的构造函数，使用场景：一个操作需要
 *       在一定时间段内才能完成，例如：一部请求，通过该构造函数
 *       初始化实例，当操作时间超过设置的时间是会触发"timeout"的事件；
 *       构造函数继承了PubSub，因此部分方法请参考类 PubSub 对应的模
 *       块：common/pubSub/1.0.0/pubSub.js
 * @superClass：PubSub，继承该类，为了实现其事件处理的机制，
 * @param：time——初始设置超时时间，单位：毫秒
 * @methods：
 *      setTime：
 *          描述：设置超时时间；
 *          参数：
 *              millisecond——超时时间（单位：毫秒）；
 *          返回值：当前对象
 *      start：
 *          描述：启动超时器；
 *          参数：无；
 *          返回值：当前对象
 *      stop：
 *          描述：停止超时记录，使用该方法后，下次在启动超时器时则从0开始计时；
 *          参数：无；
 *          返回值：当前对象
 *      pause： 
 *          描述：暂停定时器，使用该方法后，下次启动超时器时则从暂停的时刻开始计时；
 *          参数：无
 *          返回值：当前对象
 *      其他方法：其他方法继承自超类：PubSub，请参考该类的方法
 * @events：
 *      start   ：启动时触发
 *      timeout ：超时时触发
 *      stop    ：停止定时器是触发
 *      pause   ：暂停定时器触发
 */
define("base/timeout/0.0.1/timeout-debug", [ "base/createClass/1.0.2/createClass-debug", "base/pubSub/1.0.0/pubSub-debug" ], function(require) {
    var createClass = require("base/createClass/1.0.2/createClass-debug"), PubSub = require("base/pubSub/1.0.0/pubSub-debug");
    var Timeout = createClass({
        // 设置超类
        superClass: PubSub,
        // 初始化方法
        init: function(time) {
            var that = this;
            that.setAttr({
                time: parseInt(time, 10) || 0,
                curTime: 0
            });
        },
        // 方法
        methods: {
            // 设置超时时间
            setTime: function(millisecond) {
                var that = this;
                millisecond = parseInt(millisecond, 10);
                if (isNaN(millisecond) || millisecond <= 0) {
                    throw new Error("方法：setTime(millisecond) 的参数 millisecond 必须为大于数字");
                }
                that.setAttr("time", millisecond);
                return that;
            },
            // 启动超时器
            start: function() {
                var that = this, time = that.getAttr("time");
                var timer = window.setInterval(function() {
                    var curTime = that.getAttr("curTime") + 50;
                    if (curTime >= time) {
                        that.on("timeout").stop();
                    }
                    that.setAttr("curTime", curTime);
                }, 50);
                window.clearInterval(that.getAttr("timer"));
                that.setAttr("timer", timer).on("start");
                return that;
            },
            // 停止记录超时时间
            stop: function() {
                var that = this;
                that.setAttr("curTime", 0).pause().on("stop");
                return that;
            },
            // 暂停记录超时时间
            pause: function() {
                var that = this;
                window.clearTimeout(that.getAttr("timer"));
                that.on("pause");
                return that;
            }
        }
    });
    return Timeout;
});
