define("common/addTestDeviceDialog/0.0.1/addTestDeviceDialog-debug", [ "$-debug", "common/dialog/0.0.1/dialog-debug" ], function(require) {
    var $ = require("$-debug"), Dialog = require("common/dialog/0.0.1/dialog-debug");
    var dialogHtml = [ '<div style="padding: 30px 0">', '<div class="com-form-item" style="padding-left:110px">', '<label class="com-label" style="width:100px">imei码：</label>', '<input class="com-input" type="text" name="imeicode" value="" style="width:280px" />', '<div class="com-form-explain com-form-explain-block com-form-explain-hasIco" style="display:none"><i class="com-ico com-form-ico"></i><span></span></div>', "</div>", '<div style="padding:25px 0 0;text-align:center;">', '<a class="J-confirmBtn com-btn com-btn-blue com-btn-middling" href="javascript:;">&nbsp;&nbsp;&nbsp;&nbsp;确&nbsp;&nbsp;&nbsp;&nbsp;定&nbsp;&nbsp;&nbsp;&nbsp;</a>', '<a class="J-cancelBtn com-btn com-btn-grey com-btn-middling" href="javascript:;" style="margin-left:17px">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;</a>', "</div>", "</div>" ].join("");
    function addTestDeviceDialog(callback) {
        var contentEle = $(dialogHtml), imieCode = contentEle.find("input[name=imeicode]"), explain = contentEle.find("div.com-form-explain"), xhrObj;
        // 创建Dialog实例
        var dialogObj = new Dialog({
            titleText: "添加测试设备",
            content: contentEle
        });
        // 显示字段提示
        function showExplain(isShow, type, explainTxt) {
            if (isShow) {
                explain.removeClass().addClass("com-form-explain com-form-explain-block com-form-explain-hasIco com-form-explain-" + type);
                explain.find("i.com-ico").removeClass().addClass("com-ico com-form-ico com-form-ico-" + type);
                explain.find("span").html(explainTxt);
                explain.show();
            } else {
                explain.hide();
            }
        }
        // 监听“确定”按钮单击事件
        contentEle.on("click", "a.J-confirmBtn", function() {
            if (contentEle.attr("ajaxlock") === "true") {
                return false;
            }
            showExplain(false);
            if ($.trim(imieCode.val()) === "") {
                showExplain(true, "err", "请输入imei码！");
                return false;
            }
            showExplain(true, "loading", "正在添加设备...");
            contentEle.attr("ajaxlock", "true");
            // 异步添加信息
            xhrObj = $.getJSON("jsp/addTestDevice.jsp", {
                imeicode: encodeURIComponent($.trim(imieCode.val())),
                r: Math.random()
            }, function(data) {
                contentEle.attr("ajaxlock", "false");
                if (data.status === "1") {
                    showExplain(true, "success", "测试设备添加成功！");
                    window.setTimeout(function() {
                        dialogObj.hide();
                        if (typeof callback === "function") {
                            callback(data.data);
                        }
                    }, 1e3);
                } else {
                    showExplain(true, "warn", data.message);
                }
            });
        });
        // 监听“取消”按钮单击事件
        contentEle.on("click", "a.J-cancelBtn", function() {
            dialogObj.hide();
        });
        // 窗口关闭时将Dialog实例释放掉
        dialogObj.on("hide", function() {
            contentEle.off();
            if (xhrObj && xhrObj.abort) {
                xhrObj.abort();
            }
            dialogObj.destroy();
            dialogObj = null;
            contentEle = null;
            imieCode = null;
            explain = null;
        });
        dialogObj.setSize(500, "auto");
        dialogObj.show();
    }
    return addTestDeviceDialog;
});
;define("common/dialog/0.0.1/dialog-debug", [ "$-debug", "base/createClass/1.0.2/createClass-debug", "components/widget/0.0.1/widget-debug", "components/dialog/1.0.1/dialog-debug" ], function(require) {
    var $ = require("$-debug"), createClass = require("base/createClass/1.0.2/createClass-debug"), Widget = require("components/widget/0.0.1/widget-debug"), Dialog = require("components/dialog/1.0.1/dialog-debug");
    var template = [ '<div class="com-dialog">', '<h4 class="com-dialog-title"></h4>', '<div class="com-dialog-bd"></div>', '<a class="com-ico com-ico-close com-dialog-close" href="javascript:;" title="点击关闭窗口"></a>', "</div>" ].join("");
    var ComDialog = createClass({
        superClass: Dialog,
        attrs: {
            template: template
        },
        init: function(conf) {
            var that = this;
            conf = $.extend({
                titleText: "对话框",
                mask: true
            }, conf);
            that.render();
            that.setSize(400, "auto").setTitle(conf.titleText);
            if (conf.content) {
                that.append(conf.content);
            }
            that.setAttr(conf);
        },
        methods: {
            bindUI: function() {
                var that = this, template = that.getAttr("template"), widgetEle = that.getAttr("widgetEle");
                that.superClass.prototype.bindUI.apply(that);
                widgetEle.on("click", "a.com-dialog-close", function() {
                    that.hide();
                });
                that.on("render", function() {
                    // 触发渲染事件后将模板代码填充进去
                    widgetEle.html(template);
                    widgetEle.css({
                        background: "none"
                    });
                });
            },
            setTitle: function(titleText) {
                var that = this, widgetEle = that.getAttr("widgetEle"), titleEle = that.getAttr("titleEle");
                titleText = titleText || that.getAttr("titleText");
                if (!titleEle) {
                    titleEle = widgetEle.find(".com-dialog-title");
                    that.setAttr(titleEle);
                }
                that.setAttr("titleText", titleText);
                titleEle.html(titleText);
                return that;
            },
            append: function(ele) {
                var that = this, widgetEle = that.getAttr("widgetEle"), dialogBdEle = that.getAttr("dialogBdEle");
                if (!dialogBdEle) {
                    dialogBdEle = widgetEle.find("div.com-dialog-bd");
                    that.setAttr("dialogBdEle", dialogBdEle);
                }
                dialogBdEle.append(ele);
                return that;
            }
        }
    });
    // 模拟alert
    function alterDialog(alertTxt) {
        var dialogObj = alterDialog._dialogObj, widgetEle, dialogBdEle;
        if (!dialogObj) {
            dialogObj = new ComDialog({
                mask: true,
                titleText: "网页信息",
                content: [ '<p class="J-alterTipText" style="padding:15px 0 30px;margin:0;font-size:14px;color:#666;line-height:1.5;text-align:center;"></p>', '<div style="padding:15px 0;text-align:center;font-size:13px;">', '<a class="J-confirmBtn com-btn com-btn-blue com-btn-middling" href="javascript:;">&nbsp;&nbsp;&nbsp;&nbsp;确&nbsp;&nbsp;&nbsp;&nbsp;定&nbsp;&nbsp;&nbsp;&nbsp;</a>', "</div>" ].join("")
            });
            widgetEle = dialogObj.getAttr("widgetEle");
            alterDialog._dialogObj = dialogObj;
            widgetEle.on("click", "a.J-confirmBtn", function() {
                dialogObj.hide();
            });
        }
        dialogBdEle = dialogObj.getAttr("dialogBdEle");
        dialogBdEle.find("p.J-alterTipText").html(alertTxt);
        dialogObj.show();
    }
    // 模拟confirm
    function confirmDialog(confirmTxt, callback) {
        var dialogObj = confirmDialog._dialogObj, widgetEle, dialogBdEle;
        if (!dialogObj) {
            dialogObj = new ComDialog({
                mask: true,
                titleText: "确认信息",
                content: [ '<p class="J-alterTipText" style="padding:15px 0 30px;margin:0;font-size:14px;color:#666;line-height:1.5;text-align:center;"></p>', '<div style="padding:15px 0;text-align:center;font-size:13px;">', '<a class="J-confirmBtn com-btn com-btn-blue com-btn-middling" href="javascript:;">&nbsp;&nbsp;&nbsp;&nbsp;确&nbsp;&nbsp;&nbsp;&nbsp;定&nbsp;&nbsp;&nbsp;&nbsp;</a>', '<a class="J-cancelBtn com-btn com-btn-grey com-btn-middling" href="javascript:;" style="margin-left:17px">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;</a>', "</div>" ].join("")
            });
            widgetEle = dialogObj.getAttr("widgetEle");
            dialogObj._dialogObj = dialogObj;
            widgetEle.on("click", "a.J-confirmBtn", function() {
                dialogObj.hide();
                if (typeof callback === "function") {
                    callback(true);
                }
            });
            widgetEle.on("click", "a.J-cancelBtn", function() {
                dialogObj.hide();
                if (typeof callback === "function") {
                    callback(false);
                }
            });
            widgetEle.on("click", "a.com-dialog-close", function() {
                if (typeof callback === "function") {
                    callback(false);
                }
            });
        }
        dialogBdEle = dialogObj.getAttr("dialogBdEle");
        dialogBdEle.find("p.J-alterTipText").html(confirmTxt);
        dialogObj.show();
    }
    ComDialog.alert = alterDialog;
    ComDialog.confirm = confirmDialog;
    return ComDialog;
});
;define("common/selectProvince/0.0.1/selectProvince-debug", [ "$-debug", "base/createClass/1.0.1/createClass-debug", "base/pubSub/1.0.0/pubSub-debug", "components/toolTip/0.0.1/toolTip-debug" ], function(require) {
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
;define("common/setAccountAuthDialog/0.0.1/setAccountAuthDialog-debug", [ "components/dialog/1.0.0/dialog-debug", "$-debug" ], function(require) {
    var Dialog = require("components/dialog/1.0.0/dialog-debug"), $ = require("$-debug");
    var editAccountAuthDialog = function(managerId, callback) {
        var dialogContentEle = $([ '<form style="padding:20px 40px;">', "<fieldset>", "<label>选择管理级别</label>", '<div class="controls">', "<select>", '<option value="0">超级管理员</option>', '<option value="1">系统管理员</option>', '<option value="2">普通管理员</option>', "</select>", "</div>", '<div class="controls" style="padding: 10px 0 0;">', '<input type="button" class="btn" value=" 确  定 " />', "</div>", "</fieldset>", "<form>" ].join(""));
        var dialog = new Dialog({
            title: "设置账户权限",
            width: 400,
            content: dialogContentEle
        });
        var authLst = dialogContentEle.find("select"), confirmBtn = dialogContentEle.find("input.btn");
        var setAuth = function(id, auth) {
            $.post("yb/setAccoutAuth", {
                managerId: id,
                auth: auth
            }, function(data) {
                if (typeof callback === "function") {
                    callback(data);
                }
            }, "JSON");
        };
        confirmBtn.click(function() {
            setAuth(managerId, authLst.val());
            dialog.hide();
        });
        dialog.show();
    };
    return editAccountAuthDialog;
});
;define("common/setFilter/0.0.1/setFilter-debug", [ "$-debug" ], function(require) {
    var $ = require("$-debug");
    function setFilter(filterData, filterPanel, pagerPanel) {
        var fields = filterPanel.find("input,textarea,select"), filterBtn = filterPanel.find("a.J-filterBtn"), fieldSet = {}, filterUrl = filterPanel.attr("data-filter-url");
        filterData = filterData || {};
        function getInfo() {
            var info = {}, field, fieldVal, fieldType, fieldTagName;
            for (var k in fieldSet) {
                if (fieldSet.hasOwnProperty(k)) {
                    field = fieldSet[k];
                    fieldType = field.eq(0).prop("type").toLowerCase();
                    fieldTagName = field.eq(0).prop("tagName").toLowerCase();
                    if (fieldTagName === "input") {
                        if (fieldType === "radio" || fieldType === "checkbox") {
                            fieldVal = [];
                            field.filter(":checked").each(function() {
                                fieldVal.push(encodeURIComponent($(this).val()));
                            });
                            fieldVal = fieldVal.join(",");
                        } else if (fieldType === "password" || fieldType === "text") {
                            fieldVal = encodeURIComponent(field.eq(0).val());
                        }
                    }
                    if (fieldTagName === "textarea") {
                        fieldVal = encodeURIComponent(field.eq(0).val());
                    } else if (fieldTagName === "select") {
                        fieldVal = encodeURIComponent(field.eq(0).val());
                    }
                    if ($.trim(fieldVal) !== "") {
                        info[k] = fieldVal;
                    }
                }
            }
            return info;
        }
        function goFilter(info, url) {
            var params = [];
            for (var k in info) {
                if (info.hasOwnProperty(k)) {
                    if (info[k]) {
                        params.push(k + "=" + info[k]);
                    }
                }
            }
            params = params.join("&");
            if (url.indexOf("?") === -1) {
                url = url + "?" + params;
            } else {
                url = url + params;
            }
            location.href = url;
        }
        fields.each(function(i) {
            var field = $(this), fieldName = field.attr("name");
            if (fieldSet[fieldName]) {
                return;
            }
            fieldSet[fieldName] = filterPanel.find("[name=" + fieldName + "]");
        });
        filterBtn.on("click", function() {
            var info = getInfo();
            filterData = $.extend(filterData, info);
            filterData.currentPage = "";
            goFilter(filterData, filterUrl);
        });
        if (pagerPanel) {
            pagerPanel.delegate("li", "click", function() {
                var btn = $(this), page = filterData.currentPage || pagerPanel.find("li.active").data("page") || 1;
                if (btn.hasClass("disabled")) {
                    return;
                }
                if (btn.hasClass("J-prev")) {
                    page = page - 1;
                } else if (btn.hasClass("J-next")) {
                    page = page + 1;
                } else {
                    page = btn.data("page");
                }
                filterData.currentPage = page;
                goFilter(filterData, filterUrl);
            });
        }
    }
    return setFilter;
});
;define("common/showInputErr/0.0.1/showInputErr-debug", [ "$-debug" ], function(require) {
    var $ = require("$-debug");
    var showInputErr = function(field, isShow, errTxt) {
        var panel = field.closest("div.controls"), errEle = panel.find("span.com-form-err"), tipEle = panel.find("span.com-form-tip");
        if (errEle.size() === 0) {
            errEle = $('<span class="help-block com-form-err"></span>');
            errEle.appendTo(panel);
        }
        if (isShow) {
            errEle.show().text(errTxt);
            tipEle.hide();
        } else {
            errEle.hide();
            tipEle.show();
        }
    };
    return showInputErr;
});
;define("common/tools/0.0.1/tools-debug", [ "$-debug" ], function(require) {
    var $ = require("$-debug");
    // 常用的工具和函数
    var tools = {};
    // 函数：判断文件名是否为图片格式（jpg、jpeg、git、png）
    tools.isImgType = function(fileName) {
        var isImg = /\.(jpg|jpeg|gif|png)$/i.test(fileName);
        return isImg;
    };
    // 函数：保留小数位
    tools.decimalPlace = function(theNum, digit) {
        digit = parseInt(digit, 10);
        if (isNaN(Number(theNum))) {
            throw new Error("参数 theNum 必须为数字");
        }
        if (isNaN(digit) || digit < 0) {
            throw new Error("参数 digit 必须为大于0的数字");
        }
        theNum = theNum + "";
        if (theNum.indexOf(".") !== -1) {
            var splitArr = theNum.split("."), decimalPlace = splitArr[1], zeroFillNum = digit - decimalPlace.length;
            if (digit === 0) {
                theNum = splitArr[0];
            } else {
                if (zeroFillNum > 0) {
                    // 补0
                    for (;zeroFillNum > 0; zeroFillNum--) {
                        decimalPlace = decimalPlace + "0";
                    }
                    decimalPlace = "." + decimalPlace;
                } else {
                    // 截取
                    decimalPlace = "." + decimalPlace.substring(0, digit);
                }
                theNum = splitArr[0] + decimalPlace;
            }
        }
        return theNum;
    };
    // 判断类型
    tools.isType = function(type) {
        return function(target) {
            return Object.prototype.toString(target) === "[object " + type + "]";
        };
    };
    tools.isString = tools.isType("String");
    tools.isObject = tools.isType("Object");
    tools.isArray = tools.isType("Array");
    tools.isNumber = tools.isType("Number");
    tools.isFunction = tools.isType("Function");
    // 重复字符串
    tools.repeatStr = function(str, repeat) {
        return new Array(repeat + 1).join(str);
    };
    return tools;
});
;define("common/validateForm/0.0.1/validateForm-debug", [ "$-debug" ], function(require) {
    var $ = require("$-debug");
    // 显示字段提示
    var showExplain = function(theField, isShow, type, explainTxt) {
        var field = $(theField), fieldPanel = field.closest(".com-form-item"), explainEle = fieldPanel.find(".com-form-explain"), isBlock = explainEle.hasClass("com-form-explain-block");
        explainTxt = explainTxt || "&nbsp;";
        if (explainEle.size() === 0) {
            explainEle = $('<div class="com-form-explain com-form-explain-hasIco"></div>');
            explainEle.appendTo(fieldPanel);
        } else {
            explainEle.removeClass().addClass("com-form-explain com-form-explain-hasIco");
            if (isBlock) {
                explainEle.addClass("com-form-explain-block");
            }
        }
        if (isShow) {
            explainEle.show();
            if (type === "explain") {
                explainEle.html('<i class="com-ico com-form-ico com-form-ico-explain"></i><span>' + explainTxt + "</span>");
            } else if (type !== "") {
                explainEle.addClass("com-form-explain-" + type).html('<i class="com-ico com-form-ico com-form-ico-' + type + '"></i><span>' + explainTxt + "</span>");
            }
        } else {
            explainEle.hide();
        }
    };
    // 显示字段的默认提示
    var showDefaultTip = function(theField, defaultTip) {
        var field = $(theField), fieldName = field.attr("name"), fieldVal = $.trim(field.val());
        if (fieldVal === "" && defaultTip) {
            showExplain(field, true, "explain", defaultTip);
        }
    };
    // 根据设定的验证方案验证指定的字段
    var valiFn = function(theField, valiObj, callback) {
        var field = $(theField), fieldName = field.attr("name"), fieldVal = $.trim(field.val()), fieldType = (field.attr("type") || "").toLowerCase(), fieldTagName = field.prop("tagName").toLowerCase(), fieldPanel = field.closest("div.com-form-item"), theForm = field.closest("form"), errNum = 0, patterns;
        var isShowSuccessTip;
        if (!valiObj) {
            return;
        }
        if (typeof valiObj.isShowSuccessTip === "undefined") {
            isShowSuccessTip = true;
        } else {
            isShowSuccessTip = !!valiObj.isShowSuccessTip;
        }
        field.data("is_pass_validate", "false");
        showExplain(field, false);
        // 非空验证
        if (!!valiObj.required) {
            if (fieldType === "text" || fieldType === "password" || fieldType === "hidden" || fieldTagName === "textarea" || fieldTagName === "select") {
                if (fieldVal === "") {
                    showExplain(field, true, "err", valiObj.emptyTip || "该字段不能为空！");
                    errNum++;
                }
            } else if (fieldType === "radio" || fieldType === "checkbox") {
                var checkedFields = theForm.find("input[name=" + fieldName + "]:checked");
                if (checkedFields.size() === 0) {
                    showExplain(field, true, "err", valiObj.emptyTip || "该字段不能为空！");
                    errNum++;
                }
            }
        }
        // 字段对比验证（使用场景：验证确认密码是否和密码一致）
        if (errNum === 0 && valiObj.compare) {
            var compareField = theForm.find("input[name=" + valiObj.compare.fieldName + "],textarea[name=" + valiObj.compare.fieldName + "]").eq(0), compareFieldVal = $.trim(compareField.val());
            if (compareField.size()) {
                if (!valiObj.compare.compareFn(fieldVal, compareFieldVal)) {
                    showExplain(field, true, "err", valiObj.compare.failedTip || "");
                    errNum++;
                }
            }
        }
        // 正则验证
        patterns = valiObj.patterns;
        if (errNum === 0 && patterns && patterns.constructor === Array) {
            var reg, noMatchTip, patternObj, pattern;
            for (var i = 0, l = patterns.length; i < l; i++) {
                patternObj = patterns[i];
                pattern = patternObj.pattern;
                noMatchTip = patternObj.noMatchTip || "你输入的内容格式有误！";
                if (pattern.constructor === RegExp) {
                    pattern = function(val) {
                        return patternObj.pattern.test(val);
                    };
                }
                if (!pattern(fieldVal)) {
                    showExplain(field, true, "err", noMatchTip);
                    errNum++;
                    break;
                }
            }
        }
        // ajax（异步）验证
        if (errNum === 0 && valiObj.asyncVali) {
            var valiXhr = field.data("valiXhr"), asyncVali = valiObj.asyncVali, url = asyncVali.url;
            var params = {};
            params.fieldName = asyncVali.name || fieldName;
            params.fieldVal = encodeURIComponent(fieldVal);
            params._r = Math.random();
            if (valiXhr && valiXhr.abort) {
                valiXhr.abort();
            }
            showExplain(field, true, "loading", "");
            field.data("is_pass_validate", "asyncValidating");
            valiXhr = $.getJSON(url, params, function(data) {
                var isPass = data.status === "1";
                if (isPass) {
                    if (isShowSuccessTip) {
                        showExplain(field, true, "success", asyncVali.successTip || valiObj.successTip || "");
                    }
                    field.data("is_pass_validate", "true");
                } else {
                    showExplain(field, true, "err", data.message || "");
                    field.data("is_pass_validate", "false");
                }
                if (typeof callback === "function") {
                    callback(isPass, data);
                }
            });
            field.data("valiXhr", valiXhr);
        }
        if (errNum !== 0) {
            field.data("is_pass_validate", "false");
            if (typeof callback === "function") {
                callback(false);
            }
        } else if (!valiObj.asyncVali) {
            // 全部验证通过则显示成功的提示
            if (isShowSuccessTip) {
                showExplain(field, true, "success", valiObj.successTip || "");
            }
            field.data("is_pass_validate", "true");
            if (typeof callback === "function") {
                callback(true);
            }
        }
    };
    // 判断指定表单是否通过指定方案的验证操作
    var isPassVali = function(theFrm, validPlan) {
        var notPassFieldsName = [], isPass = false, field, valiState;
        for (var k in validPlan) {
            valiState = false;
            if (validPlan.hasOwnProperty(k)) {
                field = theFrm.find("[name=" + k + "]").eq(0);
                if (field.size()) {
                    valiState = field.data("is_pass_validate");
                    if (valiState !== "true") {
                        notPassFieldsName.push(k);
                    }
                }
            }
        }
        return {
            isPass: notPassFieldsName.length === 0,
            notPassFieldsName: notPassFieldsName
        };
    };
    // 按照设定的验证的方案去验证指定的表单
    var goVali = function(theFrm, valiPlan) {
        var notPassFieldsName = [], field;
        for (var k in valiPlan) {
            if (valiPlan.hasOwnProperty(k)) {
                field = theFrm.find("[name=" + k + "]").eq(0);
                if (field.size() && field.data("is_pass_validate") !== "true") {
                    valiFn(field, valiPlan[k]);
                }
            }
        }
    };
    return {
        showExplain: showExplain,
        showDefaultTip: showDefaultTip,
        valiFn: valiFn,
        isPassVali: isPassVali,
        goVali: goVali
    };
});