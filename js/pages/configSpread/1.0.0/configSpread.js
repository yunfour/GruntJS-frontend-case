define("pages/configSpread/1.0.0/configSpread", [ "$", "./uploadScreenshot", "gallery/upload/1.1.1/upload", "components/tip/0.0.1/tip", "components/progress/0.0.1/progress", "common/tools/0.0.1/tools", "./setDeadline", "components/tab/1.0.1/tab", "gallery/jquery-ui/1.9.2/jquery-ui-debug", "./setFrm", "common/validateForm/0.0.1/validateForm" ], function(require) {
    var $ = require("$");
    require("./uploadScreenshot");
    require("./setDeadline");
    require("./setFrm");
});

// 设置“推广截止点”切换效果
define("pages/configSpread/1.0.0/setDeadline", [ "$", "components/tab/1.0.1/tab", "gallery/jquery-ui/1.9.2/jquery-ui-debug" ], function(require) {
    var $ = require("$");
    var Tab = require("components/tab/1.0.1/tab");
    var theFrm = $("#J-configSpreadFrm"), deadline = theFrm.find("input[name=deadline]"), deadlineAttach = $("#J-deadlineAttach"), deadlineValue = $("#deadlineValue"), deadlineValueIco = deadlineAttach.find("label.com-ico-canlendar");
    var tabObj = new Tab({
        tabItems: deadline,
        selectedClass: ""
    });
    require("gallery/jquery-ui/1.9.2/jquery-ui-debug")($);
    tabObj.on("change", function() {
        var index = tabObj.getAttr("index");
        deadlineAttach.show();
        deadlineValue.val("");
        deadlineValueIco.hide();
        if (index === 0) {
            deadlineValueIco.show();
            deadlineValue.datepicker({
                dateFormat: "yy-mm-dd"
            });
        } else {
            deadlineValue.datepicker("destroy");
        }
    });
});

