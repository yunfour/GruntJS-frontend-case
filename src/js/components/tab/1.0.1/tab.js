/**
 * @Author：陈海云
 * @Date：2014-5-15
 * @SuperClass：SubPub(继承订阅-发布模式的实现，以实现事件处理的功能)
 * @Memo：实现一个选项卡切换功能（tab）
 * @param: conf = {
 *      tabItems: 所有Tab项的节点列表
 *      event: 触发切换的时间
 *      selectedClass: 选中tab项样式的className
 * }
 * @methods: 
 *      select(index)——选中index对应的tab项
 *      （说明：有些方法继承自父类或者通过createClass实现，请参考父类和createClass函数）
 * 
 * @private: 
 *      inedx——当前选中的的tab项的索引
 *      （说明：私有属性可以通过setAttr(name, value) 和  getAttr(name)设置和获取）
 */
define(function(require, exports, module) {
    var $ = require('$');
    var createClass = require('base/createClass/1.0.0/createClass'),
        PubSub = require('base/pubSub/1.0.0/pubSub');
    
    
    var Tab = createClass({
        superClass: PubSub,
        init: function(conf) {
            var that = this;
            var tabItems = $(conf.tabItems),
                eventName = conf.event || 'click',
                selectedClass = conf.selectedClass || '';
            
            that.setAttr('tabItems', tabItems);
            that.setAttr('selectedClass', selectedClass);
            
            tabItems.each(function(index) {
                var tabItm = $(this);
                
                tabItm.bind(eventName, function() {
                    that.select(index);
                });
            });
        },
        methods: {
            
            select: function(index) {
                var that            = this,
                    tabItems        = this.getAttr('tabItems'),
                    selectedClass   = this.getAttr('selectedClass');
                    
                tabItems.removeClass(selectedClass);
                tabItems.eq(index).addClass(selectedClass);
                
                that.setAttr('index', index);
                that.on('change');
            }
        }
    });
    
    return Tab;
});