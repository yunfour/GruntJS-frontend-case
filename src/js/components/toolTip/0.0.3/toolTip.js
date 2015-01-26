/**
 * @Author      : 陈海云
 * @Date        : 2014-06-26
 * @SuperClass  : Tip（components/tip/0.0.2/tip）
 * @Memo        : 提供一个具有多功能气泡形状提示功能的组件，对Tip（components/tip/0.0.2/tip）类进行了扩展
 * 
 * @param: 
 *      conf——实例化时初始配置对象，可配置属性在其父类Tip的基础上又增加了一下两项：
 *          {
 *              trigger     : 唤出tip的DOM节点；
 *              triggerType : 唤出tip节点的事件类型，默认为hover，即：鼠标移到trigger上时，显
 *                            示tip，移出时隐藏tip；当前支持三种事件类型：hover、click（单击
 *                            trigger时唤出tip）、focus（trigger获取焦点是唤出tip）；
 *          }
 * 
 * @Methods:
 *      bindUI:
 *          描述: 重写了基类 Widget 的方法，绑定一些事件；
 *          参数: 无
 *          返回值: 当前对象
 * 
 *      show:
 *          描述: 根据trigger的位置以及arrowPosition来显示tip，重写了父类的此方法；
 *          参数: 无；
 *          返回值: 当前对象
 * 
 *      relocation:
 *          描述: 根据trigger的位置以及arrowPosition重新定位tip的位置；
 *          参数: 无；
 *          返回值: 当前对象
 * 
 *      computePosition:
 *          描述: 根据trigger的位置以及arrowPosition计算出tip的位置；
 *          参数: 无；
 *          返回值: 当前对象
 * 
 *      temporaryShow:
 *          描述: 根据设置的时间，临时显示tip，过了设置的时间长度，tip自动隐藏；
 *          参数: 
 *              time——临时显示的时间；数值；单位：毫秒；
 * 
 *          返回值: 当前对象
 * 
 *      setArrowPosition:
 *          描述: 设置tip的箭头位置，该位置是以trigger为参考；
 *          参数: 
 *              arrowPosition——箭头的时钟方向值；以trigger为参考，例如：参数值
 *                             为6，tip会显示在trigger的正下方，此时，如果以 
 *                             tip 组件根节点为参考的话，tip 箭头方向应为12，
 *                             该方法会自动计算；
 * 
 *          返回值: 当前对象
 * 
 *          部分方法继承自父类，请参考父类
 * 
 * 
 * @Events: 无；
 * 
 */