// 设置表单的验证、提交切换效果
define("pages/configSpread/1.0.0/setFrm", [ "$", "components/tab/1.0.1/tab", "common/validateForm/0.0.1/validateForm" ], function(require) {
    var $ = require("$");
    var Tab = require("components/tab/1.0.1/tab"), validateFrm = require("common/validateForm/0.0.1/validateForm");
    var theFrm = $("#J-configSpreadFrm"), appLabels = theFrm.find("input.J-appLabel"), appIntro = $("#appIntro"), spreadPrice = $("#spreadPrice"), deadlineRadios = theFrm.find("input[name=deadline]"), deadlineValue = $("#deadlineValue"), targets = theFrm.find("input[name=targets]"), submitBtn = theFrm.find("input[type=button]");
    var validatePlan = {
        appLabel_1: {
            isShowSuccessTip: false,
            patterns: [ {
                pattern: function(val) {
                    var result = false;
                    for (var i = 0, l = appLabels.size(); i < l; i++) {
                        if ($.trim(appLabels.eq(i).val()) !== "") {
                            result = true;
                            break;
                        }
                    }
                    return result;
                },
                noMatchTip: "请输入应用标签"
            } ]
        },
        appIntro: {
            isShowSuccessTip: false,
            patterns: [ {
                pattern: function(val) {
                    var result = val.length >= 20 && val.length <= 500;
                    return result;
                },
                noMatchTip: "应用简介为20-500个中文字符！"
            } ]
        },
        screenshot: {
            isShowSuccessTip: false,
            required: true,
            emptyTip: "请上传应用截图"
        },
        spreadPrice: {
            isShowSuccessTip: false,
            required: true,
            emptyTip: "请输入推广价格",
            patterns: [ {
                pattern: function(val) {
                    var valNum = Number(val), result = true;
                    if (isNaN(valNum)) {
                        result = false;
                    } else if (valNum <= 0) {
                        result = false;
                    }
                    return result;
                },
                noMatchTip: "推广价格必须为大于0数值！"
            } ]
        },
        deadline: {
            isShowSuccessTip: false,
            required: true,
            emptyTip: "请选择推广截止方式"
        },
        deadlineValue: {
            isShowSuccessTip: false,
            required: true,
            emptyTip: "请选输入内容",
            patterns: [ {
                pattern: function(val) {
                    var result = true, deadlineRadioChecked = deadlineRadios.filter(":checked"), valNum = Number(val);
                    if (deadlineRadioChecked.val() === "date") {} else if (deadlineRadioChecked.val() === "total") {
                        if (valNum <= 0 || isNaN(valNum)) {
                            result = false;
                        }
                    }
                    return result;
                },
                noMatchTip: "格式不正确"
            } ]
        },
        targets: {
            isShowSuccessTip: false,
            required: true,
            emptyTip: "请选择用户激活指标"
        }
    };
    function getFrmInfo() {
        var info = {};
        var appLabelsArr = [];
        appLabels.each(function(i) {
            var label = appLabels.eq(i), val = $.trim(label.val());
            if (val !== "") {
                appLabelsArr.push(encodeURIComponent(val));
            }
        });
        info.appLabel = appLabelsArr.join(";");
        info.appIntro = encodeURIComponent($.trim(appIntro.val()));
        info.spreadPrice = encodeURIComponent($.trim(spreadPrice.val()));
        info.deadline = deadlineRadios.filter(":checked").val();
        info.deadlineVal = deadlineValue.val();
        info.targets = targets.filter(":checked").val();
        return {};
    }
    deadlineRadios.on("click", function() {
        var val = $(this).val();
        validateFrm.valiFn(deadlineRadios, validatePlan.deadline);
        if (val === "date") {
            validateFrm.valiFn(deadlineValue, validatePlan.deadlineValue);
        } else {
            validateFrm.valiFn(deadlineValue, validatePlan.deadlineValue);
        }
    });
    // 监听表单提交
    submitBtn.on("click", function() {
        function isVali() {
            var flag = true, valiResult = validateFrm.isPassVali(theFrm, validatePlan);
            if (!valiResult.isPass) {
                // 如果表单验证没有通过，则去主动验证一次
                validateFrm.goVali(theFrm, validatePlan);
                valiResult = validateFrm.isPassVali(theFrm, validatePlan);
            }
            return valiResult.isPass;
        }
        if (submitBtn.hasClass("com-btn-disable")) {
            return false;
        }
        validateFrm.showExplain(submitBtn, false);
        if (isVali()) {
            submitBtn.addClass("com-btn-disable").val("提交中...");
            $.post("jsp/submitConfigSpread.jsp", getFrmInfo(), function(data) {
                submitBtn.removeClass("com-btn-disable").val("提交");
                if (data.status !== "1") {
                    validateFrm.showExplain(submitBtn, true, "warn", data.message);
                } else {
                    validateFrm.showExplain(submitBtn, true, "success", "提交成功");
                }
            }, "JSON");
        } else {
            validateFrm.showExplain(submitBtn, true, "warn", "请按要求完善以上信息");
        }
        return false;
    });
});

