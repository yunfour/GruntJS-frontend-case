/**
 * @Author      : 陈海云
 * @Date        : 2014-06-12
 * @Memo        : 实现一个模拟进度的过程（可用于ajax请求等场景，模拟进度条），
 *                进度的值都是模拟实现，并非任务准确的进度
 * @SuperClass  : PubSub，继承该类，为了实现其事件处理的机制，
 * @Param       : 无
 * @Methods: 
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
 * @Events:
 *      start      : 启动时触发
 *      finish     : 进度完成时触发
 *      pause      : 进度暂停时触发
 *      stop       : 进度停止时触发
 *      restart    : 进度重启
 *      progress   : 进度进行中时触发（进度每次发生变化都会触发）
 * 
 */

define(function(require) {
    var createClass = require('base/createClass/1.0.1/createClass'),
        PubSub      = require('base/pubSub/1.0.0/pubSub');
    
    var Progress = createClass({
        superClass: PubSub,
        init: function() {
            this.setAttr('percent', 0);
        },
        methods: {
            start: function() {
                var that     = this,
                    interval = that.getAttr('interval'),
                    timeout  = 20,
                    cumulateTime = 0;
                
                window.clearInterval(interval);
            
                interval = window.setInterval(function() {
                    var percent  = that.getAttr('percent'),
                        finished = that.getAttr('finished', true);
                    
                    if(finished) {
                        percent += 3;
                    } else if(percent < 17) {
                        percent += 0.61;
                    } else if(percent >= 17 && percent < 27) {
                        percent += 0.02;
                    } else if(percent >= 27 && percent < 37) {
                        percent += 0.21;
                    } else if(percent >= 37 && percent < 47) {
                        percent += 0.1;
                    } else if(percent >= 47 && percent < 57) {
                        percent += 0.08;
                    } else if(percent >= 57 && percent < 67) {
                        percent += 0.05;
                    } else if(percent >= 67 && percent < 77) {
                        percent += 0.04;
                    } else if(percent >= 77 && percent < 87) {
                        percent += 0.02;
                    }
                    
                    if(percent >= 100) {
                        percent = 100;
                        
                        window.clearInterval(interval);
                        that.on('finish');
                    }
                    cumulateTime += timeout;
                    
                    that.setAttr({
                        'percent': percent,
                        'cumulateTime': cumulateTime
                    });
                    
                    that.on('progress');
                    
                }, timeout);
                
                that.setAttr('interval', interval);
                
                return this;
            },
            finish: function() {
                var that = this;
            
                that.setAttr('finished', true);
                
                return that;
            },
            pause: function() {
                var that     = this,
                    interval = that.getAttr('interval');
                
                window.clearInterval(interval);
                
                that.on('pause');
                
                return that;
            },
            stop: function() {
                var that = this;
                
                that.setAttr({
                    percent     : 0,
                    finished    : false,
                    cumulateTime: 0
                }).pause();
                
                that.on('stop');
                
                return that;
            },
            restart: function() {
                this.setAttr({
                    'percent'      : 0,
                    'finished'     : false,
                    'cumulateTime' : 0
                }).start();
                
                this.on('restart');
                
                return this;
            },
            getProgress: function() {
                return this.getAttr('percent');
            }
        }
    });
    
    return Progress;
});
