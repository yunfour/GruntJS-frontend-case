/**
 * @Author：陈海云
 * @Date：2014-5-15
 * @SuperClass：SubPub(继承订阅-发布模式的实现，以实现事件处理的功能)
 * @Memo：实现一个水平滚动的效果（滑动门）
 * @Param：conf = {
 *     view: 移动视图（滚动的节点）
 *     speed: 滚动速度
 *     scale: 每次移动的距离
 *     autoScroll: 是否自动滚动
 *     autoScrollTimeout: 自动滚动的时间间隔
 * }
 * 
 * @Methods:
 *      scrollTo:
 *          描述: 将试图滚动到参数index对应索引的模块
 *          参数:
 *              index——需要滚动到的目标索引值
 *          返回: 当前对象
 */

define(function(require) {
    var $ = require('$');
    var createClass = require('base/createClass/1.0.0/createClass'),
        SubPub = require('base/pubSub/1.0.0/pubSub');
    
    var Vscroll = createClass({
        superClass: SubPub,
        init: function(conf) {
            var that = this;
            var view              = $(conf.view),
                speed             = parseInt(conf.speed, 10) || 'fast',
                scale             = parseInt(conf.scale, 10),
                autoScroll        = !!conf.autoScroll,
                autoScrollTimeout = parseInt(conf.autoScrollTimeout, 10) || 1000;
            
            that.setAttr({
                view              : view,
                speed             : speed,
                scale             : scale,
                autoScroll        : autoScroll,
                autoScrollTimeout : autoScrollTimeout,
                hoverFlag         : false,
                index             : 0
            });
            
            view.hover(
                function() {
                    that.setAttr('hoverFlag', true);
                },
                function() {
                    that.setAttr('hoverFlag', false);
                }
            );
            
            if(autoScroll) {
                that.autoScroll();
            }
        },
        methods: {
            scrollTo: function(index) {
                var that      = this,
                    left      = 0,
                    view      = that.getAttr('view'),
                    speed     = that.getAttr('speed'),
                    scale     = that.getAttr('scale'),
                    hoverFlag = that.getAttr('hoverFlag');
        
                index = Math.floor(Number(index) || 0);
        
                if(index >= view.children().size()) {
                    index = 0;
                }
                if(index < 0) {
                    index = view.children().size() - 1;
                }
        
                left = 0 - scale * index;
        
                if(!hoverFlag) {
                    view.stop().animate({left: left}, speed, function() {
                        
                    });
                    that.setAttr('index', index);
                    that.on('scroll');
                }
        
                if(that.getAttr('autoScroll')) {
                    window.clearTimeout(that.getAttr('timeout'));
                    that.autoScroll();
                }
                
                return that;
            },
            autoScroll: function() {
                var that              = this,
                    autoScrollTimeout = that.getAttr('autoScrollTimeout');
        
                var timeout = window.setTimeout(function() {
                    var curIndex = that.getAttr('index');
        
                    curIndex = (parseInt(curIndex, 10) || 0) + 1;
                    that.scrollTo(curIndex);
                }, autoScrollTimeout);
                
                that.setAttr('timeout', timeout);
                
                return that;
            },
            getIndex: function() {
                return this.getAttr('index');
            }
        }
    });
    
    return Vscroll;
});