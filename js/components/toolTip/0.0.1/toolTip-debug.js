define("components/toolTip/0.0.1/toolTip-debug", [ "$-debug", "base/createClass/1.0.1/createClass-debug", "components/tip/0.0.1/tip-debug" ], function(require) {
    var $ = require("$-debug"), createClass = require("base/createClass/1.0.1/createClass-debug"), Tip = require("components/tip/0.0.1/tip-debug");
    var ToolTip = createClass({
        init: function(conf) {
            var that = this;
            var tipObj = new Tip();
            conf = $.extend({
                trigger: $(conf.trigger).eq(0)
            }, conf);
            that.setAttr(conf).setAttr("tipObj", tipObj);
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
            show: function() {
                var that = this, tipObj = that.getAttr("tipObj"), trigger = that.getAttr("trigger"), offset = trigger.offset(), triggerWidth = trigger.outerWidth(), triggerHeight = trigger.outerHeight(), arrowPosition = that.getAttr("arrowPosition"), space = 5, left, top;
                left = offset.left;
                top = offset.top;
                switch (arrowPosition) {
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

                  case 1:
                    top = top - space;
                    left = left + triggerWidth * .66;
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
                tipObj.setPosition(left, top).show();
                return that;
            },
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
            hide: function() {
                var that = this, tipObj = that.getAttr("tipObj");
                tipObj.hide();
                return that;
            },
            setArrowPosition: function(arrowPosition) {
                var that = this, tipObj = that.getAttr("tipObj"), tipArrowPosition;
                that.setAttr("arrowPosition", arrowPosition);
                switch (arrowPosition) {
                  case 1:
                    tipArrowPosition = 5;
                    break;

                  case 2:
                    tipArrowPosition = 10;
                    break;

                  case 3:
                    tipArrowPosition = 9;
                    break;

                  case 4:
                    tipArrowPosition = 8;
                    break;

                  case 5:
                    tipArrowPosition = 1;
                    break;

                  case 6:
                    tipArrowPosition = 12;
                    break;

                  case 7:
                    tipArrowPosition = 11;
                    break;

                  case 8:
                    tipArrowPosition = 4;
                    break;

                  case 9:
                    tipArrowPosition = 3;
                    break;

                  case 10:
                    tipArrowPosition = 2;
                    break;

                  case 11:
                    tipArrowPosition = 7;
                    break;

                  case 12:
                    tipArrowPosition = 6;
                    break;

                  default:                }
                tipObj.setArrowPosition(tipArrowPosition);
                return that;
            },
            setTheme: function(theme) {
                var that = this, tipObj = that.getAttr("tipObj");
                tipObj.setTheme(theme);
                return that;
            },
            setTipText: function(tipText) {
                var that = this, tipObj = that.getAttr("tipObj");
                tipObj.setTipText(tipText);
                return that;
            },
            setPosition: function(left, top) {
                var that = this, tipObj = that.getAttr("tipObj");
                tipObj.setPosition(left, top);
                return that;
            }
        }
    });
    return ToolTip;
});
