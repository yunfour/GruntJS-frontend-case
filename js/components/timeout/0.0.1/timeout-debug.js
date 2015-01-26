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
define("components/timeout/0.0.1/timeout-debug", [ "base/createClass/1.0.2/createClass-debug", "base/pubSub/1.0.0/pubSub-debug" ], function(require) {
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