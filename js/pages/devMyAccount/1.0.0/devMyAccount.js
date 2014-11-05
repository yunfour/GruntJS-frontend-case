define("pages/devMyAccount/1.0.0/devMyAccount", [ "$", "components/vScroll/0.0.1/vScroll", "components/tab/1.0.1/tab", "common/validateForm/0.0.1/validateForm", "pages/config/1.0.0/config" ], function(require) {
    var $ = require("$"), VScroll = require("components/vScroll/0.0.1/vScroll"), Tab = require("components/tab/1.0.1/tab"), validateForm = require("common/validateForm/0.0.1/validateForm");
    var CONFIG_DATA = require("pages/config/1.0.0/config");
    var $win = $(window);
    var theFrm = $("#J-theFrm"), role = theFrm.find("input[name=role]"), userName = $("#username"), email = $("#email"), confirmPassword = $("#confirmPassword"), checkCode = $("#checkCode"), accountType = theFrm.find("input[name=accountType]"), companyName = $("#companyName"), telephone = $("#telephone"), bankAccount = $("#bankAccount"), bank = $("#bank"), name = $("#name"), idNum = $("#idNum"), mobile = $("#mobile"), bankOfPerson = $("#bankOfPerson"), bankAccountOfPerson = $("#bankAccountOfPerson"), roleCheckboxPanel = $("#J-roleCheckboxPanel"), companyInfo = $("#J-companyInfo"), personalInfo = $("#J-personalInfo"), submitBtn = theFrm.find("input[type=submit]");
    var asyncValiUrl = "http://localhost:8089/push/html/jsp/saveAccount.jsp";
    var validatePlan = {
        role: {
            required: true,
            emptyTip: "请选择角色！",
            asyncVali: {
                url: asyncValiUrl,
                successTip: "保存成功！"
            }
        },
        email: {
            emptyTip: "请输入有效的Email地址！",
            required: true,
            patterns: [ {
                pattern: CONFIG_DATA.regExp.email,
                noMatchTip: "您输入的邮箱格式错误！"
            } ],
            asyncVali: {
                url: asyncValiUrl,
                successTip: "保存成功！"
            }
        },
        password: {
            emptyTip: "请输入密码！",
            required: true,
            patterns: [ {
                pattern: function(val) {
                    return val.length >= 8 && val.length <= 16;
                },
                noMatchTip: "长度应为8-16个字符！"
            }, {
                pattern: function(val) {
                    return !/^[0-9]+$/.test(val);
                },
                noMatchTip: "不能全为数字！"
            }, {
                pattern: function(val) {
                    return !/^[a-z]+$/.test(val) && !/^[A-Z]+$/.test(val);
                },
                noMatchTip: "不能全为字母！"
            } ],
            asyncVali: {
                url: asyncValiUrl,
                successTip: "保存成功！"
            }
        },
        telephone: {
            patterns: [ {
                pattern: function(val) {
                    var len = val.length;
                    return len >= 11 && len <= 15;
                },
                noMatchTip: "长度应为11-15位数字"
            }, {
                pattern: function(val) {
                    return CONFIG_DATA.regExp.telephone.test(val) || CONFIG_DATA.regExp.mobile.test(val);
                },
                noMatchTip: "请输入真实有效的联系电话"
            } ],
            asyncVali: {
                url: asyncValiUrl,
                successTip: "保存成功！"
            }
        },
        bank: {
            asyncVali: {
                url: asyncValiUrl,
                successTip: "保存成功！"
            }
        }
    };
    // 角色checkbox按钮的效果
    roleCheckboxPanel.delegate("span.reg-checkbox", "click", function() {
        var theLabel = $(this), roleChkbox = theLabel.children("input[name=role]"), checkedClass = "reg-checkbox-checked", isChecked = theLabel.hasClass(checkedClass);
        if (isChecked) {
            theLabel.removeClass(checkedClass);
            roleChkbox.removeAttr("checked");
        } else {
            theLabel.addClass(checkedClass);
            roleChkbox.attr("checked", "checked");
        }
    });
    // 点击修改字段信息的链接按钮时的显示输入框
    theFrm.delegate("a.J-editBtn", "click", function() {
        var editBtn = $(this), frmItm = editBtn.closest("div.com-form-item"), editPanel = frmItm.find("div.J-editPanel"), infoPanel = frmItm.find("div.J-infoPanel");
        infoPanel.hide();
        editPanel.show();
    });
    // 点击输入框中的确定按钮
    theFrm.delegate("input.J-saveBtn", "click", function() {
        var saveBtn = $(this), frmItm = saveBtn.closest("div.com-form-item"), editPanel = frmItm.find("div.J-editPanel"), infoPanel = frmItm.find("div.J-infoPanel"), field = editPanel.find("input").eq(0), fieldVal = $.trim(field.val()), fieldName = field.attr("name");
        if (saveBtn.data("ajaxlock") === "true") {
            return;
        }
        /*
         * 以下进行ajax验证（如果验证通过则直接保存），
         * 异步请求loading时，需要锁定按钮(对saveBtn加锁，
         * 同时将input字段field样式改成禁用样式)
         */
        saveBtn.data("ajaxlock", "true");
        field.attr("readonly", "readonly").addClass("com-input-disabled");
        // 根据验证方案去验证该字段
        validateForm.valiFn(field, validatePlan[fieldName], function(isPass) {
            saveBtn.data("ajaxlock", "false");
            field.removeAttr("readonly").removeClass("com-input-disabled");
            if (isPass) {
                var infoVal = "";
                editPanel.hide();
                infoPanel.show();
                if (fieldName === "role") {
                    var roleChecked = editPanel.find("input[name=" + fieldName + "]:checked");
                    if (roleChecked.size() === 2) {
                        infoVal = "我是开发者、推广者";
                    } else {
                        if (roleChecked.val() === "developer") {
                            infoVal = "我是开发者";
                        } else {
                            infoVal = "我是推广者";
                        }
                    }
                } else if (fieldName !== "password") {
                    infoVal = fieldVal;
                }
                infoPanel.find("span").html(infoVal);
                window.setTimeout(function() {
                    validateForm.showExplain(field, false);
                }, 1e3);
            }
        });
    });
    // 点击输入框中的取消按钮
    theFrm.delegate("input.J-cancelBtn", "click", function() {
        var cancelBtn = $(this), frmItm = cancelBtn.closest("div.com-form-item"), editPanel = frmItm.find("div.J-editPanel"), infoPanel = frmItm.find("div.J-infoPanel"), field = editPanel.find("input").eq(0);
        editPanel.hide();
        infoPanel.show();
        validateForm.showExplain(field, false);
    });
});
