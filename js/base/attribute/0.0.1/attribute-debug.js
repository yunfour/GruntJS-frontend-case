// seajs模块
define("base/attribute/0.0.1/attribute-debug", [ "base/createClass/1.0.2/createClass-debug", "base/pubSub/1.0.3/pubSub-debug" ], function(require) {
    var createClass = require("base/createClass/1.0.2/createClass-debug"), pubSub = require("base/pubSub/1.0.3/pubSub-debug");
    var Attrbute = createClass({
        superClass: [ pubSub ],
        init: function() {},
        methods: {
            getAttr: function(attrName) {},
            setAttr: function(attrName, attrVal) {}
        }
    });
});