/*! gruntTest 2014-09-19 */
define("components/dialog/1.0.0/mask",["$"],function(a){var b=a("$"),c=['<div style="display: none; background: #000; opacity:0.2; filter:Alpha(opacity=20); position: absolute; left: 0; top: 0; z-index: 9999;"></div>'].join(""),d={maskEle:b(c),show:function(){return this.setSize(),this.maskEle.show(),this},hide:function(){return this.maskEle.hide(),this},setSize:function(){var a=b(document);return this.maskEle.css({width:a.width(),height:a.height()}),this}};return d.maskEle.appendTo(document.body),b(window).on("resize",function(){d.setSize()}),d});