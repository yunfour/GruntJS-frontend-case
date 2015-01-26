define("pages/reg/1.0.0/reg-debug", [ "$-debug", "components/vScroll/0.0.1/vScroll-debug", "components/tab/1.0.1/tab-debug", "common/validateForm/0.0.1/validateForm-debug", "pages/config/1.0.0/config-debug" ], function(require) {
    var $ = require("$-debug"), VScroll = require("components/vScroll/0.0.1/vScroll-debug"), Tab = require("components/tab/1.0.1/tab-debug"), validateForm = require("common/validateForm/0.0.1/validateForm-debug");
    var CONFIG_DATA = require("pages/config/1.0.0/config-debug");
    var $win = $(window);
    var regFrm = $("#J-regFrm"), role = regFrm.find("input[name=role]"), userName = $("#username"), email = $("#email"), password = $("#password"), confirmPassword = $("#confirmPassword"), checkCode = $("#checkCode"), checkCodeImg = $("#J-regFrmChkCode"), refreshChkcodeBtn = $("#J-refreshChkcode"), accountType = regFrm.find("input[name=accountType]"), companyName = $("#companyName"), telephone = $("#telephone"), bankAccount = $("#bankAccount"), bank = $("#bank"), name = $("#name"), idNum = $("#idNum"), mobile = $("#mobile"), bankOfPerson = $("#bankOfPerson"), bankAccountOfPerson = $("#bankAccountOfPerson"), roleCheckboxPanel = $("#J-roleCheckboxPanel"), companyInfo = $("#J-companyInfo"), personalInfo = $("#J-personalInfo"), submitBtn = regFrm.find("input[type=submit]");
    var validatePlan = {
        role: {
            required: true,
            emptyTip: "请选择角色！"
        },
        username: {
            // 默认提示
            defaultTip: "用户名作为登录帐号，6-25个字符",
            // 是否必填
            required: true,
            // 非空时的错误提示
            emptyTip: "用户名不能为空！",
            // 异步校验
            asyncVali: {
                // 异步请求url，必填
                url: "http://localhost:8089/push/html/jsp/test-01.jsp",
                // 参数名，默认为该字段的“name”属性，选填
                paramName: "uname",
                // 异步验证通过的提示，选填
                successTip: "该用户名可以使用"
            },
            // 模式验证，可以使用正则，也可以自定义函数验证
            patterns: [ {
                pattern: function(val) {
                    return val.length >= 6;
                },
                noMatchTip: "不能少于6个字符！"
            }, {
                pattern: function(val) {
                    return val.length <= 25;
                },
                noMatchTip: "不能多于25个字符！"
            }, {
                pattern: function(val) {
                    var ret = /^[A-Za-z0-9]+$/.test(val);
                    return ret;
                },
                noMatchTip: "您输入的用户名格式错误！"
            } ]
        },
        email: {
            defaultTip: "相关通知会发送至该邮箱，该邮箱作为登录帐号",
            emptyTip: "请填写有效的Email地址！",
            required: true,
            asyncVali: {
                url: "http://localhost:8089/push/html/jsp/test-01.jsp",
                successTip: "该邮箱可以使用"
            },
            patterns: [ {
                // pattern可以为一个函数，也可以是一个正则表达式
                pattern: CONFIG_DATA.regExp.email,
                noMatchTip: "您输入的邮箱格式错误！"
            } ]
        },
        password: {
            defaultTip: "8-16个字符（不能使用单纯字母或单纯数字）",
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
            } ]
        },
        confirmPassword: {
            defaultTip: "请再次填写密码",
            emptyTip: "请输入确认密码！",
            required: true,
            compare: {
                fieldName: "password",
                compareFn: function(thisVal, compareFieldVal) {
                    return thisVal === compareFieldVal;
                },
                failedTip: "两次填写的密码不一致"
            }
        },
        checkCode: {
            defaultTip: "验证码为四位字符",
            required: true,
            emptyTip: "请输入图片中的字符！",
            patterns: [ {
                pattern: function(val) {
                    return val.length === 4;
                },
                noMatchTip: "验证码为4个字符！"
            } ]
        },
        companyName: {
            defaultTip: "最少6个汉字，如杭州斯凯网络科技有限公司",
            patterns: [ {
                pattern: /^[\u4e00-\u9fa5]{6,}$/,
                noMatchTip: "长度不能少于6个汉字"
            } ]
        },
        telephone: {
            defaultTip: "固定电话或手机号码",
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
            } ]
        },
        name: {
            defaultTip: "请填写中文姓名，最少2个汉字",
            patterns: [ {
                pattern: /^[\u4e00-\u9fa5]{1,}$/,
                noMatchTip: "联系人姓名必须是中文"
            }, {
                pattern: function(val) {
                    return val.length >= 2;
                },
                noMatchTip: "长度不能少于2个汉字"
            } ]
        },
        idNum: {
            patterns: [ {
                pattern: CONFIG_DATA.regExp.idCard,
                noMatchTip: "身份证格式错误"
            } ]
        },
        mobile: {
            patterns: [ {
                pattern: CONFIG_DATA.regExp.mobile,
                noMatchTip: "请输入真实有效的手机号码"
            } ]
        }
    };
    // 显示字段提示
    var showExplain = validateForm.showExplain;
    // 显示字段的默认提示
    var showDefaultTip = validateForm.showDefaultTip;
    // 根据设定的验证方案验证指定的字段
    var valiFn = validateForm.valiFn;
    // 判断指定表单是否通过指定方案的验证操作
    var isPassVali = validateForm.isPassVali;
    // 按照设定的验证的方案去验证指定的表单
    var goVali = validateForm.goVali;
    // 采集表单信息数据
    var getFrmInfo = function() {
        var info = {};
        var roleArr = [];
        role.each(function() {
            var theRole = $(this);
            if (!!theRole.attr("checked")) {
                roleArr.push(theRole.val());
            }
        });
        info.role = roleArr.join(",");
        info.userName = $.trim(userName.val());
        info.email = $.trim(email.val());
        info.password = $.trim(password.val());
        info.checkCode = $.trim(checkCode.val());
        info.accountType = accountType.filter(":checked").val();
        if (info.accountType === "company") {
            info.companyName = $.trim(companyName.val());
            info.telephone = $.trim(telephone.val());
            info.bank = $.trim(bank.val());
            info.bankAccount = $.trim(bankAccount.val());
        } else {
            info.name = $.trim(name.val());
            info.idNum = $.trim(idNum.val());
            info.mobile = $.trim(mobile.val());
            info.bankOfPerson = $.trim(bankOfPerson.val());
            info.bankAccountOfPerson = $.trim(bankAccountOfPerson.val());
        }
        return info;
    };
    // 角色选中效果
    roleCheckboxPanel.delegate("span.reg-checkbox", "click", function() {
        var theLabel = $(this), roleChkbox = theLabel.children("input[name=role]"), checkedClass = "reg-checkbox-checked", isChecked = theLabel.hasClass(checkedClass);
        if (isChecked) {
            theLabel.removeClass(checkedClass);
            roleChkbox.removeAttr("checked");
        } else {
            theLabel.addClass(checkedClass);
            roleChkbox.attr("checked", "checked");
        }
        valiFn(role, validatePlan.role);
    });
    // 刷新验证吗
    refreshChkcodeBtn.on("click", function() {
        var imgSrc = checkCodeImg.attr("src");
        imgSrc = imgSrc.split("?")[0];
        imgSrc = imgSrc + "?r=" + Math.random();
        checkCodeImg.attr("src", imgSrc);
    });
    // 切换账户类型对应的字段
    accountType.on("click", function() {
        var typeVal = accountType.filter(":checked").val();
        if (typeVal === "company") {
            personalInfo.hide();
            companyInfo.show();
        } else if (typeVal === "person") {
            personalInfo.show();
            companyInfo.hide();
        }
    });
    // 当表单中的字段得到焦点时，则显示该字段的默认提示
    regFrm.delegate("input", "focus", function() {
        var theField = $(this), fieldName = theField.attr("name"), validObj = validatePlan[fieldName];
        if (validObj && validObj.defaultTip) {
            showDefaultTip(theField, validObj.defaultTip);
        }
    });
    // 当表单中的字段失去焦点时，则去验证该字段的值
    regFrm.delegate("input", "blur", function() {
        var theField = $(this), fieldName = theField.attr("name");
        valiFn(this, validatePlan[fieldName]);
    });
    regFrm.on("submit", function() {
        var isVali = function() {
            var flag = true, valiResult = isPassVali(regFrm, validatePlan);
            if (valiResult.isPass) {
                flag = true;
            } else {
                var fieldName;
                goVali(regFrm, validatePlan);
                for (var i = 0, l = valiResult.notPassFieldsName.length; i < l; i++) {
                    fieldName = valiResult.notPassFieldsName[i];
                    /*
                     * 由于同账户类型下有不同的字段，因此，在某个账户类型下只需要严重该
                     * 类型对应的字段即可，无需其他类型下的字段验证通过。例如，如果用户
                     * 选择的账户类型为“公司类型（company）”，则只需要验证该类型对应的
                     * 字段
                     */
                    if (accountType.filter(":checked").val() === "company") {
                        if (fieldName !== "name" && fieldName !== "idNum" && fieldName !== "mobile") {
                            flag = false;
                            break;
                        }
                    } else {
                        if (fieldName !== "companyName" && fieldName !== "telephone") {
                            flag = false;
                            break;
                        }
                    }
                }
            }
            return flag;
        };
        if (submitBtn.hasClass("com-btn-disable")) {
            return false;
        }
        showExplain(submitBtn, false);
        if (isVali()) {
            submitBtn.addClass("com-btn-disable").val("注册中...");
            $.post("jsp/reg.jsp", getFrmInfo(), function(data) {
                submitBtn.removeClass("com-btn-disable").val("      注    册      ");
                if (data.status !== "1") {
                    showExplain(submitBtn, true, "warn", data.message);
                } else {
                    showExplain(submitBtn, true, "success", "注册成功");
                    location.href = "reg-success.html";
                }
            }, "JSON");
        } else {
            showExplain(submitBtn, true, "warn", "请正确输入以上信息");
        }
        return false;
    });
});