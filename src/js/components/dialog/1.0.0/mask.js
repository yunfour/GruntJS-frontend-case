/**
 * @Author : 陈海云
 * @Date   : 2014-05-15
 * @Memo   : 实现一个生成、控制页面遮罩层的对象，在实现弹出层或其他效果是可以遮挡页面
 * 
 * 
 * @Methods:
 *      show:
 *          描述: 显示遮罩层；
 *          参数: 无；
 *          返回值: 当前对象；
 * 
 *      hide:
 *          描述: 隐藏遮罩层；
 *          参数: 无；
 *          返回值: 当前对象；
 * 
 *      setSize:
 *          描述: 根据页面尺寸，设定遮罩层的尺寸；
 *          参数: 无；
 *          返回值: 当前对象；
 * 
 */

define(function(require, exports, module) {
    var $ = require('$');
    
    var maskEleHtml = [
        '<div style="display: none; background: #000; opacity:0.2; filter:Alpha(opacity=20); position: absolute; left: 0; top: 0; z-index: 9999;"></div>'
    ].join('');
    
    var maskObj = {
        maskEle: $(maskEleHtml),
        show: function() {
            this.setSize();
            this.maskEle.show();
            
            return this;
        },
        hide: function() {
            this.maskEle.hide();
            
            return this;
        },
        setSize: function() {
            var $doc = $(document);
            
            this.maskEle.css({
                width: $doc.width(),
                height: $doc.height()
            });
            
            return this;
        }
    };

    maskObj.maskEle.appendTo(document.body);
    
    // 监听浏览器窗口的resize（改变窗口大小）事件，同时调整遮罩层的尺寸
    $(window).on('resize', function() {
        maskObj.setSize();
    });
    
    return maskObj;
});