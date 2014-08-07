define("common/selectProvince/0.0.1/selectProvince-debug", [ "$-debug", "base/createClass/1.0.1/createClass-debug", "base/pubSub/1.0.0/pubSub-debug", "components/toolTip/0.0.1/toolTip-debug" ], function(require) {
    var $ = require("$-debug"), createClass = require("base/createClass/1.0.1/createClass-debug"), PubSub = require("base/pubSub/1.0.0/pubSub-debug"), ToolTip = require("components/toolTip/0.0.1/toolTip-debug");
    var template = [ '<form class="com-form" style="width:400px;padding:20px">', '<div class="com-form-item" style="padding-left:80px">', '<label class="com-label com-checkbox-group" style="width:70px;color:#56c1ff;text-align:left;top:2px;cursor:pointer;"><input type="checkbox" name="area" value="华东"> 华东</label>', '<div class="com-checkbox-group">', '<label><input type="checkbox" name="province" value="山东"> 山东</label>', '<label><input type="checkbox" name="province" value="江苏"> 江苏</label>', '<label><input type="checkbox" name="province" value="安徽"> 安徽</label>', '<label><input type="checkbox" name="province" value="浙江"> 浙江</label>', '<label><input type="checkbox" name="province" value="福建"> 福建</label>', '<label><input type="checkbox" name="province" value="上海"> 上海</label>', '<label><input type="checkbox" name="province" value="广东"> 广东</label>', "</div>", "</div>", '<div class="com-form-item" style="padding-left:80px">', '<label class="com-label com-checkbox-group" style="width:70px;color:#56c1ff;text-align:left;top:2px;cursor:pointer;"><input type="checkbox" name="area" value="华南"> 华南</label>', '<div class="com-checkbox-group">', '<label><input type="checkbox" name="province" value="广西"> 广西</label>', '<label><input type="checkbox" name="province" value="海南"> 海南</label>', '<label><input type="checkbox" name="province" value="湖北"> 湖北</label>', '<label><input type="checkbox" name="province" value="湖南"> 湖南</label>', '<label><input type="checkbox" name="province" value="河南"> 河南</label>', '<label><input type="checkbox" name="province" value="江西"> 江西</label>', '<label><input type="checkbox" name="province" value="北京"> 北京</label>', '<label><input type="checkbox" name="province" value="天津"> 天津</label>', "</div>", "</div>", "</form>", '<a class="com-ico com-ico-16 com-ico-wrong" href="javascript:;" style="font-family:Dotum;right:10px;top:10px;font-weight:bold">x</a>' ].join("");
    var ProvinceTip = createClass({
        superClass: PubSub,
        init: function(conf) {
            var that = this;
            var tip, tipEle, trigger;
            conf = $.extend({}, conf);
            trigger = $(conf.trigger).eq(0);
            tip = new ToolTip({
                trigger: trigger.parent(),
                arrowPosition: 7,
                theme: "white",
                tipText: template
            });
            tipEle = tip.getAttr("tipObj").getAttr("tipEle");
            that.setAttr("tipObj", tip);
            that.setAttr("tipEle", tipEle);
            tipEle.delegate("input[type=checkbox]", "click", function() {
                var checkbox = $(this), checked = !!checkbox.attr("checked"), panel = checkbox.closest("div.com-form-item"), province;
                if (checkbox.attr("name") === "area") {
                    province = panel.find("input[name=province]");
                    if (checked) {
                        province.attr("checked", "checked");
                    } else {
                        province.removeAttr("checked");
                    }
                }
                that.on("select");
            });
            tipEle.delegate("a.com-ico-wrong", "click", function() {
                that.hide();
                that.on("close");
            });
        },
        methods: {
            show: function() {
                var that = this;
                that.getAttr("tipObj").show();
                return that;
            },
            hide: function() {
                var that = this;
                that.getAttr("tipObj").hide();
                return that;
            },
            getSelected: function() {
                var that = this, tipEle = that.getAttr("tipEle"), provinces = [];
                var selectProvince = tipEle.find("input[name=province]:checked");
                selectProvince.each(function() {
                    var province = $(this);
                    provinces.push(province.val());
                });
                return provinces;
            }
        }
    });
    return ProvinceTip;
});
