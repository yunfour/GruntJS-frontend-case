/*! gruntTest 2014-08-05 */
define("base/createClass/1.0.2/createClass-debug",[],function(){function a(a,b){var c;if("object"==typeof b){for(var d in b)"prototype"!==d&&(a[d]=b[d]);c=a}else if("object"==typeof a)if(a.constructor===Array)c=a.slice();else{c={};for(var e in a)"prototype"!==e&&(c[e]=a[e])}else c=a;return c}function b(b){var c=b.methods,d=b.superClass,e=function(){var c=this,e={};if(d&&d.constructor===Array)for(var f,g=0,h=d.length;h>g;g++)f=d[g],"function"==typeof f&&f.apply(c,arguments);"function"==typeof c.getAttr&&(e=a(e,c.getAttr()||{})),e=a(e,b.attrs||{}),c.setAttr=function(a,b){var c=this,d={};if("function"==typeof c.trigger&&c.trigger("setAttrBefore",a,b),e&&"object"==typeof e||(e={}),"object"==typeof a?d=a:"string"==typeof a&&(d[a]=b),d)for(var f in d)d.hasOwnProperty(f)&&(e[f]=d[f]);return"function"==typeof c.trigger&&c.trigger("setAttr",a,b),c},c.getAttr=function(b){var c;if(0===arguments.length)c=a(e);else{if("string"!=typeof b)throw new Error("方法 getAttr() 的参数 attrName 必须为字符串类型");"object"==typeof e&&(c=e[b])}return c},"function"==typeof b.init&&b.init.apply(c,arguments)};if("function"==typeof d&&(d=[d]),d&&d.constructor===Array){for(var f,g,h,i=0,j=d.length;j>i;i++)if(f=d[i],"function"==typeof f)if(g=function(){},g.prototype=f.prototype,h=new g,0===i)e.prototype=h;else for(var k in h)e.prototype[k]=h[k];"function"==typeof d[0]&&(e.prototype.superClass=d[0])}else e.prototype.superClass=Object;if(c&&"object"==typeof c)for(var l in c)"function"==typeof c[l]&&c.hasOwnProperty(l)&&(e.prototype[l]=c[l]);return e}return b}),define("base/createClass/1.0.2/createClass",[],function(){function a(a,b){var c;if("object"==typeof b){for(var d in b)"prototype"!==d&&(a[d]=b[d]);c=a}else if("object"==typeof a)if(a.constructor===Array)c=a.slice();else{c={};for(var e in a)"prototype"!==e&&(c[e]=a[e])}else c=a;return c}function b(b){var c=b.methods,d=b.superClass,e=function(){var c=this,e={};if(d&&d.constructor===Array)for(var f,g=0,h=d.length;h>g;g++)f=d[g],"function"==typeof f&&f.apply(c,arguments);"function"==typeof c.getAttr&&(e=a(e,c.getAttr()||{})),e=a(e,b.attrs||{}),c.setAttr=function(a,b){var c=this,d={};if("function"==typeof c.trigger&&c.trigger("setAttrBefore",a,b),e&&"object"==typeof e||(e={}),"object"==typeof a?d=a:"string"==typeof a&&(d[a]=b),d)for(var f in d)d.hasOwnProperty(f)&&(e[f]=d[f]);return"function"==typeof c.trigger&&c.trigger("setAttr",a,b),c},c.getAttr=function(b){var c;if(0===arguments.length)c=a(e);else{if("string"!=typeof b)throw new Error("方法 getAttr() 的参数 attrName 必须为字符串类型");"object"==typeof e&&(c=e[b])}return c},"function"==typeof b.init&&b.init.apply(c,arguments)};if("function"==typeof d&&(d=[d]),d&&d.constructor===Array){for(var f,g,h,i=0,j=d.length;j>i;i++)if(f=d[i],"function"==typeof f)if(g=function(){},g.prototype=f.prototype,h=new g,0===i)e.prototype=h;else for(var k in h)e.prototype[k]=h[k];"function"==typeof d[0]&&(e.prototype.superClass=d[0])}else e.prototype.superClass=Object;if(c&&"object"==typeof c)for(var l in c)"function"==typeof c[l]&&c.hasOwnProperty(l)&&(e.prototype[l]=c[l]);return e}return b});