/**
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