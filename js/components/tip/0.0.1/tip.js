/*! gruntTest 2014-09-19 */
define("components/tip/0.0.1/tip",["$","base/createClass/1.0.2/createClass","base/pubSub/1.0.0/pubSub"],function(a){seajs.importStyle(['.sea-tip{ padding: 5px 10px; border-radius: 5px; line-height: 1.7; background: #000; color: #fff; font-family: "microsoft yahei", "微软雅黑"; overflow: visible; position: absolute; z-index: 10010;}',".sea-tip-content{ height: auto;}",'.sea-tip-pointer{ display: block; height: 12px; width: 12px; line-height: 12px; color: #000; font-style: normal; font-family: "宋体"; font-size: 12px; position: absolute;}',".sea-tip-pointer-1{ left: 70%; top: -6px; margin-left: -6px;}",".sea-tip-pointer-2{ top: 30%; right: -6px; margin-top: -6px;}",".sea-tip-pointer-3{ top: 50%; right: -6px; margin-top: -6px;}",".sea-tip-pointer-4{ top: 70%; right: -6px; margin-top: -6px;}",".sea-tip-pointer-5{ left: 70%; bottom: -7px; margin-left: -6px;}",".sea-tip-pointer-6{ left: 50%; bottom: -7px; margin-left: -6px;}",".sea-tip-pointer-7{ left: 30%; bottom: -7px; margin-left: -6px;}",".sea-tip-pointer-8{ top: 70%; left: -6px; margin-top: -6px;}",".sea-tip-pointer-9{ top: 50%; left: -6px; margin-top: -6px;}",".sea-tip-pointer-10{ top: 30%; left: -6px; margin-top: -6px;}",".sea-tip-pointer-11{ left: 30%; top: -6px; margin-left: -6px;}",".sea-tip-pointer-12{ left: 50%; top: -6px; margin-left: -6px;}",".sea-tip-theme-red{ background: #f28c77; color: #fff;}",".sea-tip-theme-red .sea-tip-pointer{ color: #f28c77;}",".sea-tip-theme-blue{ background: #71c6f7; color: #fff;}",".sea-tip-theme-blue .sea-tip-pointer{ color: #71c6f7;}",".sea-tip-theme-green{ background: #4bc577; color: #fff;}",".sea-tip-theme-green .sea-tip-pointer{ color: #4bc577;}",".sea-tip-theme-white{ background: #eee; color: #333;}",".sea-tip-theme-white .sea-tip-pointer{ color: #eee;}"].join(""));var b=a("$"),c=a("base/createClass/1.0.2/createClass"),d=(a("base/pubSub/1.0.0/pubSub"),c({init:function(a){var c=a||{},d=this,e=['<div class="sea-tip sea-tip-theme-white">','<div class="sea-tip-content"></div>','<i class="sea-tip-pointer">◆</i>',"</div>"].join(""),f=b(e),g=f.children("div.sea-tip-content"),h=f.children("i.sea-tip-pointer"),i=c.theme||"",j=c.tipText||"",k=c.arrowPosition||10;d.setAttr({template:e,theme:i,tipText:j,arrowPosition:k,tipEle:f,contentEle:g,arrowEle:h}),d.setTipText(j).setTheme(i).setArrowPosition(k),f.appendTo(document.body).hide()},methods:{show:function(){var a=this,b=a.getAttr("tipEle");return b.show(),a},hide:function(){var a=this,b=a.getAttr("tipEle");return b.hide(),a},setArrowPosition:function(a){var b=this,c=b.getAttr("arrowEle"),d="sea-tip-pointer-";return a=parseInt(a,10),(1>a||a>12)&&(a=11),d+=a,c.removeClass().addClass("sea-tip-pointer "+d),b.setAttr("arrowPosition",a),b},setTheme:function(a){var b=this,c=b.getAttr("tipEle"),d=(b.getAttr("theme"),"");return""!==a&&(d="sea-tip-theme-"+a),c.removeClass().addClass("sea-tip "+d),b.setAttr("theme",a),b},setTipText:function(a){var b=this,c=(b.getAttr("tipEle"),b.getAttr("contentEle"));return c.html(a),b.setAttr("tipText",a),b},setPosition:function(a,b){var c,d,e=this,f=e.getAttr("tipEle"),g=e.getAttr("arrowEle"),h=e.getAttr("arrowPosition"),i="block"===f.css("display");switch(i||f.css("display","block"),c=f.offset(),d=g.offset(),a=parseInt(a,10)||c.left,b=parseInt(b,10)||c.top,a-=d.left-c.left,b-=d.top-c.top,h){case 2:case 3:case 4:a-=12,b-=6;break;case 5:case 6:case 7:a-=6,b-=12;break;case 8:case 9:case 10:b-=6;break;case 1:case 11:case 12:a-=6}return f.css({left:a,top:b}),i||e.hide(),e}}}));return d});