/*! gruntTest 2015-01-26 */
define("base/pubSub/1.0.0/pubSub",["base/createClass/1.0.1/createClass"],function(a){var b=a("base/createClass/1.0.1/createClass"),c=b({init:function(){this._events={}},methods:{bind:function(a,b){var c=this;if("string"!=typeof a)throw new Error("方法 bind(eventName, callback) 的参数eventName 必须为字符串");return"object"!=typeof c._events&&(c._events={}),c._events[a]instanceof Array||(c._events[a]=[]),"function"==typeof b&&c._events[a].push(b),c},unbind:function(a,b){var c=this;if(0===arguments.length)c._events=null,c._events={};else if(1===arguments.length){if("string"!=typeof a)throw new Error("方法 unbind(eventName, callback) 的参数 eventName 必须为字符串");c._events&&c._events[a]instanceof Array&&(c._events[a].length=0)}else{if("string"!=typeof a)throw new Error("方法 unbind(eventName, callback) 的参数 eventName 必须为字符串");if(c._events&&c._events[a]instanceof Array)if("function"==typeof b)for(var d=c._events[a],e=d.length-1;e>=0;e--)d[e]===b&&d.splice(e,1);else c._events[a].length=0}},trigger:function(a,b){var c=this;if(c.eventName=a,b=b||c,"string"!=typeof a)throw new Error("方法 trigger(eventName) 的参数eventName 必须为字符串");if(c._events&&c._events[a]instanceof Array)for(var d=0,e=c._events[a].length;e>d;d++)if("function"==typeof c._events[a][d]){var f=c._events[a][d].apply(b,[c]);if(f===!1)break}return this},on:function(a,b){var c=this;return 1===arguments.length?c.trigger(a):arguments.length>1&&c.bind(a,b),c}}});return c});