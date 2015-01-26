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