/*! gruntTest 2015-01-26 */
define("base/promise/0.0.1/promise",["base/createClass/1.0.2/createClass","base/pubSub/1.0.3/pubSub"],function(a){function b(){var a=new i;return j(function(b){b.r>1e4?a.resolve(b):a.reject(b)}),a.getAttr("promise")}var c=a("base/createClass/1.0.2/createClass"),d=a("base/pubSub/1.0.3/pubSub"),e=0,f=1,g=2,h=c({superClass:d,methods:{then:function(a,b){return"function"==typeof a&&this.once("resolve",a),"function"==typeof b&&this.once("reject",b),this}}}),i=c({init:function(){var a=new h;this.setAttr("promise",a),this.setAttr("state",e)},methods:{resolve:function(a){var b=this.getAttr("promise");return b.trigger("resolve",a),this.setAttr("state",f),this},reject:function(a){var b=this.getAttr("promise");return b.trigger("reject",a),this.setAttr("state",g),this}}}),j=function(a){setTimeout(function(){var b={date:new Date,r:parseInt(1e5*Math.random())};"function"==typeof a&&a(b)},5e3)};return b().then(function(a){console.log("Resolve"),console.log(a)},function(a){console.log("Reject"),console.log(a)}),i});