define(function(require) {
    var $           = require('$'),
        createClass = require('base/createClass/1.0.2/createClass'),
        Tip         = require('components/tip/0.0.2/tip');
    
    var TRIGGER_TYPE = ['hover', 'click', 'focus'];
    
    var ToolTip = createClass({
        superClass: Tip,
        init: function(conf) {
            var that = this;
            
            conf = $.extend({}, conf);
            
            if(conf.trigger) {
                conf.trigger = $(conf.trigger).eq(0);
            }
            
            if(indexOf.call(TRIGGER_TYPE, conf.triggerType) === -1) {
                conf.triggerType = TRIGGER_TYPE[0];
            }
            
            that.setAttr(conf);
        },
        methods: {
            bindUI: function() {
                var that        = this,
                    widgetEle   = that.getAttr('widgetEle'),
                    trigger     = that.getAttr('trigger'),
                    triggerType = that.getAttr('triggerType');
                    
                var $win = $(window);
                
                // 窗口大小变化是，则根据trigger的位置重新定位tip的位置
                function resize() {
                    if(widgetEle.css('display') !== 'none') {
                        that.relocation();
                    }
                }
                
                that._superClass.prototype.bindUI.apply(that);
                
                if(trigger) {
                    
                    $win.on('resize', resize);
                    
                    that.on('destroy', function() {
                        $win.off('resize', resize);
                    });
                    
                    if(triggerType === 'hover') {
                        var showFlag = false;
                        
                        trigger.hover(
                            function() {
                                showFlag = true;
                                that.show();
                            },
                            function() {
                                
                                showFlag = false;
                                
                                window.setTimeout(function() {
                                    
                                    if(!showFlag) {
                                        that.hide();
                                    }
                                    
                                }, 100);
                            }
                        );
                        
                        widgetEle.hover(
                            function() {
                                showFlag = true;
                                that.show();
                            },
                            function() {
                                showFlag = false;
                                
                                window.setTimeout(function() {
                                    
                                    if(!showFlag) {
                                        that.hide();
                                    }
                                    
                                }, 100);
                            }
                        );
                        
                    } else if(triggerType === 'click') {
                        
                        widgetEle.on('click', function() {
                            return false;
                        });
                        
                        // 点击文档中的其他（除trigger的）地方时，隐藏tip
                        $(document.body).on('click', function(ev) {
                            
                            if(ev.srcElement !== trigger[0]) {
                                that.hide();
                            }
                            
                        });
                        
                        trigger.on('click', function() {
                            that.show();
                        });
                        
                    } else if(triggerType === 'focus') {
                        
                        widgetEle.on('mousedown', function() {
                            return false;
                        });
                        
                        trigger.on('focus', function() {
                            that.show();
                        });
                        
                        trigger.on('blur', function() {
                            that.hide();
                        });
                        
                    }
                    
                }
            },
            
            // 方法：根据设置的箭头方向重新定位后显示tip（覆盖父类的show方法）
            show: function() {
                var that    = this,
                    trigger = that.getAttr('trigger');
                
                if(trigger) {
                    that.relocation();
                }
                
                that.getAttr('widgetEle')
                    .show();
                
                that.on('show');
                
                return that;
            },
            
            // 方法：根据设置的箭头方向重新定位后tip
            relocation: function() {
                var that            = this,
                    thePosition     = that.computePosition();
                
                that.position(thePosition.left, thePosition.top);
                
                return that;
            },
            
            // 方法：根据设置的箭头方向计算出tip的位置
            computePosition: function() {
                var that            = this,
                    trigger         = that.getAttr('trigger'),
                    offset          = trigger.offset(),
                    triggerWidth    = trigger.outerWidth(),
                    triggerHeight   = trigger.outerHeight(),
                    
                    arrowPosition   = that.getAttr('triggerArrowPosition'),
                    
                    // 箭头和trigger直接的距离
                    space           = 5,
                    
                    left,
                    top;
                
                left = offset.left;
                top  = offset.top;
                
                switch(arrowPosition) {
                        
                    case 1:
                    
                        top = top - space;
                        left = left + (triggerWidth * 0.66);
                        break;
                        
                    case 2:
                        
                        top  = top + (triggerHeight * 0.33);
                        left = left + triggerWidth + space;
                        break;
                    
                    case 3:
                        
                        top  = top + (triggerHeight * 0.5);
                        left = left + triggerWidth + space;
                        break;
                        
                    case 4:
                        top  = top + (triggerHeight * 0.66);
                        left = left + triggerWidth + space;
                        break;
                        
                    case 5:
                    
                        top = top + triggerHeight + space;
                        left = left + (triggerWidth * 0.66);
                        break;
                        
                    case 6:
                    
                        top = top + triggerHeight + space;
                        left = left + (triggerWidth * 0.5);
                        break;
                        
                    case 7:
                    
                        top = top + triggerHeight + space;
                        left = left + (triggerWidth * 0.33);
                        break;
                        
                    case 8:
                    
                        top = top + (triggerHeight * 0.66);
                        left = left - space;
                        break;
                        
                    case 9:
                    
                        top = top + (triggerHeight * 0.5);
                        left = left - space;
                        break;
                        
                    case 10:
                    
                        top = top + (triggerHeight * 0.33);
                        left = left - space;
                        break;
                        
                    case 11:
                    
                        top = top - space;
                        left = left + (triggerWidth * 0.33);
                        break;
                        
                    case 12:
                    
                        top = top - space;
                        left = left + (triggerWidth * 0.5);
                        break;
                        
                    default:
                }
                
                return {
                    left: left,
                    top: top
                };
            },
            
            // 方法：临时显示tip，根据设置的time长时间段临时显示tip
            temporaryShow: function(time) {
                var that           = this,
                    temporaryTimer = that.getAttr('temporaryTimer');
                
                if(temporaryTimer) {
                    window.clearTimeout(temporaryTimer);
                }
                
                temporaryTimer = window.setTimeout(function() {
                    that.hide();
                }, time);
                
                that.setAttr('temporaryTimer', temporaryTimer);
                that.show();
                
                return that;
            },
            
            /*
             * 方法：设置箭头的方向，以trigger为参考对象设置箭头钟表方向，如：trigger
             * 的12点钟的方向，tip对应的方向则为6点钟（覆盖父类的show方法）
             */
            setArrowPosition: function(arrowPosition) {
                var that             = this,
                    widgetEle        = that.getAttr('widgetEle'),
                    trigger          = that.getAttr('trigger'),
                    arrowMapping     = [5, 10, 9, 8, 1, 12, 11, 4, 3, 2, 7, 6],
                    tipArrowPosition = arrowPosition;
                
                if(trigger) {
                    // 如果设置了trigger，则进行此映射
                    tipArrowPosition = arrowMapping[arrowPosition - 1];
                }
                
                that.setAttr('triggerArrowPosition', arrowPosition);
                that._superClass.prototype.setArrowPosition.call(that, tipArrowPosition);
                
                if(trigger && widgetEle.css('display') !== 'none') {
                    that.relocation();
                }
                
                return that;
            }
        }
    });
    
    var indexOf = Array.prototype.indexOf || function(ele) {
        var arr    = this,
            reuslt = -1;
        
        for(var i = 0, l = arr.length; i < l; i ++) {
            if(arr[i] === ele) {
                result = i;
                break;
            }
        }
        
        return result;
    };
    
    return ToolTip;
});
