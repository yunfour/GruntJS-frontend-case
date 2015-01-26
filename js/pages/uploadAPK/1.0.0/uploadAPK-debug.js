define("pages/uploadAPK/1.0.0/template-debug", [], function(require) {
    var template = [ '<p class="upload-apk-progress-info">', "<span>$${fileName}</span>", "{@if !message}", '<span class="upload-apk-progress-percent">上传中 $${percent}%</span>', "{@/if}", "</p>", '<div class="com-progress {@if message} com-progress-grey {@/if}">', '<div class="com-progress-bd" style="width: ${percent}%;"></div>', "</div>", '<p class="upload-apk-progress-speed">', "{@if percent == 100}", '<span style="color:#4bc577">上传完成</span>', "{@else if speed}", "<span>$${uploaded}M/$${size}M $${speed}k/s</span>", "{@/if}", "{@if message}", '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #e52617;">$${message}</span>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" class="J-retryBtn">重试</a>', "{@/if}", "</p>" ].join("");
    return template;
});
;define("pages/uploadAPK/1.0.0/uploadAPK-debug", [ "$-debug", "gallery/upload/1.1.1/upload-debug", "gallery/juicer/0.6.5/juicer-debug", "common/tools/0.0.1/tools-debug", "components/tip/0.0.1/tip-debug", "components/progress/0.0.1/progress-debug", "./template-debug" ], function(require) {
    var $ = require("$-debug");
    var Upload = require("gallery/upload/1.1.1/upload-debug"), juicer = require("gallery/juicer/0.6.5/juicer-debug"), tools = require("common/tools/0.0.1/tools-debug"), Tip = require("components/tip/0.0.1/tip-debug"), Progress = require("components/progress/0.0.1/progress-debug");
    var template = require("./template-debug");
    var uploadTipObj, uploadTipObjTimer;
    var progressEle = $("#J-progress"), progressBd = progressEle.children("div.upload-apk-progress-bd"), progressObj = new Progress();
    var selectBtn = $("#J-selectBtn"), uploadBtn = $("#J-uploadBtn"), uploadFile = [];
    var uploader = new Upload({
        trigger: selectBtn,
        name: "screenshot",
        action: "./jsp/uploadAPK.jsp",
        multiple: false,
        data: {
            r: Math.random()
        },
        change: function(files) {
            if (!isAPKFile(files[0].name)) {
                showTip(true, selectBtn, "文件格式必须为 *.apk");
                return false;
            }
            uploadBtn.removeClass("com-btn-disable");
            uploadFile = files[0];
        },
        error: function(files) {
            progressObj.pause();
            uploader._uploaders[0].refreshInput();
            showProgress(true, "上传出错请重试");
            uploadBtn.removeClass("com-btn-disable");
        },
        success: function(response) {
            var result = $.parseJSON(response);
            uploader._uploaders[0].refreshInput();
            if (result.status === "1") {
                progressObj.finish();
            } else {
                progressObj.pause();
                showProgress(true, result.message);
                uploadBtn.removeClass("com-btn-disable");
            }
        }
    });
    var uploaderFrm = uploader._uploaders[0].form;
    // 显示进度条
    function showProgress(isError, message) {
        var percent = tools.decimalPlace(progressObj.getAttr("percent"), 2), cumulateTime = progressObj.getAttr("cumulateTime");
        var info = {
            fileName: uploadFile.name || "",
            size: tools.decimalPlace((uploadFile.size || .4 * 1024 * 1024) / (1024 * 1024), 2),
            percent: percent
        };
        if (isError) {
            info.message = message;
        }
        info.uploaded = tools.decimalPlace(info.size * percent / 100, 2);
        info.speed = tools.decimalPlace(info.uploaded * 1024 / (cumulateTime / 1e3), 2);
        progressBd.html(template.render(info));
    }
    // 验证文件名是否为APK格式
    function isAPKFile(fileName) {
        var isAPK = /\.(apk)$/i.test(fileName);
        return isAPK;
    }
    // 显示气泡提示
    function showTip(isShow, ele, tipText) {
        if (!uploadTipObj) {
            uploadTipObj = new Tip({
                theme: "red",
                arrowPosition: 7
            });
        }
        if (uploadTipObjTimer) {
            window.clearTimeout(uploadTipObjTimer);
        }
        if (isShow) {
            var offset = ele.offset();
            tipText = '<div style="width:175px">' + tipText + "</div>";
            uploadTipObj.setTipText(tipText).setPosition(offset.left + 59, offset.top - 2).show();
            uploadTipObjTimer = window.setTimeout(function() {
                uploadTipObj.hide();
            }, 3e3);
        } else {
            uploadTipObj.hide();
        }
    }
    template = juicer(template);
    progressObj.on("progress", function() {
        showProgress();
    });
    uploadBtn.on("click", function() {
        if (uploadBtn.hasClass("com-btn-disable")) {
            return false;
        }
        uploader.submit();
        progressObj.restart();
        selectBtn.hide();
        progressEle.show();
        uploaderFrm.hide();
        uploader.disable();
        uploadBtn.addClass("com-btn-disable");
    });
    progressEle.delegate("a.upload-apk-progress-reselection", "click", function() {
        progressObj.stop();
        progressEle.hide();
        selectBtn.show();
        uploaderFrm.show();
        uploader.enable();
        uploader._uploaders[0].refreshInput();
    });
    progressEle.delegate("a.J-retryBtn", "click", function() {
        uploadBtn.click();
    });
});