/*! gruntTest 2014-08-05 */
define("components/tab/1.0.1/tab-debug",["$-debug","base/createClass/1.0.0/createClass-debug","base/pubSub/1.0.0/pubSub-debug"],function(a){var b=a("$-debug"),c=a("base/createClass/1.0.0/createClass-debug"),d=a("base/pubSub/1.0.0/pubSub-debug"),e=c({superClass:d,init:function(a){var c=this,d=b(a.tabItems),e=a.event||"click",f=a.selectedClass||"";c.setAttr("tabItems",d),c.setAttr("selectedClass",f),d.each(function(a){var d=b(this);d.bind(e,function(){c.select(a)})})},methods:{select:function(a){var b=this,c=this.getAttr("tabItems"),d=this.getAttr("selectedClass");c.removeClass(d),c.eq(a).addClass(d),b.setAttr("index",a),b.on("change")}}});return e}),define("components/tab/1.0.1/tab",["$","base/createClass/1.0.0/createClass","base/pubSub/1.0.0/pubSub"],function(a){var b=a("$"),c=a("base/createClass/1.0.0/createClass"),d=a("base/pubSub/1.0.0/pubSub"),e=c({superClass:d,init:function(a){var c=this,d=b(a.tabItems),e=a.event||"click",f=a.selectedClass||"";c.setAttr("tabItems",d),c.setAttr("selectedClass",f),d.each(function(a){var d=b(this);d.bind(e,function(){c.select(a)})})},methods:{select:function(a){var b=this,c=this.getAttr("tabItems"),d=this.getAttr("selectedClass");c.removeClass(d),c.eq(a).addClass(d),b.setAttr("index",a),b.on("change")}}});return e});