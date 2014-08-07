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
