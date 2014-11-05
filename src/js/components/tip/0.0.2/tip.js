/**
 * @Author      : 陈海云
 * @Date        : 2014-06-26
 * @SuperClass  : Layer
 * @Memo        : 提供一个具有基本功能气泡形状提示功能的组件
 * 
 * @param: 
 *      conf——实例化时初始配置对象，该对象的可配置想如下
 *              {
 *                  fadeOutHide   : 是否以淡出的方式隐藏
 *                  theme         : 提示框的主题，可选，（样式，默认为黑色主题）；
 *                  tipText       : 提示文案，可选，默认为空字符串；
 *                  arrowPosition : 箭头方向（以组件根节点的时钟方向为参考），默认为11点钟方向；
 *              }
 * 
 * @Methods:
 *      bindUI:
 *          描述: 重写了基类 Widget 的方法，绑定一些事件；
 *          参数: 无
 *          返回值: 当前对象
 * 
 *      setArrowPosition:
 *          描述: 设置提示框的箭头的方位；
 *          参数: 
 *              arrowPosition——箭头的时钟方向；数字，1-12之间；
 *          返回值: 当前对象
 * 
 *      setTheme:
 *          描述: 设置提示框的主题样式；
 *          参数: 
 *              theme——主题名称，当前支持6中样式，默认（值为空即可）、红色（red）、蓝
 *                     色（blue）、绿色（green）、白色（white）、橙色（orange）
 *          返回值: 当前对象
 * 
 *      setTipText:
 *          描述: 设置提示文案；
 *          参数: 
 *              tipText——提示文案，字符串
 *          返回值: 当前对象
 * 
 *      position:
 *          描述: 
 *             设置提示的坐标，其坐标不是直接设置组件根节点，而是根据计算设置成提示组
 *             件箭头顶端的坐标，比如：通过该方法position(100, 100)将x、y坐标分别
 *             设置成100，而此时的效果则是：箭头的顶端坐标正好在(100, 100)的位置；
 *          参数: 
 *              left——箭头水平坐标；
 *              top——箭头垂直坐标
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
        Layer       = require('components/layer/0.0.1/layer');
    
    var template = [
        '<div class="sea-tip2-content"></div>',
        '<i class="sea-tip2-pointer sea-tip2-pointer-11">◆</i>'
    ].join('');
    
    var Tip = createClass({
        superClass: Layer,
        init: function(conf) {
            var that = this;
            
            conf = $.extend({
                theme         : '',
                tipText       : '',
                arrowPosition : 11
            }, conf);
            
            that.setAttr(conf);
        },
        methods: {
            bindUI: function() {
                var that      = this,
                    widgetEle = that.getAttr('widgetEle');
                
                that.on('render', function() {
                    widgetEle.addClass('sea-tip2')
                             .html(template);
            
                    that.setAttr({
                        contentEle : widgetEle.find('div.sea-tip2-content'),
                        arrowEle   : widgetEle.find('i.sea-tip2-pointer')
                    });
                    
                    that.setArrowPosition(that.getAttr('arrowPosition'));
                    that.setTheme(that.getAttr('theme'));
                    that.setTipText(that.getAttr('tipText'));
                });
            },
            
            // 设置箭头方向
            setArrowPosition: function(arrowPosition) {
                var that          = this,
                    arrowEle      = that.getAttr('arrowEle'),
                    arrowClass    = 'sea-tip2-pointer sea-tip2-pointer-';
                
                arrowPosition = parseInt(arrowPosition, 10);
                
                if(arrowPosition < 1 || arrowPosition > 12 || !arrowPosition) {
                    arrowPosition = that.getAttr('arrowPosition');
                }
                
                arrowClass = arrowClass + arrowPosition;
                arrowEle.removeClass()
                        .addClass(arrowClass);
                
                that.setAttr('arrowPosition', arrowPosition);
                
                return that;
            },
            
            // 设置主题
            setTheme: function(theme) {
                var that          = this,
                    widgetEle     = that.getAttr('widgetEle'),
                    oldTheme      = that.getAttr('theme'),
                    newThemeClass = '';
                
                if(!theme) {
                    theme = oldTheme;
                }
                
                if(theme === '') {
                    newThemeClass = '';
                } else {
                    newThemeClass = 'sea-tip2-theme-' + theme;
                }
                
                widgetEle.removeClass()
                         .addClass('sea-tip2 ' + newThemeClass);
                
                that.setAttr('theme', theme);
                
                return that;
                
            },
            
            // 设置提示文本（支持html）
            setTipText: function(tipText) {
                var contentEle = this.getAttr('contentEle');
                
                contentEle.html(tipText);
                
                return this;
            },
            
            // 定位（定位目标为箭头），重写父类方法
            position: function(left, top) {
                var that          = this,
                    widgetEle     = that.getAttr('widgetEle'),
                    arrowEle      = that.getAttr('arrowEle'),
                    arrowPosition = that.getAttr('arrowPosition');
                    
                var tipEleOffset,
                    arrowEleOffset;
                    
                var tipIsShow = widgetEle.css('display') === 'block';
                
                if(!tipIsShow) {
                    widgetEle.css('display', 'block');
                }
                
                tipEleOffset   = widgetEle.offset();
                arrowEleOffset = arrowEle.offset();
                
                left = parseInt(left, 10);
                top  = parseInt(top, 10);
                
                left = left - (arrowEleOffset.left - tipEleOffset.left);
                top  = top - (arrowEleOffset.top - tipEleOffset.top);
                
                switch(arrowPosition) {
                    case 2:
                    case 3:
                    case 4:
                        left = left - 12;
                        top  = top - 6;
                        break;
                        
                    case 5:
                    case 6:
                    case 7:
                        left = left - 6;
                        top  = top - 12;
                        break;
                        
                    case 8:
                    case 9:
                    case 10:
                        top  = top - 6;
                        break;
                        
                    case 1:
                    case 11:
                    case 12:
                        left = left - 6;
                        break;
                        
                    default:
                }
                
                widgetEle.css({
                    left: left,
                    top : top
                });
                
                if(!tipIsShow) {
                    that.hide();
                }
                
                return that;
            }
        }
    });
    
    // 引入样式
    require('./css/tipStyle.css');
    
    return Tip;
});
