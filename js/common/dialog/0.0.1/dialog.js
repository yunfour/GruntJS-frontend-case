/*! gruntTest 2014-08-05 */
define("common/dialog/0.0.1/dialog-debug",["$-debug","base/createClass/1.0.2/createClass-debug","components/widget/0.0.1/widget-debug","components/dialog/1.0.1/dialog-debug"],function(a){function b(a){var c,d,e=b._dialogObj;e||(e=new h({mask:!0,titleText:"网页信息",content:['<p class="J-alterTipText" style="padding:15px 0 30px;margin:0;font-size:14px;color:#666;line-height:1.5;text-align:center;"></p>','<div style="padding:15px 0;text-align:center;font-size:13px;">','<a class="J-confirmBtn com-btn com-btn-blue com-btn-middling" href="javascript:;">&nbsp;&nbsp;&nbsp;&nbsp;确&nbsp;&nbsp;&nbsp;&nbsp;定&nbsp;&nbsp;&nbsp;&nbsp;</a>',"</div>"].join("")}),c=e.getAttr("widgetEle"),b._dialogObj=e,c.on("click","a.J-confirmBtn",function(){e.hide()})),d=e.getAttr("dialogBdEle"),d.find("p.J-alterTipText").html(a),e.show()}function c(a,b){var d,e,f=c._dialogObj;f||(f=new h({mask:!0,titleText:"确认信息",content:['<p class="J-alterTipText" style="padding:15px 0 30px;margin:0;font-size:14px;color:#666;line-height:1.5;text-align:center;"></p>','<div style="padding:15px 0;text-align:center;font-size:13px;">','<a class="J-confirmBtn com-btn com-btn-blue com-btn-middling" href="javascript:;">&nbsp;&nbsp;&nbsp;&nbsp;确&nbsp;&nbsp;&nbsp;&nbsp;定&nbsp;&nbsp;&nbsp;&nbsp;</a>','<a class="J-cancelBtn com-btn com-btn-grey com-btn-middling" href="javascript:;" style="margin-left:17px">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;</a>',"</div>"].join("")}),d=f.getAttr("widgetEle"),f._dialogObj=f,d.on("click","a.J-confirmBtn",function(){f.hide(),"function"==typeof b&&b(!0)}),d.on("click","a.J-cancelBtn",function(){f.hide(),"function"==typeof b&&b(!1)}),d.on("click","a.com-dialog-close",function(){"function"==typeof b&&b(!1)})),e=f.getAttr("dialogBdEle"),e.find("p.J-alterTipText").html(a),f.show()}var d=a("$-debug"),e=a("base/createClass/1.0.2/createClass-debug"),f=(a("components/widget/0.0.1/widget-debug"),a("components/dialog/1.0.1/dialog-debug")),g=['<div class="com-dialog">','<h4 class="com-dialog-title"></h4>','<div class="com-dialog-bd"></div>','<a class="com-ico com-ico-close com-dialog-close" href="javascript:;" title="点击关闭窗口"></a>',"</div>"].join(""),h=e({superClass:f,attrs:{template:g},init:function(a){var b=this;a=d.extend({titleText:"对话框",mask:!0},a),b.render(),b.setSize(400,"auto").setTitle(a.titleText),a.content&&b.append(a.content),b.setAttr(a)},methods:{bindUI:function(){var a=this,b=a.getAttr("template"),c=a.getAttr("widgetEle");a.superClass.prototype.bindUI.apply(a),c.on("click","a.com-dialog-close",function(){a.hide()}),a.on("render",function(){c.html(b),c.css({background:"none"})})},setTitle:function(a){var b=this,c=b.getAttr("widgetEle"),d=b.getAttr("titleEle");return a=a||b.getAttr("titleText"),d||(d=c.find(".com-dialog-title"),b.setAttr(d)),b.setAttr("titleText",a),d.html(a),b},append:function(a){var b=this,c=b.getAttr("widgetEle"),d=b.getAttr("dialogBdEle");return d||(d=c.find("div.com-dialog-bd"),b.setAttr("dialogBdEle",d)),d.append(a),b}}});return h.alert=b,h.confirm=c,h}),define("common/dialog/0.0.1/dialog",["$","base/createClass/1.0.2/createClass","components/widget/0.0.1/widget","components/dialog/1.0.1/dialog"],function(a){function b(a){var c,d,e=b._dialogObj;e||(e=new h({mask:!0,titleText:"网页信息",content:['<p class="J-alterTipText" style="padding:15px 0 30px;margin:0;font-size:14px;color:#666;line-height:1.5;text-align:center;"></p>','<div style="padding:15px 0;text-align:center;font-size:13px;">','<a class="J-confirmBtn com-btn com-btn-blue com-btn-middling" href="javascript:;">&nbsp;&nbsp;&nbsp;&nbsp;确&nbsp;&nbsp;&nbsp;&nbsp;定&nbsp;&nbsp;&nbsp;&nbsp;</a>',"</div>"].join("")}),c=e.getAttr("widgetEle"),b._dialogObj=e,c.on("click","a.J-confirmBtn",function(){e.hide()})),d=e.getAttr("dialogBdEle"),d.find("p.J-alterTipText").html(a),e.show()}function c(a,b){var d,e,f=c._dialogObj;f||(f=new h({mask:!0,titleText:"确认信息",content:['<p class="J-alterTipText" style="padding:15px 0 30px;margin:0;font-size:14px;color:#666;line-height:1.5;text-align:center;"></p>','<div style="padding:15px 0;text-align:center;font-size:13px;">','<a class="J-confirmBtn com-btn com-btn-blue com-btn-middling" href="javascript:;">&nbsp;&nbsp;&nbsp;&nbsp;确&nbsp;&nbsp;&nbsp;&nbsp;定&nbsp;&nbsp;&nbsp;&nbsp;</a>','<a class="J-cancelBtn com-btn com-btn-grey com-btn-middling" href="javascript:;" style="margin-left:17px">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;</a>',"</div>"].join("")}),d=f.getAttr("widgetEle"),f._dialogObj=f,d.on("click","a.J-confirmBtn",function(){f.hide(),"function"==typeof b&&b(!0)}),d.on("click","a.J-cancelBtn",function(){f.hide(),"function"==typeof b&&b(!1)}),d.on("click","a.com-dialog-close",function(){"function"==typeof b&&b(!1)})),e=f.getAttr("dialogBdEle"),e.find("p.J-alterTipText").html(a),f.show()}var d=a("$"),e=a("base/createClass/1.0.2/createClass"),f=(a("components/widget/0.0.1/widget"),a("components/dialog/1.0.1/dialog")),g=['<div class="com-dialog">','<h4 class="com-dialog-title"></h4>','<div class="com-dialog-bd"></div>','<a class="com-ico com-ico-close com-dialog-close" href="javascript:;" title="点击关闭窗口"></a>',"</div>"].join(""),h=e({superClass:f,attrs:{template:g},init:function(a){var b=this;a=d.extend({titleText:"对话框",mask:!0},a),b.render(),b.setSize(400,"auto").setTitle(a.titleText),a.content&&b.append(a.content),b.setAttr(a)},methods:{bindUI:function(){var a=this,b=a.getAttr("template"),c=a.getAttr("widgetEle");a.superClass.prototype.bindUI.apply(a),c.on("click","a.com-dialog-close",function(){a.hide()}),a.on("render",function(){c.html(b),c.css({background:"none"})})},setTitle:function(a){var b=this,c=b.getAttr("widgetEle"),d=b.getAttr("titleEle");return a=a||b.getAttr("titleText"),d||(d=c.find(".com-dialog-title"),b.setAttr(d)),b.setAttr("titleText",a),d.html(a),b},append:function(a){var b=this,c=b.getAttr("widgetEle"),d=b.getAttr("dialogBdEle");return d||(d=c.find("div.com-dialog-bd"),b.setAttr("dialogBdEle",d)),d.append(a),b}}});return h.alert=b,h.confirm=c,h});