/**
 * @Author：陈海云
 * @Date：2014-5-15
 * @SuperClass：SubPub(继承订阅-发布模式的实现，以实现事件处理的功能)
 * @Update: 增加方法select(index)，选中父类
 * @Memo：实现一个选项卡切换功能（tab）
 * @param: conf = {
 *     tabItems: 所有Tab项的节点列表
 *     event: 触发切换的时间
 *     selectedClass: 选中tab项样式的className
 * }
 * @methods: 无（有些方法继承自父类或者通过createClass实现，请参考父类和createClass函数）
 */
define("components/tab/1.0.0/tab-debug", [ "$-debug", "base/createClass/1.0.0/createClass-debug", "base/pubSub/1.0.0/pubSub-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var createClass = require("base/createClass/1.0.0/createClass-debug"), PubSub = require("base/pubSub/1.0.0/pubSub-debug");
    var Tab = createClass({
        superClass: PubSub,
        init: function(conf) {
            var that = this;
            var tabItems = $(conf.tabItems), eventName = conf.event || "click", selectedClass = conf.selectedClass || "";
            that.setAttr("tabItems", tabItems);
            that.setAttr("selectedClass", selectedClass);
            tabItems.each(function(index) {
                var tabItm = $(this);
                tabItm.bind(eventName, function() {
                    tabItems.removeClass(selectedClass);
                    tabItm.addClass(selectedClass);
                    that.setAttr("index", index);
                    that.on("change");
                });
            });
        },
        methods: {}
    });
    return Tab;
});