
define(function(require) {
    seajs.importStyle([
        '.sea-tip{ padding: 5px 10px; border-radius: 5px; line-height: 1.7; background: #000; color: #fff; font-family: "microsoft yahei", "微软雅黑"; overflow: visible; position: absolute; z-index: 10010;}',
        '.sea-tip-content{ height: auto;}',
        '.sea-tip-pointer{ display: block; height: 12px; width: 12px; line-height: 12px; color: #000; font-style: normal; font-family: "宋体"; font-size: 12px; position: absolute;}',
        '.sea-tip-pointer-1{ left: 70%; top: -6px; margin-left: -6px;}',
        '.sea-tip-pointer-2{ top: 30%; right: -6px; margin-top: -6px;}',
        '.sea-tip-pointer-3{ top: 50%; right: -6px; margin-top: -6px;}',
        '.sea-tip-pointer-4{ top: 70%; right: -6px; margin-top: -6px;}',
        '.sea-tip-pointer-5{ left: 70%; bottom: -7px; margin-left: -6px;}',
        '.sea-tip-pointer-6{ left: 50%; bottom: -7px; margin-left: -6px;}',
        '.sea-tip-pointer-7{ left: 30%; bottom: -7px; margin-left: -6px;}',
        '.sea-tip-pointer-8{ top: 70%; left: -6px; margin-top: -6px;}',
        '.sea-tip-pointer-9{ top: 50%; left: -6px; margin-top: -6px;}',
        '.sea-tip-pointer-10{ top: 30%; left: -6px; margin-top: -6px;}',
        '.sea-tip-pointer-11{ left: 30%; top: -6px; margin-left: -6px;}',
        '.sea-tip-pointer-12{ left: 50%; top: -6px; margin-left: -6px;}',
        '.sea-tip-theme-red{ background: #f28c77; color: #fff;}',
        '.sea-tip-theme-red .sea-tip-pointer{ color: #f28c77;}',
        '.sea-tip-theme-blue{ background: #71c6f7; color: #fff;}',
        '.sea-tip-theme-blue .sea-tip-pointer{ color: #71c6f7;}',
        '.sea-tip-theme-green{ background: #4bc577; color: #fff;}',
        '.sea-tip-theme-green .sea-tip-pointer{ color: #4bc577;}',
        '.sea-tip-theme-white{ background: #eee; color: #333;}',
        '.sea-tip-theme-white .sea-tip-pointer{ color: #eee;}'
    ].join(''));
    
    var $           = require('$'),
        createClass = require('base/createClass/1.0.2/createClass'),
        PubSub      = require('base/pubSub/1.0.0/pubSub');
    
    
    var Tip = createClass({
        init: function(conf) {
            var _conf = conf || {};
            
            var that     = this,
                template = [
                    '<div class="sea-tip sea-tip-theme-white">',
                        '<div class="sea-tip-content"></div>',
                        '<i class="sea-tip-pointer">◆</i>',
                    '</div>'
                ].join('');
                
            var tipEle        = $(template),
                contentEle    = tipEle.children('div.sea-tip-content'),
                arrowEle      = tipEle.children('i.sea-tip-pointer'),
                
                theme         = _conf.theme || '',
                tipText       = _conf.tipText || '',
                arrowPosition = _conf.arrowPosition || 10;
            
            that.setAttr({
                'template'      : template,
                'theme'         : theme,
                'tipText'       : tipText,
                'arrowPosition' : arrowPosition,
                'tipEle'        : tipEle,
                'contentEle'    : contentEle,
                'arrowEle'      : arrowEle
            });
            
            that.setTipText(tipText)
                .setTheme(theme)
                .setArrowPosition(arrowPosition);
            
            tipEle.appendTo(document.body).hide();
        },
        methods: {
            show: function() {
                var that    = this,
                    tipEle  = that.getAttr('tipEle');
                
                tipEle.show();
                
                return that;
            },
            hide: function() {
                var that    = this,
                    tipEle  = that.getAttr('tipEle');
                
                tipEle.hide();
                
                return that;
            },
            setArrowPosition: function(arrowPosition) {
                var that          = this,
                    arrowEle      = that.getAttr('arrowEle'),
                    arrowClass = 'sea-tip-pointer-';
                
                arrowPosition = parseInt(arrowPosition, 10);
                
                if(arrowPosition < 1 || arrowPosition > 12) {
                    arrowPosition = 11;
                }
                
                arrowClass = arrowClass + arrowPosition;
                arrowEle.removeClass()
                        .addClass('sea-tip-pointer ' + arrowClass);
                
                that.setAttr('arrowPosition', arrowPosition);
                
                return that;
            },
            setTheme: function(theme) {
                var that          = this,
                    tipEle        = that.getAttr('tipEle'),
                    oldThemeClass = that.getAttr('theme'),
                    newThemeClass = '';
                
                if(theme !== '') {
                    newThemeClass = 'sea-tip-theme-' + theme;
                }
                
                tipEle.removeClass()
                      .addClass('sea-tip ' + newThemeClass);
                
                that.setAttr('theme', theme);
                
                return that;
            },
            setTipText: function(tipText) {
                var that        = this,
                    tipEle      = that.getAttr('tipEle'),
                    contentEle  = that.getAttr('contentEle');
                
                contentEle.html(tipText);
                
                that.setAttr('tipText', tipText);
                
                return that;
            },
            setPosition: function(left, top) {
                var that          = this,
                    tipEle        = that.getAttr('tipEle'),
                    arrowEle      = that.getAttr('arrowEle'),
                    arrowPosition = that.getAttr('arrowPosition');
                    
                var tipEleOffset,
                    arrowEleOffset;
                    
                var tipIsShow = tipEle.css('display') === 'block';
                
                if(!tipIsShow) {
                    tipEle.css('display', 'block');
                }
                
                tipEleOffset    = tipEle.offset();
                arrowEleOffset  =   arrowEle.offset();
                
                left = parseInt(left, 10) || tipEleOffset.left;
                top  = parseInt(top, 10) || tipEleOffset.top;
                
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
                
                tipEle.css({
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
    
    return Tip;
});
