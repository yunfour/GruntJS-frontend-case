/*! gruntTest 2014-09-19 */
define("components/toolTip/0.0.2/toolTip",["$","base/createClass/1.0.2/createClass","base/pubSub/1.0.0/pubSub","components/tip/0.0.1/tip"],function(a){var b=a("$"),c=a("base/createClass/1.0.2/createClass"),d=a("base/pubSub/1.0.0/pubSub"),e=a("components/tip/0.0.1/tip"),f=c({superClass:[e,d],init:function(a){var c=this;a=b.extend({trigger:b(a.trigger).eq(0)},a),c.setAttr(a),a.tipText&&c.setTipText(a.tipText),a.theme&&c.setTheme(a.theme),a.arrowPosition&&c.setArrowPosition(a.arrowPosition)},methods:{show:function(){var a=this;return a.relocation().getAttr("tipEle").show(),a.on("show"),a},relocation:function(){var a=this,b=a.computePosition();return a.setPosition(b.left,b.top),a},computePosition:function(){var a,b,c=this,d=c.getAttr("trigger"),e=d.offset(),f=d.outerWidth(),g=d.outerHeight(),h=c.getAttr("triggerArrowPosition"),i=5;switch(a=e.left,b=e.top,h){case 1:b-=i,a+=.66*f;break;case 2:b+=.33*g,a=a+f+i;break;case 3:b+=.5*g,a=a+f+i;break;case 4:b+=.66*g,a=a+f+i;break;case 5:b=b+g+i,a+=.66*f;break;case 6:b=b+g+i,a+=.5*f;break;case 7:b=b+g+i,a+=.33*f;break;case 8:b+=.66*g,a-=i;break;case 9:b+=.5*g,a-=i;break;case 10:b+=.33*g,a-=i;break;case 11:b-=i,a+=.33*f;break;case 12:b-=i,a+=.5*f}return{left:a,top:b}},temporaryShow:function(a){var b=this,c=b.getAttr("temporaryTimer");return c&&window.clearTimeout(c),c=window.setTimeout(function(){b.hide()},a),b.setAttr("temporaryTimer",c),b.show(),b},setArrowPosition:function(a){var b=this,c=[5,10,9,8,1,12,11,4,3,2,7,6],d=c[a-1];return b.setAttr("triggerArrowPosition",a),b.superClass.prototype.setArrowPosition.call(b,d),b}}});return f});