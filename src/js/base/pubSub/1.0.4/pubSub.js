/**
 * @Author      : 陈海云
 * @Date        : 2014-05-16
 * @Update      : 2014-06-30
 * @Memo        : 提供一个实现订阅-发布模式的构造函数，使用场景: 需要事件处理的场景
 * @Update-Memo : 修改once方法实现
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
 * 
 *      unbind: 
 *          描述: 解绑（取消订阅）事件；
 *          参数: 
 *              eventsName——事件名称（选填，不设置该参数的时候则解绑所有事件的所有回调函数），
 *              callback——事件回调函数（选填，不设置该参数的时候则删除eventsName对应事件的所有回调函数）
 *                        如果两个参数均设置，则只删除eventName对应和callback函数相同的回调函数；
 *          返回值: 当前对象
 * 
 *      trigger: 
 *          描述: 发布消息（触发事件）；
 *          参数: 
 *              eventsName——事件名称（选填，不设置该参数的时候则解绑所有事件的所有回调函数），
 *              callback——事件回调函数（选填，不设置该参数的时候则删除eventsName对应事件的所有回调函数）
 *                        如果两个参数均设置，则只删除eventName对应和callback函数相同的回调函数；
 *          返回值: 当前对象
 * 
 *      on: 
 *          描述: 扩展方法，可以使用该方法绑定/触发事件；
 *          参数: 
 *              eventsName——事件名称（必填，需要绑定/触发的事件名称）
 *              callback——事件回调函数，选填，如果添加了该参数，则将callback函
 *                        数绑定到eventName事件中，如果没有该参数，则触发名字
 *                        为: eventName的事件
 *          返回值: 当前对象
 * 
 *      off: 
 *          描述: 解绑（取消订阅）事件；
 *          参数: 
 *              eventsName——事件名称（选填，不设置该参数的时候则解绑所有事件的所有回调函数），
 *              callback——事件回调函数（选填，不设置该参数的时候则删除eventsName对应事件的所有回调函数）
 *                        如果两个参数均设置，则只删除eventName对应和callback函数相同的回调函数；
 *          返回值: 当前对象
 * 
 *      once:
 *          描述: 通过该方法绑定的事件回调，在触发对应事件时只会执行一次
 *          参数: 
 *              eventName——事件名称
 *              callback——事件回调函数
 */

define(function (require, exports, module) {
    var createClass = require('base/createClass/1.0.2/createClass');
    
    var SPLITTER = ',';
    
    var PubSub = createClass({
        methods: {

            bind: function(eventsName, callback) {
                var that   = this,
                    events = that.getAttr('events');
                
                eachEvents(eventsName, function(eventName) {
                    bind.apply(that, [eventName, callback]);
                });
                
                return that;
            },

            unbind: function(eventsName, callback) {
                var that   = this,
                    events = that.getAttr('events');
                
                if(arguments.length === 0) {
                    
                    // 单独调用unbind方法不传递任何参数时，则解绑所有事件回调
                    events = null;
                    events = {};
                    that.setAttr('events', events);
                    
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
                var that = this,
                    args = Array.prototype.slice.apply(arguments);
                
                if(arguments.length === 0) {
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
                
                if(arguments.length === 1) {
                    that.trigger(eventsName);
                } else if(arguments.length > 1) {
                    that.bind(eventsName, callback);
                }
                
                return that;
            },

            off: function(eventsName, callback) {
                var that = this;
                
                that.unbind(eventsName, callback);
                
                return that;
            },
            
            once: function(eventName, callback) {
                
                if(typeof callback === 'function') {
                    
                    this.bind(eventName, function() {
                        
                        callback.apply(this, arguments);
                        
                        this.unbind(eventName, arguments.callee);
                    });
                }
            }
        }
    });
    
    function bind(eventName, callback) {
        var that   = this,
            events = that.getAttr('events');
        
        if(typeof eventName !== 'string') {
            throw new Error('方法 bind(eventName, callback) 的参数eventName 必须为字符串');
        }
        
        // 判断是否有事件对象（存放存储所有时间的对象）
        if(typeof events !== 'object') {
            events = {};
        }
        
        // 判断当前事件数组是否存在，并初始化
        if(!(events[eventName] instanceof Array)) {
            events[eventName] = [];
        }
        
        // 将事件的回调函数加入事件数组
        if(typeof callback === 'function') {
            events[eventName].push(callback);
        }
        
        that.setAttr('events', events);
    }
    
    function unbind(eventName, callback) {
        var that    = this,
            events  = that.getAttr('events');
        
        if(arguments.length === 0) {
            
            events = null;
            events = {};
            that.setAttr('events', events);
            
        } else if(arguments.length === 1) {
            
            if(typeof eventName !== 'string') {
                throw new Error('方法 unbind(eventName, callback) 的参数 eventName 必须为字符串');
            }
            
            if(events && events[eventName] instanceof Array) {
                events[eventName].length = 0;
            }
        } else {
            
            if(typeof eventName !== 'string') {
                throw new Error('方法 unbind(eventName, callback) 的参数 eventName 必须为字符串');
            }
            
            if(events && events[eventName] instanceof Array) {
                
                if(typeof callback === 'function') {
                    
                    var eventArr = events[eventName];
                    
                    for(var i = eventArr.length - 1; i >= 0; i --) {
                        
                        if(eventArr[i] === callback) {
                            eventArr[i] = null;
                        }
                    }
                } else {
                    events[eventName].length = 0;
                }
            }
        }
        
        that.setAttr('events', events);
        
        return that;
    }
    
    function trigger(eventName) {
        
        var that    = this,
            events  = that.getAttr('events'),
            args    = Array.prototype.slice.apply(arguments),
            eventsFn;
        
        // 记录无效事件会点函数的索引
        var invalidEventFnIndexArr = [];
        
        eventName = args.shift();
        
        if(typeof eventName !== 'string') {
            throw new Error('方法 trigger(eventName) 的参数eventName 必须为字符串');
        }
        
        if(events && events[eventName] instanceof Array) {
            
            eventsFn = events[eventName];
            
            // 变量事件数组中的所有回调函数并触发
            for(var i = 0, l = eventsFn.length; i < l; i ++) {
                
                if(typeof eventsFn[i] === 'function') {
                    
                    var result = eventsFn[i].apply(that, args);
                    
                    // 绑定的函数中有返回false的，则中止其后绑定的函数
                    if(result === false) {
                        break;
                    }
                } else {
                    
                    /*
                     * 判断回调函数数组中的元素是否为function类型,如果
                     * 不是function类型,则为无效回调函数,将该无效回调
                     * 函数的索引记录到invalidEventFnIndexArr数组中
                     * 等事件触发完毕后,将无效回调函数清理掉
                     */
                    invalidEventFnIndexArr.push(i);
                }
            }
            
            
            // 清理无效回调函数,从后往前依次清理回调函数数组eventsFn中的无效回调函数
            for(i = invalidEventFnIndexArr.length - 1; i >= 0; i --) {
                
                eventsFn.splice(i, 1);
            }
            
            that.setAttr('events', events);
        }
        
        return that;
    }

    function eachEvents(eventsName, callback) {
        
        if(typeof eventsName !== 'string') {
            throw new Error('函数 eachEvents(eventsName) 的参数 eventsName 必须为字符串');
        }
        
        eventsName = split(eventsName);
        
        for(var i = 0, l = eventsName.length, eventName; i < l; i ++) {
            eventName = eventsName[i];
            
            if(typeof callback === 'function') {
                callback(eventName);
            }
        }
    }
    
    function split(str) {
        return str.split(SPLITTER);
    }
    
    return PubSub;
});