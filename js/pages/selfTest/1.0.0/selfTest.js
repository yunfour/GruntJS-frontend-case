/*! gruntTest 2015-01-26 */
define("pages/selfTest/1.0.0/selfTest",["$","components/tab/1.0.1/tab","common/dialog/0.0.1/dialog","common/addTestDeviceDialog/0.0.1/addTestDeviceDialog","components/toolTip/0.0.3/toolTip"],function(a){function b(a){var b=['<tr data-keyid="'+a.keyId+'">',"<td>"+a.createTime+"</td>","<td>"+a.device+"</td>","<td>"+a.imei+"</td>",'<td><a class="J-del" href="javascript:;">删除</a></td>',"</tr>"].join("");return c(b)}var c=a("$"),d=a("components/tab/1.0.1/tab");Dialog=a("common/dialog/0.0.1/dialog"),addTestDeviceDialog=a("common/addTestDeviceDialog/0.0.1/addTestDeviceDialog");var e=c("#J-deviceLst"),f=e.find("tbody"),g=c("#J-addDeviceBtn");e.on("click","a.J-del",function(){var a=c(this),b=a.closest("tr"),d=b.attr("date-keyid");"true"!==a.attr("ajaxlock")&&Dialog.confirm("您确定删除该记录吗？",function(e){e&&(a.attr("ajaxlock","true").text("正在删除").css("color","#999"),c.getJSON("jsp/del-info.jsp",{keyid:d,r:Math.random()},function(c){a.attr("ajaxlock","false").text("删除").css("color","#5fb3e3"),"1"===c.status?(Dialog.alert("信息删除成功"),b.remove()):Dialog.alert('信息删除失败！<br /><span style="color:#f00">'+(c.message||"")+"</span>")}))})}),g.on("click",function(){addTestDeviceDialog(function(a){var c=b(a);f.prepend(c)})});var h=c("#J-testFlowTab"),i=c("#J-developerFlow"),j=c("#J-spreaderFlow");new d({tabItems:h.find("li a"),selectedClass:"active"}).on("change",function(){var a=this.getAttr("index");0===a?(i.show(),j.hide()):(i.hide(),j.show())});var k=a("components/toolTip/0.0.3/toolTip"),l=new k({trigger:g,tipText:"点击添加测试设备",arrowPosition:6,theme:"red"}).render();window.setTimeout(function(){l.setArrowPosition(12)},1e3),l.temporaryShow(3e3)});