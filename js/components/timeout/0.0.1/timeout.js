/*! gruntTest 2014-09-19 */
define("components/timeout/0.0.1/timeout",["base/createClass/1.0.2/createClass","base/pubSub/1.0.0/pubSub"],function(a){var b=a("base/createClass/1.0.2/createClass"),c=a("base/pubSub/1.0.0/pubSub"),d=b({superClass:c,init:function(a){var b=this;b.setAttr({time:parseInt(a,10)||0,curTime:0})},methods:{setTime:function(a){var b=this;if(a=parseInt(a,10),isNaN(a)||0>=a)throw new Error("方法：setTime(millisecond) 的参数 millisecond 必须为大于数字");return b.setAttr("time",a),b},start:function(){var a=this,b=a.getAttr("time"),c=window.setInterval(function(){var c=a.getAttr("curTime")+50;c>=b&&a.on("timeout").stop(),a.setAttr("curTime",c)},50);return window.clearInterval(a.getAttr("timer")),a.setAttr("timer",c).on("start"),a},stop:function(){var a=this;return a.setAttr("curTime",0).pause().on("stop"),a},pause:function(){var a=this;return window.clearTimeout(a.getAttr("timer")),a.on("pause"),a}}});return d});