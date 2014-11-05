/*! gruntTest 2014-11-05 */
define("components/calendar/0.0.1/calendar",["$","base/createClass/1.0.2/createClass","base/dateFormat/0.0.1/dateFormat","components/widget/0.0.1/widget"],function(a){function b(){for(var a=this,b=a.getAttr("weekLstEle"),c=a.getAttr("weekNamesShort"),d=a.getAttr("weekNames"),e=[],f=0,g=c.length;g>f;f++)e.push('<li title="'+d[f]+'">'+c[f]+"</li>");b.html(e.join(""))}function c(){var a=this,b=(a.getAttr("widgetEle"),a.getAttr("trigger")),c=b.offset();a.position(c.left,c.top+b.outerHeight()+3)}function d(a){var b=this,c=b.getAttr("yearLstEle"),d=b.getAttr("viewDate")||new Date,e=[];a||(a=h(d).getFullYear()),e.push('<li><a href="javascript:;" data-year="pre" data-target="'+(a-10)+'">...</a></li>');for(var f=0,g=a;10>f;f++,g++)e.push('<li><a href="javascript:;" data-year="'+g+'">'+g+"</a></li>");e.push('<li><a href="javascript:;" data-year="next" data-target="'+g+'">...</a></li>'),c.html(e.join(""))}function e(){for(var a=this,b=a.getAttr("monthLstEle"),c=a.getAttr("monthNames"),d=[],e=0,f=c.length;f>e;e++)d.push('<li><a href="javascript:;" data-month="'+e+'">'+c[e]+"</a></li>");b.html(d.join(""))}function f(a){function b(a){var b,c,d=!1;return a=h(a),"function"==typeof v?d=v(a):v&&v.constructor===Array?(b=v[0],c=v[1],b&&(b=h(b)),c&&(c=h(c)),b&&c?a>=b&&c>=a&&(d=!0):b?a>=b&&(d=!0):c&&c>=a&&(d=!0)):d=!0,d}var c,e,f,g,j,k,l,m,n=this,o=n.getAttr("widgetEle"),q=o.find("ul.sea-calendar-day"),r=n.getAttr("yearEle"),s=n.getAttr("yearLstEle"),t=n.getAttr("monthEle"),u=n.getAttr("monthLstEle"),v=n.getAttr("range"),w=new Date,x=w.getDate(),y=n.getAttr("monthNames"),z=[];if(!a)throw new Error("方法: renderCalendar(theDate) 的参数 theDate 无效");a=h(a),c=a.getFullYear(),e=a.getMonth(),f=a.getDate(),g=p[e],i(c)&&1===e&&(g=29),j=h(c+"/"+(e+1)+"/1"),k=j.getDay();for(var A=0;k>A;A++)z.push("<li></li>");var B;for(A=1;g>=A;A++)l=c+"年"+(e+1)+"月"+A+"日",m=c+"/"+(e+1)+"/"+A,dayItemHtml='<li><a class="{dayItmClass}" href="javascript:;" title="'+l+'" data-date="'+m+'">'+A+"</a></li>",B="",b(h(m))?A===f?B="active":A===x&&(B="today"):B="disabled",dayItemHtml=dayItemHtml.replace("{dayItmClass}",B),z.push(dayItemHtml);z=z.join(""),q.html(z),u.find("a").removeClass("active").eq(e).addClass("active"),t.html(y[e]);var C=s.find("a");return 0===C.filter("a[data-year="+c+"]").size()&&(d.apply(n,[c]),C=s.find("a")),C.removeClass("active").filter("a[data-year="+c+"]").addClass("active"),r.html(c+"年"),n.setAttr("viewDate",a),n}function g(a){var b,c,d=!1;return a=k(a).eq(0),b=(a.prop("tagName")||"").toUpperCase(),c=(a.attr("type")||"").toUpperCase(),"TEXTAREA"===b?d=!0:"INPUT"===b&&"TEXT"===c&&(d=!0),d}function h(a){if("object"==typeof a&&a.constructor===Date)return a;if(!a)throw new Error("参数 theDate 无效");return"string"==typeof a?(a=a.replace(/\-/g,"/"),a=new Date(a)):a=new Date(a),a}function i(a){var b=!1;if(a=parseInt(a,10),isNaN(a))throw new Error("参数: year 必须为整数");return(a%4===0&&a%100!==0||a%400===0)&&(b=!0),b}function j(a,b){var c=(b-b%12)/12,d=a.getFullYear(),e=a.getMonth()+1,f=a.getDate();return b%=12,d+=c,e+=b,0>=e&&(d-=1,e+=12),e>12&&(d+=1,e-=12),resultDate=new Date(d+"/"+e+"/"+f+" "+a.getHours()+":"+a.getMinutes()+":"+a.getSeconds())}{var k=a("$"),l=a("base/createClass/1.0.2/createClass"),m=a("base/dateFormat/0.0.1/dateFormat"),n=a("components/widget/0.0.1/widget"),o=['<div class="sea-calendar" style="display:none;">','<h6 class="sea-calendar-title">','<a class="J-operate pre-year" href="javascript:;" title="上一年">&lt;&lt;</a>','<a class="J-operate pre-month" href="javascript:;" title="上一月">&lt;</a>','<a class="month" href="javascript:;"></a>','<a class="year" href="javascript:;"></a>','<a class="J-operate next-month" href="javascript:;" title="下一月">&gt;</a>','<a class="J-operate next-year" href="javascript:;" title="下一年">&gt;&gt;</a>',"</h6>",'<div class="sea-calendar-date">','<ul class="sea-calendar-week"></ul>','<ul class="sea-calendar-day clearfix"></ul>',"</div>",'<ul class="sea-calendar-years"></ul>','<ul class="sea-calendar-monthes"></ul>',"</div>"].join(""),p=[31,28,31,30,31,30,31,31,30,31,30,31],q=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],r=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],s=["日","一","二","三","四","五","六"],t=l({superClass:n,attrs:{template:o,monthNames:q,weekNames:r,weekNamesShort:s,format:"yyyy-MM-dd",hideOnSelect:!0,triggerType:"click"},init:function(a){var b=this,c={selectedDate:new Date};c=k.extend(c,a),c.trigger&&(c.trigger=k(c.trigger).eq(0)),c.theme&&b.setTheme(c.theme),c.viewDate=c.selectedDate=h(c.selectedDate),b.setAttr(c),b.render()},methods:{renderUI:function(){var a=this,c=a.getAttr("selectedDate"),d=k(a.getAttr("template")),g=d.find("div.sea-calendar-date"),h=d.find("ul.sea-calendar-week"),i=d.find("ul.sea-calendar-day"),j=d.find("h6.sea-calendar-title .year"),l=d.find("ul.sea-calendar-years"),m=d.find("h6.sea-calendar-title .month"),n=d.find("ul.sea-calendar-monthes");return a.setAttr({widgetEle:d,calendarBd:g,weekLstEle:h,dayLstEle:i,yearEle:j,yearLstEle:l,monthEle:m,monthLstEle:n}),b.apply(a),e.apply(a),f.apply(a,[c]),a},bindUI:function(){var a=this,b=a.getAttr("widgetEle"),e=a.getAttr("yearEle"),i=a.getAttr("monthEle"),l=a.getAttr("calendarBd"),m=a.getAttr("yearLstEle"),n=a.getAttr("monthLstEle"),o=a.getAttr("trigger"),p=a.getAttr("triggerType");b.on("mousedown",function(){return o&&g(o)&&o.focus(),!1}),b.on("click",function(){return!1}),e.on("click",function(){"block"===m.css("display")?(l.show(),n.hide(),m.hide()):(m.show(),n.hide(),l.hide())}),i.on("click",function(){"block"===n.css("display")?(l.show(),m.hide(),n.hide()):(n.show(),m.hide(),l.hide())}),b.on("click","ul.sea-calendar-years a",function(){var b,c=k(this),e=c.data("year"),g=h(a.getAttr("selectedDate")||new Date),i=g.getMonth()+1,j=g.getDate(),o=e+"/"+i+"/"+j;"next"===e||"pre"===e?(b=c.data("target"),d.apply(a,[b]),m.find("a").removeClass("active").filter("a[data-year="+g.getFullYear()+"]").addClass("active")):(o=h(o),f.apply(a,[o]),l.show(),m.hide(),n.hide(),a.trigger("selectYear",e))}),b.on("click","ul.sea-calendar-monthes a",function(){var b=k(this),c=b.data("month")+1,d=h(a.getAttr("selectedDate")||new Date),e=d.getFullYear(),g=d.getDate(),i=e+"/"+c+"/"+g;i=h(i),f.apply(a,[i]),l.show(),m.hide(),n.hide(),a.trigger("selectMonth",c)}),b.on("click","ul.sea-calendar-day a",function(){var b=k(this),c=a.getAttr("hideOnSelect"),d=h(b.data("date"));b.hasClass("disabled")||(a.selectDate(d),a.trigger("selectDate",d),c&&a.hide())}),b.on("click","h6.sea-calendar-title a.J-operate",function(){var b,c,d=k(this),e=h(a.getAttr("viewDate")||new Date),g=0;d.hasClass("pre-year")?(g=-12,c="selectPrevYear"):d.hasClass("pre-month")?(g=-1,c="selectPrevMonth"):d.hasClass("next-month")?(g=1,c="selectNextMonth"):d.hasClass("next-year")&&(g=12,c="selectNextYear"),b=j(e,g),f.apply(a,[b]),a.trigger(c)}),o&&(k(document.body).on("click",function(b){b.srcElement!==o[0]&&a.hide()}),o.on(p,function(){var d=a.getAttr("selectedDate");"none"===b.css("display")&&(a.show(),f.apply(a,[d])),c.apply(a)}),g(o)&&o.on("blur",function(){a.hide()}),a.bind("selectDate",function(){a.output(o)})),a.bind("selectDate",function(){var b=a.getAttr("output");a.output(b)})},selectDate:function(a){var b=this;return a=h(a),f.apply(b,[a]),b.setAttr("selectedDate",a),b},show:function(){var a=this,b=a.getAttr("trigger"),d=a.getAttr("widgetEle");return b&&c.apply(a),d.show(),a.trigger("show"),a},hide:function(){var a=this,b=a.getAttr("widgetEle");return b.hide(),a.trigger("hide"),a},setTheme:function(a){var b=this,c=b.getAttr("widgetEle");return c.removeClass().addClass("sea-calendar sea-calendar-theme-"+a),b.trigger("setTheme",a),b},getDate:function(){return this.getAttr("selectedDate")},range:function(a){var b=this,c=b.getAttr("selectedDate");return b.setAttr("range",a),f.apply(b,[c]),b},position:function(a,b){var c=this,d=c.getAttr("widgetEle");return a=parseInt(a,10)||0,b=parseInt(b,10)||0,d.css({left:a,top:b}),c},output:function(a){var b=this,c=b.getAttr("format"),d=b.getAttr("selectedDate");a=k(a),a.each(function(){var a=k(this);g(a)&&a.val(m(d,c))})},destroy:function(){var a=this,b=a.getAttr("yearEle"),c=a.getAttr("monthEle"),d=a.getAttr("trigger");return b.off(),c.off(),d.off(),a.superClass.prototype.destroy.call(a),a}}});k.contains||function(a,b){return!!(16&a.compareDocumentPosition(b))}}return t.parseDate=h,t.isLeapYear=i,t.computeDateByMonth=j,a("./calendarStyle.css"),t});