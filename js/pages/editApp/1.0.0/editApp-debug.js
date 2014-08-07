define("pages/editApp/1.0.0/editApp-debug", [ "$-debug", "./uploadAppIco-debug", "gallery/upload/1.1.1/upload-debug", "components/tip/0.0.1/tip-debug", "./setFrm-debug", "common/validateForm/0.0.1/validateForm-debug" ], function(require) {
    var $ = require("$-debug");
    require("./uploadAppIco-debug");
    require("./setFrm-debug");
});

define("pages/editApp/1.0.0/setFrm-debug", [ "$-debug", "common/validateForm/0.0.1/validateForm-debug" ], function(require) {
    var $ = require("$-debug");
    var validateFrm = require("common/validateForm/0.0.1/validateForm-debug");
    var theFrm = $("#J-submitAppFrm"), imgUrl = $("#imgUrl"), appName = $("#appName"), kitName = $("#kitName"), appType = $("#appType"), submitBtn = theFrm.find("input[type=submit]");
    var validatePlan = {
        imgUrl: {
            required: true,
            emptyTip: "请上传图标！"
        },
        appName: {
            required: true,
            emptyTip: "请输入应用名称！"
        },
        //'kitName': {
        //    required: true,
        //    emptyTip: '请输入包名称！'
        //},
        appType: {
            patterns: [ {
                pattern: function(val) {
                    var result = val !== "null";
                    return result;
                },
                noMatchTip: "请选择应用类型"
            } ]
        }
    };
    // 采集表单数据
    function getFrmInfo() {
        return {
            imgUrl: encodeURIComponent($.trim(imgUrl.val())),
            appName: encodeURIComponent($.trim(appName.val())),
            kitName: encodeURIComponent($.trim(kitName.val())),
            appType: encodeURIComponent($.trim(appType.val()))
        };
    }
    // 当表单中的字段失去焦点时，则去验证该字段的值
    theFrm.delegate("input", "blur", function() {
        var theField = $(this), fieldName = theField.attr("name");
        validateFrm.valiFn(this, validatePlan[fieldName]);
    });
    // 当表单中的字段失去焦点时，则去验证该字段的值
    appType.on("change", function() {
        var theField = appType, fieldName = theField.attr("name");
        validateFrm.valiFn(this, validatePlan[fieldName]);
    });
    // 监听表单提交
    theFrm.on("submit", function() {
        var isVali = function() {
            var flag = true, valiResult = validateFrm.isPassVali(theFrm, validatePlan);
            if (!valiResult.isPass) {
                // 如果表单验证没有通过，则去主动验证一次
                validateFrm.goVali(theFrm, validatePlan);
                valiResult = validateFrm.isPassVali(theFrm, validatePlan);
            }
            return valiResult.isPass;
        };
        if (submitBtn.hasClass("com-btn-disable")) {
            return false;
        }
        validateFrm.showExplain(submitBtn, false);
        if (isVali()) {
            submitBtn.addClass("com-btn-disable").val("保存中...");
            $.post("jsp/submitApp.jsp", getFrmInfo(), function(data) {
                submitBtn.removeClass("com-btn-disable").val("修改");
                if (data.status !== "1") {
                    validateFrm.showExplain(submitBtn, true, "warn", data.message);
                } else {
                    validateFrm.showExplain(submitBtn, true, "success", "修改成功");
                    location.href = "dev-submit-app-success.html";
                }
            }, "JSON");
        }
        return false;
    });
});

define("pages/editApp/1.0.0/uploadAppIco-debug", [ "$-debug", "gallery/upload/1.1.1/upload-debug", "components/tip/0.0.1/tip-debug" ], function(require) {
    var $ = require("$-debug"), Upload = require("gallery/upload/1.1.1/upload-debug");
    var Tip = require("components/tip/0.0.1/tip-debug");
    var uploadIcoBtn = $("#J-uploadIcoBtn"), selectIcoBtn = $("#J-selectIcoBtn"), uploadExplain = $("#J-uploadExplain");
    var imgUrl = $("#imgUrl");
    var selectedFiles = [];
    var uploader = new Upload({
        trigger: selectIcoBtn,
        name: "appImg",
        action: "./jsp/uplaodAppPic.jsp",
        accept: "image/*",
        multiple: false,
        data: {},
        change: function(files) {
            showUploadTip(selectIcoBtn, false);
            selectedFiles = [];
            imgUrl.val("");
            for (var i = 0, l = files.length, theFile; i < l; i++) {
                theFile = files[i];
                if (!isImgType(files[i].name)) {
                    // 选择文件的格式不符合
                    showUploadTip(selectIcoBtn, true, "请选择格式为JPG,PNG,GIF的文件");
                    return false;
                }
                if (theFile.size && theFile.size > 500 * 1e3) {
                    // 选择文件的格式不符合
                    showUploadTip(selectIcoBtn, true, "文件大小不能超过500k");
                    return false;
                }
            }
            selectedFiles = files;
        },
        error: function(files) {
            uploadIcoBtn.removeClass("com-btn-disable");
            showUploadExplain(true, "warn", "上传出错，请重试");
        },
        success: function(response) {
            var result = $.parseJSON(response);
            uploadIcoBtn.removeClass("com-btn-disable");
            if (result.status === "1") {
                showUploadExplain(true, "success", "上传成功");
                imgUrl.val(result.imgUrl);
                selectIcoBtn.html('<img src="' + result.imgUrl + '" width="125" height="125" style="border-radius: 5px;" />');
            } else {
                showUploadExplain(true, "warn", result.message);
            }
        },
        progress: function(event, position, total, percent, files) {}
    });
    var uploadTipObj;
    // 判断文件名是否为图片格式的文件名
    function isImgType(fileName) {
        var isImg = /\.(jpg|jpeg|gif|png)$/i.test(fileName);
        return isImg;
    }
    // 显示气泡提示
    function showUploadTip(ele, isShow, tipText) {
        if (!uploadTipObj) {
            uploadTipObj = new Tip({
                theme: "red",
                arrowPosition: 7
            });
        }
        if (isShow) {
            var offset = ele.offset();
            tipText = '<div style="width:175px">' + tipText + "</div>";
            uploadTipObj.setTipText(tipText).setPosition(offset.left + 59, offset.top - 2).show();
        } else {
            uploadTipObj.hide();
        }
    }
    // 显示上传按钮旁边的提示
    function showUploadExplain(isShow, type, explainText) {
        var icoEle = uploadExplain.find("i.com-form-ico"), tipEle = uploadExplain.find("span");
        var icoClass = "com-ico com-form-ico com-form-ico-";
        if (isShow) {
            uploadExplain.removeClass("com-form-explain-warn").show();
            icoClass = icoClass + type;
            icoEle.removeClass().addClass(icoClass);
            tipEle.html(explainText);
        } else {
            uploadExplain.hide();
        }
    }
    uploadIcoBtn.on("click", function() {
        if (uploadIcoBtn.hasClass("com-btn-disable")) {
            return false;
        }
        if (selectedFiles.length === 0) {
            // 未选择文件
            showUploadTip(uploadIcoBtn, true, "请选择图标文件");
            return false;
        }
        uploadIcoBtn.addClass("com-btn-disable");
        uploader.submit();
        showUploadExplain(true, "loading", "正在上传中...");
        selectedFiles = [];
    });
});
