/*! gruntTest 2014-08-05 */
define("common/addTestDeviceDialog/0.0.1/addTestDeviceDialog-debug",["$-debug","common/dialog/0.0.1/dialog-debug"],function(a){function b(a){function b(a,b,c){a?(i.removeClass().addClass("com-form-explain com-form-explain-block com-form-explain-hasIco com-form-explain-"+b),i.find("i.com-ico").removeClass().addClass("com-ico com-form-ico com-form-ico-"+b),i.find("span").html(c),i.show()):i.hide()}var f,g=c(e),h=g.find("input[name=imeicode]"),i=g.find("div.com-form-explain"),j=new d({titleText:"添加测试设备",content:g});g.on("click","a.J-confirmBtn",function(){return"true"===g.attr("ajaxlock")?!1:(b(!1),""===c.trim(h.val())?(b(!0,"err","请输入imei码！"),!1):(b(!0,"loading","正在添加设备..."),g.attr("ajaxlock","true"),void(f=c.getJSON("jsp/addTestDevice.jsp",{imeicode:encodeURIComponent(c.trim(h.val())),r:Math.random()},function(c){g.attr("ajaxlock","false"),"1"===c.status?(b(!0,"success","测试设备添加成功！"),window.setTimeout(function(){j.hide(),"function"==typeof a&&a(c.data)},1e3)):b(!0,"warn",c.message)}))))}),g.on("click","a.J-cancelBtn",function(){j.hide()}),j.on("hide",function(){g.off(),f&&f.abort&&f.abort(),j.destroy(),j=null,g=null,h=null,i=null}),j.setSize(500,"auto"),j.show()}var c=a("$-debug"),d=a("common/dialog/0.0.1/dialog-debug"),e=['<div style="padding: 30px 0">','<div class="com-form-item" style="padding-left:110px">','<label class="com-label" style="width:100px">imei码：</label>','<input class="com-input" type="text" name="imeicode" value="" style="width:280px" />','<div class="com-form-explain com-form-explain-block com-form-explain-hasIco" style="display:none"><i class="com-ico com-form-ico"></i><span></span></div>',"</div>",'<div style="padding:25px 0 0;text-align:center;">','<a class="J-confirmBtn com-btn com-btn-blue com-btn-middling" href="javascript:;">&nbsp;&nbsp;&nbsp;&nbsp;确&nbsp;&nbsp;&nbsp;&nbsp;定&nbsp;&nbsp;&nbsp;&nbsp;</a>','<a class="J-cancelBtn com-btn com-btn-grey com-btn-middling" href="javascript:;" style="margin-left:17px">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;</a>',"</div>","</div>"].join("");return b}),define("common/addTestDeviceDialog/0.0.1/addTestDeviceDialog",["$","common/dialog/0.0.1/dialog"],function(a){function b(a){function b(a,b,c){a?(i.removeClass().addClass("com-form-explain com-form-explain-block com-form-explain-hasIco com-form-explain-"+b),i.find("i.com-ico").removeClass().addClass("com-ico com-form-ico com-form-ico-"+b),i.find("span").html(c),i.show()):i.hide()}var f,g=c(e),h=g.find("input[name=imeicode]"),i=g.find("div.com-form-explain"),j=new d({titleText:"添加测试设备",content:g});g.on("click","a.J-confirmBtn",function(){return"true"===g.attr("ajaxlock")?!1:(b(!1),""===c.trim(h.val())?(b(!0,"err","请输入imei码！"),!1):(b(!0,"loading","正在添加设备..."),g.attr("ajaxlock","true"),void(f=c.getJSON("jsp/addTestDevice.jsp",{imeicode:encodeURIComponent(c.trim(h.val())),r:Math.random()},function(c){g.attr("ajaxlock","false"),"1"===c.status?(b(!0,"success","测试设备添加成功！"),window.setTimeout(function(){j.hide(),"function"==typeof a&&a(c.data)},1e3)):b(!0,"warn",c.message)}))))}),g.on("click","a.J-cancelBtn",function(){j.hide()}),j.on("hide",function(){g.off(),f&&f.abort&&f.abort(),j.destroy(),j=null,g=null,h=null,i=null}),j.setSize(500,"auto"),j.show()}var c=a("$"),d=a("common/dialog/0.0.1/dialog"),e=['<div style="padding: 30px 0">','<div class="com-form-item" style="padding-left:110px">','<label class="com-label" style="width:100px">imei码：</label>','<input class="com-input" type="text" name="imeicode" value="" style="width:280px" />','<div class="com-form-explain com-form-explain-block com-form-explain-hasIco" style="display:none"><i class="com-ico com-form-ico"></i><span></span></div>',"</div>",'<div style="padding:25px 0 0;text-align:center;">','<a class="J-confirmBtn com-btn com-btn-blue com-btn-middling" href="javascript:;">&nbsp;&nbsp;&nbsp;&nbsp;确&nbsp;&nbsp;&nbsp;&nbsp;定&nbsp;&nbsp;&nbsp;&nbsp;</a>','<a class="J-cancelBtn com-btn com-btn-grey com-btn-middling" href="javascript:;" style="margin-left:17px">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;</a>',"</div>","</div>"].join("");return b});