// 设置上传应用截图效果
define("pages/configSpread/1.0.0/uploadScreenshot", [ "$", "gallery/upload/1.1.1/upload", "components/tip/0.0.1/tip", "components/progress/0.0.1/progress", "common/tools/0.0.1/tools" ], function(require) {
    var $ = require("$");
    var Upload = require("gallery/upload/1.1.1/upload"), Tip = require("components/tip/0.0.1/tip"), Progress = require("components/progress/0.0.1/progress"), tools = require("common/tools/0.0.1/tools");
    var uploadTipObj, uploadTipObjTimer;
    var screenshotLst = $("#J-screenshotLst"), screenshotItms = screenshotLst.children("li"), screenshotField = $("#screenshot");
    // 验证选中的图片是否合法
    function validateImg(files) {
        var result = {
            isPass: true
        };
        for (var i = 0, l = files.length, theFile; i < l; i++) {
            theFile = files[i];
            if (!tools.isImgType(files[i].name)) {
                // 选择文件的格式不符合
                result.isPass = false;
                result.message = "请选择格式为JPG,PNG,GIF的文件";
                return result;
            }
            if (theFile.size && theFile.size > 100 * 1e3) {
                // 选择文件的格式不符合
                result.isPass = false;
                result.message = "文件大小不能超过500k";
                return result;
            }
        }
        return result;
    }
    // 显示气泡提示
    function showTip(isShow, screenshotItm, tipText) {
        if (!uploadTipObj) {
            uploadTipObj = new Tip({
                theme: "red",
                arrowPosition: 6
            });
        }
        if (uploadTipObjTimer) {
            window.clearTimeout(uploadTipObjTimer);
        }
        if (isShow) {
            var offset = screenshotItm.offset();
            //tipText = '<div style="width:175px">' + tipText + '</div>';
            uploadTipObj.setTipText(tipText).setPosition(offset.left + 47, offset.top - 2).show();
            uploadTipObjTimer = window.setTimeout(function() {
                uploadTipObj.hide();
            }, 3e3);
        } else {
            uploadTipObj.hide();
        }
    }
    // 展示上传中的效果
    function showUploading(screenshotItm, percent) {
        var loadingLabel = screenshotItm.find("div.uploading");
        if (loadingLabel.size() === 0) {
            loadingLabel = $('<div class="uploading"></div>').appendTo(screenshotItm);
        }
        loadingLabel.html("上传中 " + percent + "%");
        loadingLabel.show();
    }
    // 上传成功
    function uploadSuccess(screenshotItm, imgUrl) {
        var loadingLabel = screenshotItm.find("div.uploading"), imgPanel = screenshotItm.find("div.img-panel");
        loadingLabel.hide();
        if (imgPanel.size() === 0) {
            imgPanel = $('<div class="img-panel"><img src="' + imgUrl + '" alt="应用截图"><a href="javascript:;" class="img-del-btn">x</a></div>');
            loadingLabel.before(imgPanel);
        } else {
            imgPanel.find("img").attr("src", imgUrl);
        }
        screenshotItm.removeClass("bordered");
        imgPanel.show();
    }
    screenshotItms.each(function(i) {
        var screenshotItm = $(this), progressObj = new Progress();
        var uploader = new Upload({
            trigger: screenshotItm,
            name: "screenshot",
            action: "./jsp/uploadScreenshot.jsp",
            accept: "image/*",
            multiple: false,
            data: {
                index: i,
                r: Math.random()
            },
            change: function(files) {
                var validateResult = validateImg(files);
                if (validateResult.isPass) {
                    uploader.submit();
                    uploaderFrm.hide();
                    progressObj.start();
                } else {
                    showTip(true, screenshotItm, validateResult.message);
                    return false;
                }
            },
            error: function(files) {
                // 刷新input
                uploader._uploaders[0].refreshInput();
                progressObj.stop();
                showTip(true, screenshotItm, "上传文件出错，请重试");
                screenshotItm.data("uploaderFrm").show();
            },
            success: function(response) {
                var result = $.parseJSON(response), screenshotImgArr = screenshotField.val().split(";");
                uploader._uploaders[0].refreshInput();
                progressObj.finish().stop();
                if (result.status === "1") {
                    uploadSuccess(screenshotItm, result.data);
                    screenshotImgArr[i] = encodeURI(result.data);
                    screenshotField.val(screenshotImgArr.join(";"));
                } else {
                    showTip(true, screenshotItm, "上传文件出错，请重试");
                    screenshotItm.data("uploaderFrm").show();
                }
            },
            progress: function(event, position, total, percent, files) {}
        });
        var uploaderFrm = uploader._uploaders[0].form;
        progressObj.on("progress", function() {
            var percent = parseInt(progressObj.getProgress(), 10);
            showUploading(screenshotItm, percent);
        }).on("finish", function() {
            screenshotItm.find("div.uploading").hide();
        }).on("stop", function() {
            screenshotItm.find("div.uploading").hide();
        });
        screenshotItm.data({
            uploader: uploader,
            uploaderFrm: uploaderFrm
        });
        if (screenshotItm.find("div.img-panel img").size()) {
            uploaderFrm.hide();
        }
    });
    screenshotLst.delegate("a.img-del-btn", "click", function() {
        var delImgBtn = $(this), screenshotItm = delImgBtn.closest("li"), imgPanel = screenshotItm.find("div.img-panel"), uploaderFrm = screenshotItm.data("uploaderFrm");
        screenshotItm.addClass("bordered");
        uploaderFrm.show();
        imgPanel.remove();
    });
});
