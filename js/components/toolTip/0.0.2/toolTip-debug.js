define("components/toolTip/0.0.2/toolTip-debug", [ "$-debug", "base/createClass/1.0.2/createClass-debug", "base/pubSub/1.0.0/pubSub-debug", "components/tip/0.0.1/tip-debug" ], function(require) {
    var $ = require("$-debug"), createClass = require("base/createClass/1.0.2/createClass-debug"), PubSub = require("base/pubSub/1.0.0/pubSub-debug"), Tip = require("components/tip/0.0.1/tip-debug");
    var ToolTip = createClass({
        superClass: [ Tip, PubSub ],
        init: function(conf) {
            var that = this;
            conf = $.extend({
                trigger: $(conf.trigger).eq(0)
            }, conf);
            that.setAttr(conf);
            if (conf.tipText) {
                that.setTipText(conf.tipText);
            }
            if (conf.theme) {
                that.setTheme(conf.theme);
            }
            if (conf.arrowPosition) {
                that.setArrowPosition(conf.arrowPosition);
            }
        },
        methods: {
            // 方法：根据设置的箭头方向重新定位后显示tip（覆盖父类的show方法）
            show: function() {
                var that = this;
                that.relocation().getAttr("tipEle").show();
                that.on("show");
                return that;
            },
            // 方法：根据设置的箭头方向重新定位后tip
            relocation: function() {
                var that = this, position = that.computePosition();
                that.setPosition(position.left, position.top);
                return that;
            },
            // 方法：根据设置的箭头方向计算出tip的位置
            computePosition: function() {
                var that = this, trigger = that.getAttr("trigger"), offset = trigger.offset(), triggerWidth = trigger.outerWidth(), triggerHeight = trigger.outerHeight(), arrowPosition = that.getAttr("triggerArrowPosition"), // 箭头和trigger直接的距离
                space = 5, left, top;
                left = offset.left;
                top = offset.top;
                switch (arrowPosition) {
                  case 1:
                    top = top - space;
                    left = left + triggerWidth * .66;
                    break;

                  case 2:
                    top = top + triggerHeight * .33;
                    left = left + triggerWidth + space;
                    break;

                  case 3:
                    top = top + triggerHeight * .5;
                    left = left + triggerWidth + space;
                    break;

                  case 4:
                    top = top + triggerHeight * .66;
                    left = left + triggerWidth + space;
                    break;

                  case 5:
                    top = top + triggerHeight + space;
                    left = left + triggerWidth * .66;
                    break;

                  case 6:
                    top = top + triggerHeight + space;
                    left = left + triggerWidth * .5;
                    break;

                  case 7:
                    top = top + triggerHeight + space;
                    left = left + triggerWidth * .33;
                    break;

                  case 8:
                    top = top + triggerHeight * .66;
                    left = left - space;
                    break;

                  case 9:
                    top = top + triggerHeight * .5;
                    left = left - space;
                    break;

                  case 10:
                    top = top + triggerHeight * .33;
                    left = left - space;
                    break;

                  case 11:
                    top = top - space;
                    left = left + triggerWidth * .33;
                    break;

                  case 12:
                    top = top - space;
                    left = left + triggerWidth * .5;
                    break;

                  default:                }
                return {
                    left: left,
                    top: top
                };
            },
            // 方法：临时显示tip，根据设置的time长时间段临时显示tip
            temporaryShow: function(time) {
                var that = this, temporaryTimer = that.getAttr("temporaryTimer");
                if (temporaryTimer) {
                    window.clearTimeout(temporaryTimer);
                }
                temporaryTimer = window.setTimeout(function() {
                    that.hide();
                }, time);
                that.setAttr("temporaryTimer", temporaryTimer);
                that.show();
                return that;
            },
            /*
             * 方法：设置箭头的方向，以trigger为参考对象设置箭头钟表方向，如：trigger
             * 的12点钟的方向，tip对应的方向则为6点钟（覆盖父类的show方法）
             */
            setArrowPosition: function(arrowPosition) {
                var that = this, arrowMapping = [ 5, 10, 9, 8, 1, 12, 11, 4, 3, 2, 7, 6 ], tipArrowPosition = arrowMapping[arrowPosition - 1];
                that.setAttr("triggerArrowPosition", arrowPosition);
                that.superClass.prototype.setArrowPosition.call(that, tipArrowPosition);
                return that;
            }
        }
    });
    return ToolTip;
});