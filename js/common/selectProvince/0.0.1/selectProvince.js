/*! gruntTest 2015-01-26 */
define("common/selectProvince/0.0.1/selectProvince",["$","base/createClass/1.0.1/createClass","base/pubSub/1.0.0/pubSub","components/toolTip/0.0.1/toolTip"],function(a){var b=a("$"),c=a("base/createClass/1.0.1/createClass"),d=a("base/pubSub/1.0.0/pubSub"),e=a("components/toolTip/0.0.1/toolTip"),f=['<form class="com-form" style="width:400px;padding:20px">','<div class="com-form-item" style="padding-left:80px">','<label class="com-label com-checkbox-group" style="width:70px;color:#56c1ff;text-align:left;top:2px;cursor:pointer;"><input type="checkbox" name="area" value="华东"> 华东</label>','<div class="com-checkbox-group">','<label><input type="checkbox" name="province" value="山东"> 山东</label>','<label><input type="checkbox" name="province" value="江苏"> 江苏</label>','<label><input type="checkbox" name="province" value="安徽"> 安徽</label>','<label><input type="checkbox" name="province" value="浙江"> 浙江</label>','<label><input type="checkbox" name="province" value="福建"> 福建</label>','<label><input type="checkbox" name="province" value="上海"> 上海</label>','<label><input type="checkbox" name="province" value="广东"> 广东</label>',"</div>","</div>",'<div class="com-form-item" style="padding-left:80px">','<label class="com-label com-checkbox-group" style="width:70px;color:#56c1ff;text-align:left;top:2px;cursor:pointer;"><input type="checkbox" name="area" value="华南"> 华南</label>','<div class="com-checkbox-group">','<label><input type="checkbox" name="province" value="广西"> 广西</label>','<label><input type="checkbox" name="province" value="海南"> 海南</label>','<label><input type="checkbox" name="province" value="湖北"> 湖北</label>','<label><input type="checkbox" name="province" value="湖南"> 湖南</label>','<label><input type="checkbox" name="province" value="河南"> 河南</label>','<label><input type="checkbox" name="province" value="江西"> 江西</label>','<label><input type="checkbox" name="province" value="北京"> 北京</label>','<label><input type="checkbox" name="province" value="天津"> 天津</label>',"</div>","</div>","</form>",'<a class="com-ico com-ico-16 com-ico-wrong" href="javascript:;" style="font-family:Dotum;right:10px;top:10px;font-weight:bold">x</a>'].join(""),g=c({superClass:d,init:function(a){var c,d,g,h=this;a=b.extend({},a),g=b(a.trigger).eq(0),c=new e({trigger:g.parent(),arrowPosition:7,theme:"white",tipText:f}),d=c.getAttr("tipObj").getAttr("tipEle"),h.setAttr("tipObj",c),h.setAttr("tipEle",d),d.delegate("input[type=checkbox]","click",function(){var a,c=b(this),d=!!c.attr("checked"),e=c.closest("div.com-form-item");"area"===c.attr("name")&&(a=e.find("input[name=province]"),d?a.attr("checked","checked"):a.removeAttr("checked")),h.on("select")}),d.delegate("a.com-ico-wrong","click",function(){h.hide(),h.on("close")})},methods:{show:function(){var a=this;return a.getAttr("tipObj").show(),a},hide:function(){var a=this;return a.getAttr("tipObj").hide(),a},getSelected:function(){var a=this,c=a.getAttr("tipEle"),d=[],e=c.find("input[name=province]:checked");return e.each(function(){var a=b(this);d.push(a.val())}),d}}});return g});