define(function(require) {
    var $           = require('$'),
        createClass = require('base/createClass/1.0.2/createClass'),
        Widget      = require('components/widget/0.0.1/widget'),
        Dialog      = require('components/dialog/1.0.1/dialog');
    
    var template = [
        '<div class="com-dialog">',
            '<h4 class="com-dialog-title"></h4>',
            
            '<div class="com-dialog-bd"></div>',
            '<a class="com-ico com-ico-close com-dialog-close" href="javascript:;" title="点击关闭窗口"></a>',
        '</div>'
    ].join('');
    
    var ComDialog = createClass({
        superClass: Dialog,
        attrs: {
            template: template
        },
        init: function(conf) {
            var that = this;
            
            conf = $.extend({
                titleText: '对话框',
                mask: true
            }, conf);
            
            that.render();
            
            that.setSize(400, 'auto')
                .setTitle(conf.titleText);
            
            if(conf.content) {
                that.append(conf.content);
            }
            
            that.setAttr(conf);
        },
        methods: {
            bindUI: function() {
                var that      = this,
                    template  = that.getAttr('template'),
                    widgetEle = that.getAttr('widgetEle');
                
                that.superClass.prototype.bindUI.apply(that);
                
                widgetEle.on('click', 'a.com-dialog-close', function() {
                    that.hide();
                });
                
                that.on('render', function() {
                    
                    // 触发渲染事件后将模板代码填充进去
                    widgetEle.html(template);
                    widgetEle.css({
                        background: 'none'
                    });
                    
                });
            },
            setTitle: function(titleText) {
                var that      = this,
                    widgetEle = that.getAttr('widgetEle'),
                    titleEle  = that.getAttr('titleEle');
                
                titleText = titleText || that.getAttr('titleText');
                
                if(!titleEle) {
                    titleEle = widgetEle.find('.com-dialog-title');
                    that.setAttr(titleEle);
                }
                
                that.setAttr('titleText', titleText);
                
                titleEle.html(titleText);
                
                return that;
            },
            append: function(ele) {
                var that        = this,
                    widgetEle   = that.getAttr('widgetEle'),
                    dialogBdEle = that.getAttr('dialogBdEle');
                
                if(!dialogBdEle) {
                    dialogBdEle = widgetEle.find('div.com-dialog-bd');
                    that.setAttr('dialogBdEle', dialogBdEle);
                }
                
                dialogBdEle.append(ele);
                
                return that;
            }
        }
    });
    
    // 模拟alert
    function alterDialog(alertTxt) {
        var dialogObj = alterDialog._dialogObj,
            widgetEle,
            dialogBdEle;
        
        if(!dialogObj) {
            dialogObj = new ComDialog({
                mask: true,
                titleText: '网页信息',
                content: [
                    '<p class="J-alterTipText" style="padding:15px 0 30px;margin:0;font-size:14px;color:#666;line-height:1.5;text-align:center;"></p>',
                    '<div style="padding:15px 0;text-align:center;font-size:13px;">',
                        '<a class="J-confirmBtn com-btn com-btn-blue com-btn-middling" href="javascript:;">&nbsp;&nbsp;&nbsp;&nbsp;确&nbsp;&nbsp;&nbsp;&nbsp;定&nbsp;&nbsp;&nbsp;&nbsp;</a>',
                    '</div>'
                ].join('')
            });
            
            widgetEle = dialogObj.getAttr('widgetEle');
            
            alterDialog._dialogObj = dialogObj;
            
            widgetEle.on('click', 'a.J-confirmBtn', function() {
                dialogObj.hide();
            });
        }
        
        dialogBdEle = dialogObj.getAttr('dialogBdEle');
        
        dialogBdEle.find('p.J-alterTipText').html(alertTxt);
        dialogObj.show();
        
    }
    
    // 模拟confirm
    function confirmDialog(confirmTxt, callback) {
        var dialogObj = confirmDialog._dialogObj,
            widgetEle,
            dialogBdEle;
        
        if(!dialogObj) {
            dialogObj = new ComDialog({
                mask: true,
                titleText: '确认信息',
                content: [
                    '<p class="J-alterTipText" style="padding:15px 0 30px;margin:0;font-size:14px;color:#666;line-height:1.5;text-align:center;"></p>',
                    '<div style="padding:15px 0;text-align:center;font-size:13px;">',
                        '<a class="J-confirmBtn com-btn com-btn-blue com-btn-middling" href="javascript:;">&nbsp;&nbsp;&nbsp;&nbsp;确&nbsp;&nbsp;&nbsp;&nbsp;定&nbsp;&nbsp;&nbsp;&nbsp;</a>',
                        '<a class="J-cancelBtn com-btn com-btn-grey com-btn-middling" href="javascript:;" style="margin-left:17px">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;</a>',
                    '</div>'
                ].join('')
            });
            
            widgetEle = dialogObj.getAttr('widgetEle');
            
            dialogObj._dialogObj = dialogObj;
            
            widgetEle.on('click', 'a.J-confirmBtn', function() {
                dialogObj.hide();
                
                if(typeof callback === 'function') {
                    callback(true);
                }
            });
            
            widgetEle.on('click', 'a.J-cancelBtn', function() {
                dialogObj.hide();
                
                if(typeof callback === 'function') {
                    callback(false);
                }
            });
            
            widgetEle.on('click', 'a.com-dialog-close', function() {
                if(typeof callback === 'function') {
                    callback(false);
                }
            });
        }
        
        dialogBdEle = dialogObj.getAttr('dialogBdEle');
        
        dialogBdEle.find('p.J-alterTipText').html(confirmTxt);
        dialogObj.show();
    }
    
    ComDialog.alert   = alterDialog;
    ComDialog.confirm = confirmDialog;
    
    return ComDialog;
});
