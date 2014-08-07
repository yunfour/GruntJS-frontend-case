define("pages/selfTest/1.0.0/selfTest-debug", [ "$-debug", "components/tab/1.0.1/tab-debug", "common/dialog/0.0.1/dialog-debug", "common/addTestDeviceDialog/0.0.1/addTestDeviceDialog-debug", "components/toolTip/0.0.3/toolTip-debug" ], function(require) {
    var $ = require("$-debug"), Tab = require("components/tab/1.0.1/tab-debug");
    Dialog = require("common/dialog/0.0.1/dialog-debug");
    addTestDeviceDialog = require("common/addTestDeviceDialog/0.0.1/addTestDeviceDialog-debug");
    var deviceLst = $("#J-deviceLst"), deviceLstBd = deviceLst.find("tbody"), addDeviceBtn = $("#J-addDeviceBtn");
    // 创建一条新的设备信息
    function createDeviceLine(data) {
        var deviceLine = [ '<tr data-keyid="' + data.keyId + '">', "<td>" + data.createTime + "</td>", "<td>" + data.device + "</td>", "<td>" + data.imei + "</td>", '<td><a class="J-del" href="javascript:;">删除</a></td>', "</tr>" ].join("");
        return $(deviceLine);
    }
    // 监听删除按钮单击事件
    deviceLst.on("click", "a.J-del", function() {
        var delBtn = $(this), line = delBtn.closest("tr"), keyid = line.attr("date-keyid");
        if (delBtn.attr("ajaxlock") === "true") {
            return;
        }
        Dialog.confirm("您确定删除该记录吗？", function(flag) {
            if (!flag) {
                return;
            }
            delBtn.attr("ajaxlock", "true").text("正在删除").css("color", "#999");
            $.getJSON("jsp/del-info.jsp", {
                keyid: keyid,
                r: Math.random()
            }, function(data) {
                delBtn.attr("ajaxlock", "false").text("删除").css("color", "#5fb3e3");
                if (data.status === "1") {
                    Dialog.alert("信息删除成功");
                    line.remove();
                } else {
                    Dialog.alert('信息删除失败！<br /><span style="color:#f00">' + (data.message || "") + "</span>");
                }
            });
        });
    });
    // 监听添加按钮的单击事件
    addDeviceBtn.on("click", function() {
        addTestDeviceDialog(function(data) {
            var newDeviceLine = createDeviceLine(data);
            deviceLstBd.prepend(newDeviceLine);
        });
    });
    // "应用测试流程"Tab切换
    var testFlowTab = $("#J-testFlowTab"), developerFlow = $("#J-developerFlow"), spreaderFlow = $("#J-spreaderFlow");
    new Tab({
        tabItems: testFlowTab.find("li a"),
        selectedClass: "active"
    }).on("change", function() {
        var index = this.getAttr("index");
        if (index === 0) {
            developerFlow.show();
            spreaderFlow.hide();
        } else {
            developerFlow.hide();
            spreaderFlow.show();
        }
    });
    var ToolTip = require("components/toolTip/0.0.3/toolTip-debug");
    var tip = new ToolTip({
        trigger: addDeviceBtn,
        tipText: "点击添加测试设备",
        arrowPosition: 6,
        theme: "red"
    }).render();
    window.setTimeout(function() {
        tip.setArrowPosition(12);
    }, 1e3);
    tip.temporaryShow(3e3);
});
