/**
 * @Author     : 陈海云
 * @Date       : 2014-05-15
 * @SuperClass : PubSub
 * @Memo       : 实现一个对话框，并提供两个静态方法：confirm()、alert() 来模
 *               拟系统的确认对话框和警告对话框；不易于封装，所以不推荐使用，现
 *               在已经有升级版本1.0.1的实现，推荐使用新版本
 * 
 * @param:
 *      conf:
 *          描述: 初始化配置对象，可配置项如下：
 *             {
 *                  width       : 对话框宽度，默认400px
 *                  title       : 对话框标题栏文案，默认为"弹出窗"
 *                  position    : 对话框定位方式，默认为"fixed"，支持: fixed、absolute两种方式
 *                  isShowClose : 是否显示关闭按钮，布尔值，默认为true——显示关闭按钮
 *                  mask        : 是否显示遮罩背景，布尔值，默认为true——显示遮罩层 
 *             }
 * 
 * 
 * @Methods:
 *      setTitle:
 *          描述: 设置标题栏文案；
 *          参数: 
 *              title——标题栏文案；字符串；
 *          返回值: 当前对象；
 * 
 *      setWidth:
 *          描述: 设置对话框宽度；
 *          参数: 
 *              width——对话框的宽度；数字、字符串皆可；
 *          返回值: 当前对象；
 * 
 *      show:
 *          描述: 显示弹出层；
 *          参数: 无；
 *          返回值: 当前对象；
 * 
 *      hide:
 *          描述: 隐藏弹出层；
 *          参数: 无；
 *          返回值: 当前对象；
 * 
 *      setPosition:
 *          描述: 定位弹出层，弹出层根节点是绝对定位，该方法设置其left、top 两个坐标；
 *          参数: 
 *              x——弹出层根节点的水平方向坐标，
 *              y——弹出层跟解答的垂直方向坐标；
 *          返回值: 当前对象；
 * 
 *      
 *      部分方法继承自父类 PubSub，请参考父类 PubSub
 * 
 * 
 * @Events: 
 *      setTitle——设置对话框标题文案时触发
 *      
 *      setWidth——设置对话框宽度时触发
 * 
 *      show——对话框显示时触发
 * 
 *      hide——对话框隐藏时触发
 * 
 */
define("components/dialog/1.0.0/dialog-debug", [ "$-debug", "base/createClass/1.0.0/createClass-debug", "base/singleton/1.0.0/singleton-debug", "base/pubSub/1.0.0/pubSub-debug", "./mask-debug" ], function(require, exports, module) {
    // 添加样式
    seajs.importStyle([ ".sea-dialog{ padding: 7px; background: #999; position: absolute; top: 0; left: 0; z-index: 10000;}", ".sea-dialog-panel{ background: #fff; position: relative;}", ".sea-dialog-title{ height: 30px; padding: 0 5px; margin: 0; line-height: 30px; border-bottom: 1px solid #eee; font-size: 13px; font-weight: bold; color: #333; position: relative;}", ".sea-dialog-bd{ padding: 10px;}", ".sea-dialog-close{ display: block; height: 14px; width: 14px; font-size: 14px; font-weight: bold; line-height: 14px; color: #333; text-align: center; font-family: Dotum; text-decoration: none; overflow: hidden; position: absolute; top: 6px; right: 6px;}", ".sea-dialog-close:hover{ color: #333; text-decoration: none;}" ].join(""));
    var $ = require("$-debug");
    var dialogHtml = [ '<div class="sea-dialog">', '<div class="sea-dialog-panel">', '<h4 class="sea-dialog-title"></h4>', '<div class="sea-dialog-bd"></div>', '<a class="sea-dialog-close" href="javascript:;" title="点击关闭窗口">x</a>', "</div>", "</div>" ].join("");
    var createClass = require("base/createClass/1.0.0/createClass-debug"), singleton = require("base/singleton/1.0.0/singleton-debug"), PubSub = require("base/pubSub/1.0.0/pubSub-debug"), mask = require("./mask-debug");
    var Dialog = createClass({
        // 继承观察者模式的实现,处理事件
        superClass: PubSub,
        init: function(conf) {
            var that = this, dialogEle = $(dialogHtml), dialogCloseEle = dialogEle.find("a.sea-dialog-close");
            conf = $.extend({
                width: 400,
                // 窗口宽度
                title: "弹出窗",
                // 对话框标题
                position: "fixed",
                // 窗口定位方式
                isShowClose: true,
                // 是否显示关闭按钮
                mask: true
            }, conf);
            that.setAttr({
                conf: conf,
                dialogEle: dialogEle,
                dialogTitleEle: dialogEle.find("h4.sea-dialog-title"),
                dialogBdEle: dialogEle.find("div.sea-dialog-bd"),
                dialogCloseEle: dialogCloseEle
            });
            if (conf.title) {
                that.setTitle(conf.title);
            }
            if (!conf.isShowClose) {
                dialogCloseEle.hide();
            }
            dialogCloseEle.on("click", function() {
                that.hide();
            });
            if (conf.content) {
                that.getAttr("dialogBdEle").append($(conf.content));
            }
            that.setWidth(conf.width);
            dialogEle.appendTo(document.body).hide();
        },
        methods: {
            // 设置对话框标题内容
            setTitle: function(title) {
                var that = this;
                that.getAttr("dialogTitleEle").html(title);
                that.on("setTitle");
                return this;
            },
            // 设置对话框宽度
            setWidth: function(width) {
                var that = this;
                if (isNaN(width) || width < 0) {
                    throw new Error("方法:setWidth() 的参数  width 需为大于0的数字");
                }
                width = Math.floor(width) - 20;
                if (width < 0) {
                    width = 0;
                }
                that.getAttr("dialogEle").css({
                    width: width
                });
                that.on("setWidth");
                return that;
            },
            // 显示对话框
            show: function() {
                var that = this, conf = that.getAttr("conf");
                var dialogEle = that.getAttr("dialogEle");
                dialogEle.show();
                that.setPosition();
                if (conf.mask) {
                    mask.show();
                }
                that.on("show");
                return that;
            },
            // 关闭对话框
            hide: function() {
                var that = this, conf = that.getAttr("conf");
                var dialogEle = that.getAttr("dialogEle");
                dialogEle.hide();
                if (conf.mask) {
                    mask.hide();
                }
                that.on("hide");
                return that;
            },
            // 设置窗口位置,参数可选,不设置参数的时候,对话框位置在页面可视区域中央
            setPosition: function(x, y) {
                var that = this, conf = that.getAttr("conf");
                var $win = $(window), dialogEle = that.getAttr("dialogEle");
                var left, top;
                left = ($win.width() - dialogEle.width()) / 2;
                // top在垂直方向的黄金分割点上（0.618）
                top = $win.height() * 618 / (1e3 + 618) - dialogEle.height() / 2;
                if (conf.position === "absolute") {
                    top += $win.scrollTop();
                } else {
                    if ($.browser.msie && $.browser.version == "6.0") {
                        // ie6不支持fixed定位,所以强制设定为absolute定位
                        top += $win.scrollTop();
                        conf.position = "absolute";
                    }
                }
                if (left < 0) {
                    left = 0;
                }
                if (top < 0) {
                    top = 0;
                }
                x = x || left;
                y = y || top;
                dialogEle.css({
                    left: x,
                    top: y,
                    position: conf.position
                });
                return that;
            }
        }
    });
    // 添加静态方法
    Dialog.confirm = function(tipTxt, callback) {
        var contentEle = $([ '<p style="padding:15px 0 0;margin:0;font-size:14px;color:#666;line-height:1.5;text-align:center;">' + tipTxt + "</p>", '<div style="padding:15px 0;text-align:center;font-size:13px;">', '<a class="J-confirmBtn" href="javascript:;" style="color:#333;">确定</a>&nbsp;&nbsp;&nbsp;&nbsp;', '<a class="J-cancelBtn" href="javascript:;" style="color:#999;">取消</a>', "</div>" ].join(""));
        var dialog = Dialog.confirm._getConfirmDialogObj();
        var closeBtn = dialog.getAttr("dialogCloseEle"), confirmBtn = contentEle.find("a.J-confirmBtn"), cancelBtn = contentEle.find("a.J-cancelBtn");
        var _callback = function(isConfirm) {
            dialog.hide();
            if (typeof callback === "function") {
                callback(isConfirm);
            }
        };
        dialog.getAttr("dialogBdEle").empty().append(contentEle);
        confirmBtn.on("click", function() {
            _callback(true);
        });
        closeBtn.on("click", function() {
            _callback(false);
        });
        cancelBtn.on("click", function() {
            _callback(false);
        });
        dialog.show();
        return this;
    };
    Dialog.confirm._getConfirmDialogObj = singleton(new Dialog({
        width: 400,
        title: "提示"
    }));
    // 添加静态方法
    Dialog.alter = function(tipTxt) {
        var contentEle = $([ '<p style="padding:15px 0 0;margin:0;font-size:14px;color:#666;line-height:1.5;text-align:center;">' + tipTxt + "</p>", '<div style="padding:15px 0;text-align:center;font-size:13px;">', '<a class="J-confirmBtn" href="javascript:;" style="color:#333;">确定</a>', "</div>" ].join(""));
        var dialog = Dialog.alter._getAlterDialogObj();
        var confirmBtn = contentEle.find("a.J-confirmBtn"), closeBtn = dialog.getAttr("dialogCloseEle");
        dialog.getAttr("dialogBdEle").empty().append(contentEle);
        confirmBtn.on("click", function() {
            dialog.hide();
        });
        dialog.show();
        return this;
    };
    Dialog.alter._getAlterDialogObj = singleton(new Dialog({
        width: 400,
        title: "提示"
    }));
    return Dialog;
});
