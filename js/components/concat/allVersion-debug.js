/**
 * @Author      : 陈海云
 * @Date        : 2014-06-24
 * @SuperClass  : Widget
 * @Memo        : 提供一个日历组件的构造函数（类），该类继承了Widget，因此有些方法可以参考Widget类
 * @param       : conf初始化日历的配置参数的对象，其属性如下
 *      conf = {
 *          trigger        : 唤出日历的元素；可选；参数可以jQuery选择器，可以是元素DOM节点，可
 *                           以是jQuery对象；如果设置了trigger，在调用show()方法时，日历的位
 *                           置会根据trigger来定位，会自动显示到trigger的正下方，如果不设置
 *                           trigger，需要自己调用position(left, top)来自由定位
 * 
 *          triggerType    : 通过trigger唤出日历的事件类型；字符串(String)；可选，默认为：click（单击trigger
 *                           时唤出日历）
 * 
 *          hideOnSelect   : 在日历上点击日选择日期后会不会隐藏日历；布尔值(Boolean)；可选，默认为true；为true时
 *                           选择日期后会隐藏，反之，不隐藏
 * 
 *          output         : 选择日期后会将选中的日期输入的到该属性对应的节点中；可选；参数可以
 *                           jQuery选择器，可以是元素DOM节点，可以是jQuery对象；如果其对应的
 *                           节点不是input[type=text]或textarea，则不会输入
 * 
 *          format         : 将选中的日期输入到trigger和output中的日期格式；字符串；可选，默认为：yyyy-MM-dd
 * 
 *          theme          : 日历主题的名称；字符串；可选，默认为蓝色主题，目前除默认主题外还支持两种主题：'orange'
 *                           橙色主题、'black'黑色主题；
 * 
 *          monthNames     : 月份的名称；数组；可选，默认为：['一月', '二月', .... '十月', '十一
 *                           月', '十二月']；显示在日历月份按钮的值
 * 
 *          weekNames      : 礼拜（星期）日的名称；数组；可选，默认为：['星期日', '星期一', ... '星期
 *                           五', '星期六']；鼠标经过星期列表时显示的值
 * 
 *          weekNamesShort : 礼拜（星期）日的简称；数组；可选，默认为：['日', '一', '二', ... '五', 
 *                           '六']；显示在星期列表中的值
 *      }
 * @Methods:
 *      selectDate:
 *          描述: 选择指定日期theDate，同时将选择结果渲染到日历中；
 *          参数: 
 *              theDate——需要选中的日期；
 *          返回值: 当前对象
 * 
 *      show:
 *          描述: 显示日历，如果初始配置中设置trigger，显示时会根据trigger位置定位日历，显示在trigger的正下方；
 *          参数: 无；
 *          返回值: 当前对象
 * 
 *      hide:
 *          描述: 隐藏日历；
 *          参数: 无；
 *          返回值: 当前对象
 * 
 *      setTheme:
 *          描述: 设置日历主题，当前有三种主题：默认（蓝色）、橙色、黑色主题；
 *          参数: 
 *              themeName——主题名称，目前支持三种主题，默认（蓝色）、橙色：themeName='orange'、黑色：themeName='black'；
 *          返回值: 当前对象
 * 
 *      getDate:
 *          描述: 获取日历当前选中的日期；
 *          参数: 无；
 *          返回值: 日历选中的日期；Date类型
 * 
 *      range:
 *          描述: 设置日历的选择范围；
 *          参数: 
 *              range——日期范围；数组、函数(function)；如果时数组，日历在渲染的时候，会根据数组前两个元素形成的区间显示，
 *                     如果是函数，在渲染的时候，会把渲染的日对应的日期传递给该函数，根据函数的返回值为true、false来展示
 *                     渲染的日是否为禁用状态
 *          返回值: 当前对象
 * 
 *      position:
 *          描述: 定位日历的位置(相对document的左上角的点来定位)；
 *          参数: 
 *              left——日历的水平坐标，数值—整数，
 *              top——日历的垂直坐标，数值—整数；
 *          返回值: 当前对象
 *      
 *      output:
 *          描述: 将日历当前选中的日期按照conf.format的个数输入到参数对应的节点；
 *          参数: 
 *              eles——需要输入选中日期的节点；可以是jQuery选择器、jQuery Object、DOM元素节点；如果对应节点
 *                    不是文本框，则不输入
 *          返回值: 当前对象
 *  
 *          其他方法继承自父类，请参考父类Widget
 * 
 * 
 * @Events: 
 *      show:
 *          描述: 日历显示时触发该事件；
 * 
 *      hide:
 *          描述: 隐藏日历时触发该事件；
 * 
 *      setTheme:
 *          描述: 设置日历主题，触发该事件，会将设置的主题名字注入到回调函数的参数；
 * 
 *      selectDate:
 *          描述: 选择日期时触发该事件，会把选择的日期注入到回调函数的参数；
 * 
 *      selectPrevYear:
 *          描述: 点击标题栏中“上一年”的按钮选择“上一年”的当月当日时触发该事件；
 * 
 *      selectPrevMonth:
 *          描述: 点击标题栏中“上一月”的按钮选择“上一月”的当年当日时触发该事件；
 * 
 *      selectNextMonth:
 *          描述: 点击标题栏中“下一月”的按钮选择“下一月”的当年当日时触发该事件；
 * 
 *      selectNextYear:
 *          描述: 点击标题栏中“下一年”的按钮选择“下一年”的当月当日时触发该事件；
 * 
 *      selectYear:
 *          描述: 选择年列表的年份按钮时触发该事件，会把选择的年份的值导入到回调函数的参数；
 * 
 *      selectMonth:
 *          描述: 选择月份列表的月份按钮时触发该事件，会把选择的月份的值导入到回调函数的参数；
 * 
 *          其他事件可能在父类的某些行为中触发，请参考父类
 */
define("components/calendar/0.0.1/calendar-debug", [ "$-debug", "base/createClass/1.0.2/createClass-debug", "base/dateFormat/0.0.1/dateFormat-debug", "components/widget/0.0.1/widget-debug" ], function(require) {
    var $ = require("$-debug"), createClass = require("base/createClass/1.0.2/createClass-debug"), dateFormat = require("base/dateFormat/0.0.1/dateFormat-debug"), Widget = require("components/widget/0.0.1/widget-debug");
    // 日历模板
    var TEMPLATE = [ '<div class="sea-calendar" style="display:none;">', '<h6 class="sea-calendar-title">', '<a class="J-operate pre-year" href="javascript:;" title="上一年">&lt;&lt;</a>', '<a class="J-operate pre-month" href="javascript:;" title="上一月">&lt;</a>', '<a class="month" href="javascript:;"></a>', '<a class="year" href="javascript:;"></a>', '<a class="J-operate next-month" href="javascript:;" title="下一月">&gt;</a>', '<a class="J-operate next-year" href="javascript:;" title="下一年">&gt;&gt;</a>', "</h6>", '<div class="sea-calendar-date">', '<ul class="sea-calendar-week"></ul>', '<ul class="sea-calendar-day clearfix"></ul>', "</div>", '<ul class="sea-calendar-years"></ul>', '<ul class="sea-calendar-monthes"></ul>', "</div>" ].join("");
    // 每月的天数对照表（1、3、5、7、8、10、12月为31天，默认2月为28天，闰年2月29天，其他均为30天）
    var DAYS_MAPPING = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    // 月份名称对照表
    var MONTH_NAMES = [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ];
    // 星期名称对照表
    var WEEK_NAMES = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
    // 星期简写名称对照表
    var WEEK_NAMES_SHORT = [ "日", "一", "二", "三", "四", "五", "六" ];
    var Calendar = createClass({
        superClass: Widget,
        attrs: {
            // 私有属性=====================================
            template: TEMPLATE,
            monthNames: MONTH_NAMES,
            weekNames: WEEK_NAMES,
            weekNamesShort: WEEK_NAMES_SHORT,
            format: "yyyy-MM-dd",
            hideOnSelect: true,
            triggerType: "click"
        },
        init: function(conf) {
            var that = this;
            var defaultConf = {
                selectedDate: new Date()
            };
            defaultConf = $.extend(defaultConf, conf);
            if (defaultConf.trigger) {
                defaultConf.trigger = $(defaultConf.trigger).eq(0);
            }
            if (defaultConf.theme) {
                that.setTheme(defaultConf.theme);
            }
            defaultConf.viewDate = defaultConf.selectedDate = parseDate(defaultConf.selectedDate);
            that.setAttr(defaultConf);
            that.render();
        },
        methods: {
            // 方法: 渲染UI，重写父类的方法
            renderUI: function() {
                var that = this, selectedDate = that.getAttr("selectedDate"), widgetEle = $(that.getAttr("template")), // 组件根节点
                calendarBd = widgetEle.find("div.sea-calendar-date"), // 日历主题部分
                weekLstEle = widgetEle.find("ul.sea-calendar-week"), // “星期”列表节点
                dayLstEle = widgetEle.find("ul.sea-calendar-day"), // “日”列表节点
                yearEle = widgetEle.find("h6.sea-calendar-title .year"), // “年”按钮节点
                yearLstEle = widgetEle.find("ul.sea-calendar-years"), // “年”列表节点
                monthEle = widgetEle.find("h6.sea-calendar-title .month"), // “月”按钮节点
                monthLstEle = widgetEle.find("ul.sea-calendar-monthes");
                // “月”列表节点
                that.setAttr({
                    widgetEle: widgetEle,
                    calendarBd: calendarBd,
                    weekLstEle: weekLstEle,
                    dayLstEle: dayLstEle,
                    yearEle: yearEle,
                    yearLstEle: yearLstEle,
                    monthEle: monthEle,
                    monthLstEle: monthLstEle
                });
                renderWeek.apply(that);
                renderMonthLst.apply(that);
                renderCalendar.apply(that, [ selectedDate ]);
                return that;
            },
            // 方法: 在UI节点上绑定一些事件，重写父类方法
            bindUI: function() {
                var that = this, widgetEle = that.getAttr("widgetEle"), yearEle = that.getAttr("yearEle"), monthEle = that.getAttr("monthEle"), calendarBd = that.getAttr("calendarBd"), yearLstEle = that.getAttr("yearLstEle"), monthLstEle = that.getAttr("monthLstEle"), trigger = that.getAttr("trigger"), triggerType = that.getAttr("triggerType");
                // 组件中所有的单击事件均不冒泡
                widgetEle.on("mousedown", function() {
                    if (trigger && isTxtInput(trigger)) {
                        trigger.focus();
                    }
                    // 防止冒泡
                    return false;
                });
                // 组件中所有的单击事件均不冒泡
                widgetEle.on("click", function() {
                    // 防止冒泡
                    return false;
                });
                // 顶部选择"年"的按钮单击事件
                yearEle.on("click", function() {
                    // 年列表如果显示，点击该按钮则隐藏该列表，如果隐藏则显示
                    if (yearLstEle.css("display") === "block") {
                        calendarBd.show();
                        monthLstEle.hide();
                        yearLstEle.hide();
                    } else {
                        yearLstEle.show();
                        monthLstEle.hide();
                        calendarBd.hide();
                    }
                });
                // 顶部选择"月"的按钮单击事件
                monthEle.on("click", function() {
                    // 月列表如果显示，点击该按钮则隐藏该列表，如果隐藏则显示
                    if (monthLstEle.css("display") === "block") {
                        calendarBd.show();
                        yearLstEle.hide();
                        monthLstEle.hide();
                    } else {
                        monthLstEle.show();
                        yearLstEle.hide();
                        calendarBd.hide();
                    }
                });
                // 点击年份列表
                widgetEle.on("click", "ul.sea-calendar-years a", function() {
                    var yearItm = $(this), year = yearItm.data("year"), selectedDate = parseDate(that.getAttr("selectedDate") || new Date()), month = selectedDate.getMonth() + 1, day = selectedDate.getDate(), newDate = year + "/" + month + "/" + day, beginYear;
                    if (year === "next" || year === "pre") {
                        beginYear = yearItm.data("target");
                        renderYearLst.apply(that, [ beginYear ]);
                        // 选中年份
                        yearLstEle.find("a").removeClass("active").filter("a[data-year=" + selectedDate.getFullYear() + "]").addClass("active");
                    } else {
                        newDate = parseDate(newDate);
                        renderCalendar.apply(that, [ newDate ]);
                        calendarBd.show();
                        yearLstEle.hide();
                        monthLstEle.hide();
                        that.trigger("selectYear", year);
                    }
                });
                // 点击月份列表
                widgetEle.on("click", "ul.sea-calendar-monthes a", function() {
                    var monthItm = $(this), month = monthItm.data("month") + 1, selectedDate = parseDate(that.getAttr("selectedDate") || new Date()), year = selectedDate.getFullYear(), day = selectedDate.getDate(), newDate = year + "/" + month + "/" + day;
                    newDate = parseDate(newDate);
                    renderCalendar.apply(that, [ newDate ]);
                    calendarBd.show();
                    yearLstEle.hide();
                    monthLstEle.hide();
                    that.trigger("selectMonth", month);
                });
                // 点击"日"列表
                widgetEle.on("click", "ul.sea-calendar-day a", function() {
                    var dayItm = $(this), hideOnSelect = that.getAttr("hideOnSelect"), newDate = parseDate(dayItm.data("date"));
                    if (dayItm.hasClass("disabled")) {
                        return;
                    }
                    that.selectDate(newDate);
                    that.trigger("selectDate", newDate);
                    if (hideOnSelect) {
                        that.hide();
                    }
                });
                // 点击"上一年"、"上一月"、"下一年"、"下一月"按钮
                widgetEle.on("click", "h6.sea-calendar-title a.J-operate", function() {
                    var operateBtn = $(this), viewDate = parseDate(that.getAttr("viewDate") || new Date()), month = 0, newDate, eventName;
                    if (operateBtn.hasClass("pre-year")) {
                        month = -12;
                        eventName = "selectPrevYear";
                    } else if (operateBtn.hasClass("pre-month")) {
                        month = -1;
                        eventName = "selectPrevMonth";
                    } else if (operateBtn.hasClass("next-month")) {
                        month = 1;
                        eventName = "selectNextMonth";
                    } else if (operateBtn.hasClass("next-year")) {
                        month = 12;
                        eventName = "selectNextYear";
                    }
                    newDate = computeDateByMonth(viewDate, month);
                    renderCalendar.apply(that, [ newDate ]);
                    that.trigger(eventName);
                });
                // trigger的单击事件
                if (trigger) {
                    $(document.body).on("click", function(ev) {
                        /*
                         * 点击页面上日历和trigger以外的地方的时候隐藏日历
                         * 代码解释：如果按照此中方式，那么在点击日历中的任
                         * 意地方是，日历是不是也会隐藏呢？根据事件冒泡原理
                         * 解释是会出现这样的结果，但是如果这样就不符合我们
                         * 的需求了，隐藏为了避免单击日历时关闭日历，我们需
                         * 要阻止日历根节点上的单击事件向document.body冒
                         * 泡，阻止单击事件冒泡的代码在：249行
                         */
                        if (ev.srcElement !== trigger[0]) {
                            that.hide();
                        }
                    });
                    trigger.on(triggerType, function() {
                        var selectedDate = that.getAttr("selectedDate");
                        if (widgetEle.css("display") === "none") {
                            that.show();
                            renderCalendar.apply(that, [ selectedDate ]);
                        }
                        positionByTrigger.apply(that);
                    });
                    if (isTxtInput(trigger)) {
                        trigger.on("blur", function() {
                            that.hide();
                        });
                    }
                    that.bind("selectDate", function(date) {
                        that.output(trigger);
                    });
                }
                that.bind("selectDate", function(date) {
                    var outputTargeEle = that.getAttr("output");
                    that.output(outputTargeEle);
                });
            },
            // 方法: 选中日期，并且在日历中展示
            selectDate: function(theDate) {
                var that = this;
                theDate = parseDate(theDate);
                renderCalendar.apply(that, [ theDate ]);
                that.setAttr("selectedDate", theDate);
                return that;
            },
            // 方法: 显示日历
            show: function() {
                var that = this, trigger = that.getAttr("trigger"), widgetEle = that.getAttr("widgetEle");
                if (trigger) {
                    positionByTrigger.apply(that);
                }
                widgetEle.show();
                that.trigger("show");
                return that;
            },
            // 方法: 隐藏日历
            hide: function() {
                var that = this, widgetEle = that.getAttr("widgetEle");
                widgetEle.hide();
                that.trigger("hide");
                return that;
            },
            // 方法: 设置日历主题，当前有三种主题：默认（蓝色）、橙色、黑色主题
            setTheme: function(themeName) {
                var that = this, widgetEle = that.getAttr("widgetEle");
                widgetEle.removeClass().addClass("sea-calendar sea-calendar-theme-" + themeName);
                that.trigger("setTheme", themeName);
                return that;
            },
            // 方法: 获取当前日历选中的时间
            getDate: function() {
                return this.getAttr("selectedDate");
            },
            // 方法: 设置选择区域
            range: function(range) {
                var that = this, selectedDate = that.getAttr("selectedDate");
                that.setAttr("range", range);
                renderCalendar.apply(that, [ selectedDate ]);
                return that;
            },
            // 方法: 定位坐标
            position: function(left, top) {
                var that = this, widgetEle = that.getAttr("widgetEle");
                left = parseInt(left, 10) || 0;
                top = parseInt(top, 10) || 0;
                widgetEle.css({
                    left: left,
                    top: top
                });
                return that;
            },
            // 方法：将选中的日期输入到指定的文本框节点中
            output: function(eles) {
                var that = this, format = that.getAttr("format"), selectedDate = that.getAttr("selectedDate");
                eles = $(eles);
                eles.each(function() {
                    var ele = $(this);
                    if (isTxtInput(ele)) {
                        ele.val(dateFormat(selectedDate, format));
                    }
                });
            },
            // 方法：销毁组件，重新父类的方法
            destroy: function() {
                var that = this, yearEle = that.getAttr("yearEle"), monthEle = that.getAttr("monthEle"), trigger = that.getAttr("trigger");
                yearEle.off();
                monthEle.off();
                trigger.off();
                // 调用父类的销毁方法
                that.superClass.prototype.destroy.call(that);
                return that;
            }
        }
    });
    // 私有方法=====================================
    // 充当Calendar私有方法：渲染“星期”列表
    function renderWeek() {
        var that = this, weekLstEle = that.getAttr("weekLstEle"), weekNamesShort = that.getAttr("weekNamesShort"), weekNames = that.getAttr("weekNames"), weekHtml = [];
        for (var i = 0, l = weekNamesShort.length; i < l; i++) {
            weekHtml.push('<li title="' + weekNames[i] + '">' + weekNamesShort[i] + "</li>");
        }
        weekLstEle.html(weekHtml.join(""));
    }
    // 充当Calendar私有方法：通过trigger来定位calendar的位置
    function positionByTrigger() {
        var that = this, widgetEle = that.getAttr("widgetEle"), trigger = that.getAttr("trigger"), offset = trigger.offset();
        that.position(offset.left, offset.top + trigger.outerHeight() + 3);
    }
    // 充当Calendar私有方法：渲染年份列表
    function renderYearLst(beginYear) {
        var that = this, yearLstEle = that.getAttr("yearLstEle"), viewDate = that.getAttr("viewDate") || new Date(), yearLstHtml = [];
        if (!beginYear) {
            beginYear = parseDate(viewDate).getFullYear();
        }
        yearLstHtml.push('<li><a href="javascript:;" data-year="pre" data-target="' + (beginYear - 10) + '">...</a></li>');
        for (var i = 0, year = beginYear; i < 10; i++, year++) {
            yearLstHtml.push('<li><a href="javascript:;" data-year="' + year + '">' + year + "</a></li>");
        }
        yearLstHtml.push('<li><a href="javascript:;" data-year="next" data-target="' + year + '">...</a></li>');
        yearLstEle.html(yearLstHtml.join(""));
    }
    // 充当Calendar私有方法：渲染月份列表
    function renderMonthLst() {
        var that = this, monthLstEle = that.getAttr("monthLstEle"), monthNames = that.getAttr("monthNames"), monthLstHtml = [];
        for (var i = 0, l = monthNames.length; i < l; i++) {
            monthLstHtml.push('<li><a href="javascript:;" data-month="' + i + '">' + monthNames[i] + "</a></li>");
        }
        monthLstEle.html(monthLstHtml.join(""));
    }
    // 充当Calendar私有方法：根据指定日期渲染日历
    function renderCalendar(theDate) {
        var that = this, widgetEle = that.getAttr("widgetEle"), dayLstEle = widgetEle.find("ul.sea-calendar-day"), yearEle = that.getAttr("yearEle"), yearLstEle = that.getAttr("yearLstEle"), monthEle = that.getAttr("monthEle"), monthLstEle = that.getAttr("monthLstEle"), theRange = that.getAttr("range"), today = new Date(), todayDay = today.getDate(), monthNames = that.getAttr("monthNames"), // theDate对应的年，如theDate=2012年12月23日，则year指的2012
        year, // theDate对应的月，如theDate=2012年12月23日，则month指的12
        month, // theDate对应的日，如theDate=2012年12月23日，则day指的23
        day, // theDate对应的月一共有多少天
        days, // theDate所在月的1号的日期，如theDate=2012年12月23日，则monthFirstDay指的是2012年12月1日
        monthFirstDay, /* monthFirstDayWeek指的是theDate对应月的1号是星期几，如theDate=2012
             * 年12月23日，则2012年12月1日是星期六，则monthFirstDay=6
             */
        monthFirstDayWeek, dateText, dateVal, daylstHtml = [];
        function isInRange(theDate) {
            var rangeUpper, // 日期范围上限
            rangeLower, // 日期范围下限
            result = false;
            theDate = parseDate(theDate);
            if (typeof theRange === "function") {
                // 日期范围为一个函数，则调用此函数来判断
                result = theRange(theDate);
            } else if (theRange && theRange.constructor === Array) {
                rangeUpper = theRange[0];
                rangeLower = theRange[1];
                if (rangeUpper) {
                    rangeUpper = parseDate(rangeUpper);
                }
                if (rangeLower) {
                    rangeLower = parseDate(rangeLower);
                }
                if (rangeUpper && rangeLower) {
                    // 如果设置上限和下限日期，则需判断theDate是否在rangeUpper和rangeLower之间
                    if (theDate >= rangeUpper && theDate <= rangeLower) {
                        result = true;
                    }
                } else if (rangeUpper) {
                    // 如果只设置上限日期，则需判断theDate是否在rangeUpper之后
                    if (theDate >= rangeUpper) {
                        result = true;
                    }
                } else if (rangeLower) {
                    // 如果只设置下限日期，则需判断theDate是否在rangeLower之后
                    if (theDate <= rangeLower) {
                        result = true;
                    }
                }
            } else {
                // 未设置时间范围，则所有日期均有效
                result = true;
            }
            return result;
        }
        if (!theDate) {
            throw new Error("方法: renderCalendar(theDate) 的参数 theDate 无效");
        }
        theDate = parseDate(theDate);
        year = theDate.getFullYear();
        month = theDate.getMonth();
        day = theDate.getDate();
        days = DAYS_MAPPING[month];
        if (isLeapYear(year) && month === 1) {
            days = 29;
        }
        monthFirstDay = parseDate(year + "/" + (month + 1) + "/1");
        monthFirstDayWeek = monthFirstDay.getDay();
        for (var i = 0; i < monthFirstDayWeek; i++) {
            daylstHtml.push("<li></li>");
        }
        var dayItmClass, dayItmHtml;
        for (i = 1; i <= days; i++) {
            dateText = year + "年" + (month + 1) + "月" + i + "日";
            dateVal = year + "/" + (month + 1) + "/" + i;
            dayItemHtml = '<li><a class="{dayItmClass}" href="javascript:;" title="' + dateText + '" data-date="' + dateVal + '">' + i + "</a></li>";
            dayItmClass = "";
            if (!isInRange(parseDate(dateVal))) {
                dayItmClass = "disabled";
            } else if (i === day) {
                dayItmClass = "active";
            } else if (i === todayDay) {
                dayItmClass = "today";
            }
            dayItemHtml = dayItemHtml.replace("{dayItmClass}", dayItmClass);
            daylstHtml.push(dayItemHtml);
        }
        daylstHtml = daylstHtml.join("");
        dayLstEle.html(daylstHtml);
        // 选中月份
        monthLstEle.find("a").removeClass("active").eq(month).addClass("active");
        monthEle.html(monthNames[month]);
        // 选中年份
        var allYearItms = yearLstEle.find("a");
        if (allYearItms.filter("a[data-year=" + year + "]").size() === 0) {
            renderYearLst.apply(that, [ year ]);
            allYearItms = yearLstEle.find("a");
        }
        allYearItms.removeClass("active").filter("a[data-year=" + year + "]").addClass("active");
        yearEle.html(year + "年");
        that.setAttr("viewDate", theDate);
        return that;
    }
    // 判断节点是否为input[type]或textarea
    function isTxtInput(ele) {
        var result = false, tagName, type;
        ele = $(ele).eq(0);
        tagName = (ele.prop("tagName") || "").toUpperCase();
        type = (ele.attr("type") || "").toUpperCase();
        if (tagName === "TEXTAREA") {
            result = true;
        } else if (tagName === "INPUT" && type === "TEXT") {
            result = true;
        }
        return result;
    }
    // Zepto 上没有 contains 方法(判断container节点是否包含son节点)
    var contains = $.contains || function(container, son) {
        //noinspection JSBitwiseOperatorUsage
        return !!(container.compareDocumentPosition(son) & 16);
    };
    // 函数：将参数theDate转换成Date类型的对象
    function parseDate(theDate) {
        if (typeof theDate === "object" && theDate.constructor === Date) {
            return theDate;
        }
        if (!theDate) {
            throw new Error("参数 theDate 无效");
        } else if (typeof theDate === "string") {
            /*
             * 将字符串中'-'替换成'/'，因为在IE浏览器中生成Date实例时，
             * 如果初始化日期指定为字符串：2012-03-15时，认为参数格式是
             * 非法的，生成Date实例会失真，而所有浏览器都是别以'/'为年月
             * 日的分隔符的日期格式
             */
            theDate = theDate.replace(/\-/g, "/");
            theDate = new Date(theDate);
        } else {
            theDate = new Date(theDate);
        }
        return theDate;
    }
    // 函数：判断指定年份是否为闰年
    function isLeapYear(year) {
        var isLeap = false;
        year = parseInt(year, 10);
        if (isNaN(year)) {
            throw new Error("参数: year 必须为整数");
        }
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
            isLeap = true;
        }
        return isLeap;
    }
    // 函数：以月份为单位计算日期
    function computeDateByMonth(theDate, month) {
        var years = (month - month % 12) / 12, resultYear = theDate.getFullYear(), resultMonth = theDate.getMonth() + 1, resultDay = theDate.getDate();
        month = month % 12;
        resultYear = resultYear + years;
        resultMonth = resultMonth + month;
        if (resultMonth <= 0) {
            resultYear = resultYear - 1;
            resultMonth = resultMonth + 12;
        }
        if (resultMonth > 12) {
            resultYear = resultYear + 1;
            resultMonth = resultMonth - 12;
        }
        resultDate = new Date(resultYear + "/" + resultMonth + "/" + resultDay + " " + theDate.getHours() + ":" + theDate.getMinutes() + ":" + theDate.getSeconds());
        return resultDate;
    }
    // 将以上三个函数以Calendar静态方法抛出
    Calendar.parseDate = parseDate;
    Calendar.isLeapYear = isLeapYear;
    Calendar.computeDateByMonth = computeDateByMonth;
    require("./calendarStyle-debug.css");
    return Calendar;
});

/**
 * @Author     : 陈海云
 * @Date       : 2014-05-15
 * @SuperClass : PubSub
 * @Memo       : 实现一个对话框，并提供两个静态方法：confirm()、alert() 来模
 *               拟系统的确认对话框和警告对话框；不易于封装，所以不推荐使用，现
 *               在已经有升级版本1.0.1的实现，推荐使用新版本
 * 
 * @param:
 *      conf:
 *          描述: 初始化配置对象，可配置项如下：
 *             {
 *                  width       : 对话框宽度，默认400px
 *                  title       : 对话框标题栏文案，默认为"弹出窗"
 *                  position    : 对话框定位方式，默认为"fixed"，支持: fixed、absolute两种方式
 *                  isShowClose : 是否显示关闭按钮，布尔值，默认为true——显示关闭按钮
 *                  mask        : 是否显示遮罩背景，布尔值，默认为true——显示遮罩层 
 *             }
 * 
 * 
 * @Methods:
 *      setTitle:
 *          描述: 设置标题栏文案；
 *          参数: 
 *              title——标题栏文案；字符串；
 *          返回值: 当前对象；
 * 
 *      setWidth:
 *          描述: 设置对话框宽度；
 *          参数: 
 *              width——对话框的宽度；数字、字符串皆可；
 *          返回值: 当前对象；
 * 
 *      show:
 *          描述: 显示弹出层；
 *          参数: 无；
 *          返回值: 当前对象；
 * 
 *      hide:
 *          描述: 隐藏弹出层；
 *          参数: 无；
 *          返回值: 当前对象；
 * 
 *      setPosition:
 *          描述: 定位弹出层，弹出层根节点是绝对定位，该方法设置其left、top 两个坐标；
 *          参数: 
 *              x——弹出层根节点的水平方向坐标，
 *              y——弹出层跟解答的垂直方向坐标；
 *          返回值: 当前对象；
 * 
 *      
 *      部分方法继承自父类 PubSub，请参考父类 PubSub
 * 
 * 
 * @Events: 
 *      setTitle——设置对话框标题文案时触发
 *      
 *      setWidth——设置对话框宽度时触发
 * 
 *      show——对话框显示时触发
 * 
 *      hide——对话框隐藏时触发
 * 
 */
define("components/dialog/1.0.0/dialog-debug", [ "$-debug", "base/createClass/1.0.0/createClass-debug", "base/singleton/1.0.0/singleton-debug", "base/pubSub/1.0.0/pubSub-debug", "./mask-debug" ], function(require, exports, module) {
    // 添加样式
    seajs.importStyle([ ".sea-dialog{ padding: 7px; background: #999; position: absolute; top: 0; left: 0; z-index: 10000;}", ".sea-dialog-panel{ background: #fff; position: relative;}", ".sea-dialog-title{ height: 30px; padding: 0 5px; margin: 0; line-height: 30px; border-bottom: 1px solid #eee; font-size: 13px; font-weight: bold; color: #333; position: relative;}", ".sea-dialog-bd{ padding: 10px;}", ".sea-dialog-close{ display: block; height: 14px; width: 14px; font-size: 14px; font-weight: bold; line-height: 14px; color: #333; text-align: center; font-family: Dotum; text-decoration: none; overflow: hidden; position: absolute; top: 6px; right: 6px;}", ".sea-dialog-close:hover{ color: #333; text-decoration: none;}" ].join(""));
    var $ = require("$-debug");
    var dialogHtml = [ '<div class="sea-dialog">', '<div class="sea-dialog-panel">', '<h4 class="sea-dialog-title"></h4>', '<div class="sea-dialog-bd"></div>', '<a class="sea-dialog-close" href="javascript:;" title="点击关闭窗口">x</a>', "</div>", "</div>" ].join("");
    var createClass = require("base/createClass/1.0.0/createClass-debug"), singleton = require("base/singleton/1.0.0/singleton-debug"), PubSub = require("base/pubSub/1.0.0/pubSub-debug"), mask = require("./mask-debug");
    var Dialog = createClass({
        // 继承观察者模式的实现,处理事件
        superClass: PubSub,
        init: function(conf) {
            var that = this, dialogEle = $(dialogHtml), dialogCloseEle = dialogEle.find("a.sea-dialog-close");
            conf = $.extend({
                width: 400,
                // 窗口宽度
                title: "弹出窗",
                // 对话框标题
                position: "fixed",
                // 窗口定位方式
                isShowClose: true,
                // 是否显示关闭按钮
                mask: true
            }, conf);
            that.setAttr({
                conf: conf,
                dialogEle: dialogEle,
                dialogTitleEle: dialogEle.find("h4.sea-dialog-title"),
                dialogBdEle: dialogEle.find("div.sea-dialog-bd"),
                dialogCloseEle: dialogCloseEle
            });
            if (conf.title) {
                that.setTitle(conf.title);
            }
            if (!conf.isShowClose) {
                dialogCloseEle.hide();
            }
            dialogCloseEle.on("click", function() {
                that.hide();
            });
            if (conf.content) {
                that.getAttr("dialogBdEle").append($(conf.content));
            }
            that.setWidth(conf.width);
            dialogEle.appendTo(document.body).hide();
        },
        methods: {
            // 设置对话框标题内容
            setTitle: function(title) {
                var that = this;
                that.getAttr("dialogTitleEle").html(title);
                that.on("setTitle");
                return this;
            },
            // 设置对话框宽度
            setWidth: function(width) {
                var that = this;
                if (isNaN(width) || width < 0) {
                    throw new Error("方法:setWidth() 的参数  width 需为大于0的数字");
                }
                width = Math.floor(width) - 20;
                if (width < 0) {
                    width = 0;
                }
                that.getAttr("dialogEle").css({
                    width: width
                });
                that.on("setWidth");
                return that;
            },
            // 显示对话框
            show: function() {
                var that = this, conf = that.getAttr("conf");
                var dialogEle = that.getAttr("dialogEle");
                dialogEle.show();
                that.setPosition();
                if (conf.mask) {
                    mask.show();
                }
                that.on("show");
                return that;
            },
            // 关闭对话框
            hide: function() {
                var that = this, conf = that.getAttr("conf");
                var dialogEle = that.getAttr("dialogEle");
                dialogEle.hide();
                if (conf.mask) {
                    mask.hide();
                }
                that.on("hide");
                return that;
            },
            // 设置窗口位置,参数可选,不设置参数的时候,对话框位置在页面可视区域中央
            setPosition: function(x, y) {
                var that = this, conf = that.getAttr("conf");
                var $win = $(window), dialogEle = that.getAttr("dialogEle");
                var left, top;
                left = ($win.width() - dialogEle.width()) / 2;
                // top在垂直方向的黄金分割点上（0.618）
                top = $win.height() * 618 / (1e3 + 618) - dialogEle.height() / 2;
                if (conf.position === "absolute") {
                    top += $win.scrollTop();
                } else {
                    if ($.browser.msie && $.browser.version == "6.0") {
                        // ie6不支持fixed定位,所以强制设定为absolute定位
                        top += $win.scrollTop();
                        conf.position = "absolute";
                    }
                }
                if (left < 0) {
                    left = 0;
                }
                if (top < 0) {
                    top = 0;
                }
                x = x || left;
                y = y || top;
                dialogEle.css({
                    left: x,
                    top: y,
                    position: conf.position
                });
                return that;
            }
        }
    });
    // 添加静态方法
    Dialog.confirm = function(tipTxt, callback) {
        var contentEle = $([ '<p style="padding:15px 0 0;margin:0;font-size:14px;color:#666;line-height:1.5;text-align:center;">' + tipTxt + "</p>", '<div style="padding:15px 0;text-align:center;font-size:13px;">', '<a class="J-confirmBtn" href="javascript:;" style="color:#333;">确定</a>&nbsp;&nbsp;&nbsp;&nbsp;', '<a class="J-cancelBtn" href="javascript:;" style="color:#999;">取消</a>', "</div>" ].join(""));
        var dialog = Dialog.confirm._getConfirmDialogObj();
        var closeBtn = dialog.getAttr("dialogCloseEle"), confirmBtn = contentEle.find("a.J-confirmBtn"), cancelBtn = contentEle.find("a.J-cancelBtn");
        var _callback = function(isConfirm) {
            dialog.hide();
            if (typeof callback === "function") {
                callback(isConfirm);
            }
        };
        dialog.getAttr("dialogBdEle").empty().append(contentEle);
        confirmBtn.on("click", function() {
            _callback(true);
        });
        closeBtn.on("click", function() {
            _callback(false);
        });
        cancelBtn.on("click", function() {
            _callback(false);
        });
        dialog.show();
        return this;
    };
    Dialog.confirm._getConfirmDialogObj = singleton(new Dialog({
        width: 400,
        title: "提示"
    }));
    // 添加静态方法
    Dialog.alter = function(tipTxt) {
        var contentEle = $([ '<p style="padding:15px 0 0;margin:0;font-size:14px;color:#666;line-height:1.5;text-align:center;">' + tipTxt + "</p>", '<div style="padding:15px 0;text-align:center;font-size:13px;">', '<a class="J-confirmBtn" href="javascript:;" style="color:#333;">确定</a>', "</div>" ].join(""));
        var dialog = Dialog.alter._getAlterDialogObj();
        var confirmBtn = contentEle.find("a.J-confirmBtn"), closeBtn = dialog.getAttr("dialogCloseEle");
        dialog.getAttr("dialogBdEle").empty().append(contentEle);
        confirmBtn.on("click", function() {
            dialog.hide();
        });
        dialog.show();
        return this;
    };
    Dialog.alter._getAlterDialogObj = singleton(new Dialog({
        width: 400,
        title: "提示"
    }));
    return Dialog;
});

/**
 * @Author : 陈海云
 * @Date   : 2014-05-15
 * @Memo   : 实现一个生成、控制页面遮罩层的对象，在实现弹出层或其他效果是可以遮挡页面
 * 
 * 
 * @Methods:
 *      show:
 *          描述: 显示遮罩层；
 *          参数: 无；
 *          返回值: 当前对象；
 * 
 *      hide:
 *          描述: 隐藏遮罩层；
 *          参数: 无；
 *          返回值: 当前对象；
 * 
 *      setSize:
 *          描述: 根据页面尺寸，设定遮罩层的尺寸；
 *          参数: 无；
 *          返回值: 当前对象；
 * 
 */
define("components/dialog/1.0.0/mask-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var maskEleHtml = [ '<div style="display: none; background: #000; opacity:0.2; filter:Alpha(opacity=20); position: absolute; left: 0; top: 0; z-index: 9999;"></div>' ].join("");
    var maskObj = {
        maskEle: $(maskEleHtml),
        show: function() {
            this.setSize();
            this.maskEle.show();
            return this;
        },
        hide: function() {
            this.maskEle.hide();
            return this;
        },
        setSize: function() {
            var $doc = $(document);
            this.maskEle.css({
                width: $doc.width(),
                height: $doc.height()
            });
            return this;
        }
    };
    maskObj.maskEle.appendTo(document.body);
    // 监听浏览器窗口的resize（改变窗口大小）事件，同时调整遮罩层的尺寸
    $(window).on("resize", function() {
        maskObj.setSize();
    });
    return maskObj;
});

/**
 * @Author     : 陈海云
 * @Date       : 2014-06-25
 * @SuperClass : Widget
 * @Memo       : 提供一个实现弹出层的类，提供一些组件常用的接口，实现了“显示”（show()）、
 *               “隐藏”（hide()）、“定位”（position()）方法；该类实现的方法比较简单，主
 *               要为了方便封装和提供一个标准的弹出层接口
 * 
 * @param      : 无
 * 
 * @Methods:
 *      show:
 *          描述: 显示弹出层；
 *          参数: 无；
 *          返回值: 当前对象；
 * 
 *      hide:
 *          描述: 隐藏弹出层；
 *          参数: 无；
 *          返回值: 当前对象；
 * 
 *      position:
 *          描述: 定位弹出层，弹出层根节点是绝对定位，该方法设置其left、top 两个坐标；
 *          参数: 
 *              left——弹出层根节点的水平方向坐标，
 *              top——弹出层跟解答的垂直方向坐标；
 *          返回值: 当前对象；
 * 
 *      
 *      部分方法继承自父类 Widget，请参考父类 Widget
 * 
 * 
 * @Events: 
 *      无
 * 
 */
define("components/dialog/1.0.1/dialog-debug", [ "$-debug", "base/createClass/1.0.2/createClass-debug", "components/widget/0.0.1/widget-debug", "./mask-debug", "components/layer/0.0.1/layer-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var createClass = require("base/createClass/1.0.2/createClass-debug"), Widget = require("components/widget/0.0.1/widget-debug"), mask = require("./mask-debug");
    var Dialog = createClass({
        superClass: Widget,
        init: function(conf) {
            var that = this;
            conf = $.extend({
                width: 400,
                // 窗口宽度
                height: "auto",
                // 窗口宽度
                position: "fixed",
                // 窗口定位方式
                mask: false
            }, conf);
            that.setAttr(conf);
        },
        methods: {
            bindUI: function() {
                var that = this;
                function onresize() {
                    that.setPosition();
                }
                $(window).on("resize", onresize);
                that.on("destroy", function() {
                    var isShowMask = that.getAttr("mask");
                    $(window).off("resize", onresize);
                    if (isShowMask) {
                        mask.hide();
                    }
                });
            },
            renderUI: function() {
                var that = this, template = that.getAttr("template"), width = that.getAttr("width"), height = that.getAttr("height"), widgetEle = that.getAttr("widgetEle") || $(template);
                widgetEle.css({
                    width: width,
                    height: height,
                    display: "none",
                    background: "#000",
                    "z-index": "10000"
                });
                that.setAttr("widgetEle", widgetEle);
                return that;
            },
            // 显示对话框
            show: function() {
                var that = this, isShowMask = that.getAttr("mask"), widgetEle = that.getAttr("widgetEle");
                widgetEle.show();
                that.setPosition();
                if (isShowMask) {
                    mask.show();
                }
                that.on("show");
                return that;
            },
            // 关闭对话框
            hide: function() {
                var that = this, isShowMask = that.getAttr("mask"), widgetEle = that.getAttr("widgetEle");
                widgetEle.hide();
                if (isShowMask) {
                    mask.hide();
                }
                that.on("hide");
                return that;
            },
            setSize: function(width, height) {
                var that = this, widgetEle = that.getAttr("widgetEle");
                widgetEle.css({
                    width: width || that.getAttr("width"),
                    height: height || that.getAttr("height")
                });
                return that;
            },
            // 设置窗口位置,参数可选,不设置参数的时候,对话框位置在页面可视区域中央
            setPosition: function(x, y) {
                var that = this, pos = that.getAttr("position");
                var $win = $(window), widgetEle = that.getAttr("widgetEle");
                var left, top;
                left = ($win.width() - widgetEle.width()) / 2;
                // top在垂直方向的黄金分割点上（0.618）
                top = $win.height() * 618 / (1e3 + 618) - widgetEle.height() / 2;
                if (pos === "absolute") {
                    top = top + $win.scrollTop();
                } else {
                    if ($.browser.msie && $.browser.version == "6.0") {
                        // ie6不支持fixed定位,所以强制设定为absolute定位
                        top = top + $win.scrollTop();
                        pos = "absolute";
                        that.setAttr("position", pos);
                    }
                }
                if (left < 0) {
                    left = 0;
                }
                if (top < 0) {
                    top = 0;
                }
                x = x || left;
                y = y || top;
                widgetEle.css({
                    left: x,
                    top: y,
                    position: pos
                });
                return that;
            }
        }
    });
    return Dialog;
});

/**
 * @Author : 陈海云
 * @Date   : 2014-06-25
 * @Memo   : 实现一个生成、控制页面遮罩层的对象，在实现弹出层或其他效果是可以遮挡页面
 *           该类控制一个mask可对象，mask对象为Layer（components/layer/0.0.1/layer）
 *           的实例，切该对象为一个单例对象，不管在页面中有多少地方需要显示遮罩，调用
 *           的对象均为同一个对象指针
 * 
 * @Methods:
 *      show:
 *          描述: 显示遮罩层；
 *          参数: 无；
 *          返回值: 当前对象；
 * 
 *      hide:
 *          描述: 隐藏遮罩层；
 *          参数: 无；
 *          返回值: 当前对象；
 * 
 *      setSize:
 *          描述: 根据页面尺寸，设定遮罩层的尺寸；
 *          参数: 无；
 *          返回值: 当前对象；
 * 
 *      setStyle:
 *          描述: 设置遮罩层样式，只支持设置 background(背景，默认为#000——黑色)、opacity(透明度，默认为0.7——70%的透明度)两个样式；
 *          参数: 
 *              propName——样式属性名称；必填；字符串、对象；当为对象时，不会读取value参
 *                        数的值，而是提取该对象的 background、opacity两个属性值，来设
 *                        置对应的样式
 *              value——样式值
 *          返回值: 当前对象；
 * 
 */
define("components/dialog/1.0.1/mask-debug", [ "$-debug", "components/layer/0.0.1/layer-debug" ], function(require, exports, module) {
    var $ = require("$-debug"), Layer = require("components/layer/0.0.1/layer-debug");
    var body = $(document.body), mask = new Layer().render();
    var maskEle = mask.getAttr("widgetEle");
    maskEle.css({
        height: body.outerHeight(true),
        width: body.outerWidth(true),
        background: "#000",
        opacity: "0.7",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: "9999"
    });
    var maskObj = {
        show: function() {
            var that = this;
            maskEle.css({
                height: body.outerHeight(true),
                width: body.outerWidth(true)
            });
            mask.show();
            return that;
        },
        hide: function() {
            var that = this;
            mask.hide();
            return that;
        },
        setSize: function() {
            var that = this;
            maskEle.css({
                height: body.outerHeight(true),
                width: body.outerWidth(true)
            });
            return that;
        },
        setStyle: function(propName, value) {
            var styleObj = {};
            if (typeof propName === "object" && propName.constructor === Object) {
                styleObj.opacity = propName.opacity || "0.2";
                styleObj.background = propName.background || "#000";
            } else if (typeof propName === "string" && value) {
                if (propName === "opacity" || propName === "background") {
                    styleObj[propName] = value;
                }
            }
            maskEle.css(styleObj);
            return this;
        }
    };
    $(window).on("resize", function() {
        maskObj.setSize();
    });
    return maskObj;
});

/**
 * @Author     : 陈海云
 * @Date       : 2014-06-25
 * @SuperClass : Widget
 * @Memo       : 提供一个实现弹出层的类，提供一些组件常用的接口，实现了“显示”（show()）、
 *               “隐藏”（hide()）、“定位”（position()）方法；该类实现的方法比较简单，主
 *               要为了方便封装和提供一个标准的弹出层接口
 * 
 * @param      : 无
 * 
 * @Methods:
 *      show:
 *          描述: 显示弹出层；
 *          参数: 无；
 *          返回值: 当前对象；
 * 
 *      hide:
 *          描述: 隐藏弹出层；
 *          参数: 无；
 *          返回值: 当前对象；
 * 
 *      position:
 *          描述: 定位弹出层，弹出层根节点是绝对定位，该方法设置其left、top 两个坐标；
 *          参数: 
 *              left——弹出层根节点的水平方向坐标，
 *              top——弹出层跟解答的垂直方向坐标；
 *          返回值: 当前对象；
 * 
 *      
 *      部分方法继承自父类 Widget，请参考父类 Widget
 * 
 * 
 * @Events: 
 *      无
 * 
 */
define("components/layer/0.0.1/layer-debug", [ "$-debug", "base/createClass/1.0.2/createClass-debug", "components/widget/0.0.1/widget-debug" ], function(require) {
    var $ = require("$-debug"), createClass = require("base/createClass/1.0.2/createClass-debug"), Widget = require("components/widget/0.0.1/widget-debug");
    var Layer = createClass({
        superClass: Widget,
        attrs: {
            template: '<div style="display:none"></div>'
        },
        methods: {
            show: function() {
                var that = this, widgetEle = that.getAttr("widgetEle");
                widgetEle.show();
                return that;
            },
            hide: function() {
                var that = this, widgetEle = that.getAttr("widgetEle");
                widgetEle.hide();
                return that;
            },
            position: function(left, top) {
                var that = this, widgetEle = that.getAttr("widgetEle"), offset;
                if (widgetEle.css("display") === "none") {
                    offset = widgetEle.show().offset();
                    widgetEle.hide();
                } else {
                    offset = widgetEle.offset();
                }
                if (!left && left !== 0) {
                    left = offset.left;
                }
                if (!top && top !== 0) {
                    top = offset.top;
                }
                widgetEle.css({
                    left: left,
                    top: top
                });
                return that;
            }
        }
    });
    return Layer;
});

/**
 * @Author      : 陈海云
 * @Date        : 2014-06-12
 * @Memo        : 实现一个模拟进度的过程（可用于ajax请求等场景，模拟进度条），
 *                进度的值都是模拟实现，并非任务准确的进度
 * @superClass  : PubSub，继承该类，为了实现其事件处理的机制，
 * @param       : 无
 * @methods: 
 *      start:
 *          描述       : 启动进度，当任务开始的时候调用此方法
 *          参数       : 无
 *          返回值    : 当前对象
 *      finish:
 *          描述       : 完成进度，当任务结束时调用此方法，此时进度为100%
 *          参数       : 无
 *          返回值    : 当前对象
 *      pause:
 *          描述       : 暂停进度，任务进行时出现某些情况，需要暂停进度，此时进度保持当前值
 *          参数       : 无
 *          返回值    : 当前对象
 *      stop:
 *          描述       : 停止进度，任务进行时出现某些情况，需要停止进度，此时进度会置为0
 *          参数       : 无
 *          返回值    : 当前对象
 *      restart:
 *          描述       : 重启进度，如果任务暂停、完成或者停止，则可以调用此方法重新启动进
 *                   度，此时进入则之前保持的进度开始计算
 *          参数       : 无
 *          返回值    : 当前对象
 *      getProgress:
 *          描述       : 获取当前进度的值
 *          参数       : 无
 *          返回值    : 当前进度的值，0-100的一个数字
 * 
 *      其他方法：其他方法继承自超类：PubSub，请参考该类的方法
 * @events：
 *      start   : 启动时触发
 *      finish  : 进度完成时触发
 *      pause   : 进度暂停时触发
 *      stop    : 进度停止时触发
 *      restart : 进度重启
 *      progress: 进度进行中时触发（进度每次发生变化都会触发）
 */
define("components/progress/0.0.1/progress-debug", [ "base/createClass/1.0.1/createClass-debug", "base/pubSub/1.0.0/pubSub-debug" ], function(require) {
    var createClass = require("base/createClass/1.0.1/createClass-debug"), PubSub = require("base/pubSub/1.0.0/pubSub-debug");
    var Progress = createClass({
        superClass: PubSub,
        init: function() {
            this.setAttr("percent", 0);
        },
        methods: {
            start: function() {
                var that = this, interval = that.getAttr("interval"), timeout = 20, cumulateTime = 0;
                window.clearInterval(interval);
                interval = window.setInterval(function() {
                    var percent = that.getAttr("percent"), finished = that.getAttr("finished", true);
                    if (finished) {
                        percent += 3;
                    } else if (percent < 17) {
                        percent += .61;
                    } else if (percent >= 17 && percent < 27) {
                        percent += .02;
                    } else if (percent >= 27 && percent < 37) {
                        percent += .21;
                    } else if (percent >= 37 && percent < 47) {
                        percent += .1;
                    } else if (percent >= 47 && percent < 57) {
                        percent += .08;
                    } else if (percent >= 57 && percent < 67) {
                        percent += .05;
                    } else if (percent >= 67 && percent < 77) {
                        percent += .04;
                    } else if (percent >= 77 && percent < 87) {
                        percent += .02;
                    }
                    if (percent >= 100) {
                        percent = 100;
                        window.clearInterval(interval);
                        that.on("finish");
                    }
                    cumulateTime += timeout;
                    that.setAttr({
                        percent: percent,
                        cumulateTime: cumulateTime
                    });
                    that.on("progress");
                }, timeout);
                that.setAttr("interval", interval);
                return this;
            },
            finish: function() {
                var that = this;
                that.setAttr("finished", true);
                return that;
            },
            pause: function() {
                var that = this, interval = that.getAttr("interval");
                window.clearInterval(interval);
                that.on("pause");
                return that;
            },
            stop: function() {
                var that = this;
                that.setAttr({
                    percent: 0,
                    finished: false,
                    cumulateTime: 0
                }).pause();
                that.on("stop");
                return that;
            },
            restart: function() {
                this.setAttr({
                    percent: 0,
                    finished: false,
                    cumulateTime: 0
                }).start();
                this.on("restart");
                return this;
            },
            getProgress: function() {
                return this.getAttr("percent");
            }
        }
    });
    return Progress;
});

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
define("components/tab/1.0.1/tab-debug", [ "$-debug", "base/createClass/1.0.0/createClass-debug", "base/pubSub/1.0.0/pubSub-debug" ], function(require, exports, module) {
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
                    that.select(index);
                });
            });
        },
        methods: {
            select: function(index) {
                var that = this, tabItems = this.getAttr("tabItems"), selectedClass = this.getAttr("selectedClass");
                tabItems.removeClass(selectedClass);
                tabItems.eq(index).addClass(selectedClass);
                that.setAttr("index", index);
                that.on("change");
            }
        }
    });
    return Tab;
});

/**
 * @Author：陈海云
 * @Date：2014-05-16
 * @Memo：提供一个记录超时时间的构造函数，使用场景：一个操作需要
 *       在一定时间段内才能完成，例如：一部请求，通过该构造函数
 *       初始化实例，当操作时间超过设置的时间是会触发"timeout"的事件；
 *       构造函数继承了PubSub，因此部分方法请参考类 PubSub 对应的模
 *       块：common/pubSub/1.0.0/pubSub.js
 * @superClass：PubSub，继承该类，为了实现其事件处理的机制，
 * @param：time——初始设置超时时间，单位：毫秒
 * @methods：
 *      setTime：
 *          描述：设置超时时间；
 *          参数：
 *              millisecond——超时时间（单位：毫秒）；
 *          返回值：当前对象
 *      start：
 *          描述：启动超时器；
 *          参数：无；
 *          返回值：当前对象
 *      stop：
 *          描述：停止超时记录，使用该方法后，下次在启动超时器时则从0开始计时；
 *          参数：无；
 *          返回值：当前对象
 *      pause： 
 *          描述：暂停定时器，使用该方法后，下次启动超时器时则从暂停的时刻开始计时；
 *          参数：无
 *          返回值：当前对象
 *      其他方法：其他方法继承自超类：PubSub，请参考该类的方法
 * @events：
 *      start   ：启动时触发
 *      timeout ：超时时触发
 *      stop    ：停止定时器是触发
 *      pause   ：暂停定时器触发
 */
define("components/timeout/0.0.1/timeout-debug", [ "base/createClass/1.0.2/createClass-debug", "base/pubSub/1.0.0/pubSub-debug" ], function(require) {
    var createClass = require("base/createClass/1.0.2/createClass-debug"), PubSub = require("base/pubSub/1.0.0/pubSub-debug");
    var Timeout = createClass({
        // 设置超类
        superClass: PubSub,
        // 初始化方法
        init: function(time) {
            var that = this;
            that.setAttr({
                time: parseInt(time, 10) || 0,
                curTime: 0
            });
        },
        // 方法
        methods: {
            // 设置超时时间
            setTime: function(millisecond) {
                var that = this;
                millisecond = parseInt(millisecond, 10);
                if (isNaN(millisecond) || millisecond <= 0) {
                    throw new Error("方法：setTime(millisecond) 的参数 millisecond 必须为大于数字");
                }
                that.setAttr("time", millisecond);
                return that;
            },
            // 启动超时器
            start: function() {
                var that = this, time = that.getAttr("time");
                var timer = window.setInterval(function() {
                    var curTime = that.getAttr("curTime") + 50;
                    if (curTime >= time) {
                        that.on("timeout").stop();
                    }
                    that.setAttr("curTime", curTime);
                }, 50);
                window.clearInterval(that.getAttr("timer"));
                that.setAttr("timer", timer).on("start");
                return that;
            },
            // 停止记录超时时间
            stop: function() {
                var that = this;
                that.setAttr("curTime", 0).pause().on("stop");
                return that;
            },
            // 暂停记录超时时间
            pause: function() {
                var that = this;
                window.clearTimeout(that.getAttr("timer"));
                that.on("pause");
                return that;
            }
        }
    });
    return Timeout;
});

define("components/tip/0.0.1/tip-debug", [ "$-debug", "base/createClass/1.0.2/createClass-debug", "base/pubSub/1.0.0/pubSub-debug" ], function(require) {
    seajs.importStyle([ '.sea-tip{ padding: 5px 10px; border-radius: 5px; line-height: 1.7; background: #000; color: #fff; font-family: "microsoft yahei", "微软雅黑"; overflow: visible; position: absolute; z-index: 10010;}', ".sea-tip-content{ height: auto;}", '.sea-tip-pointer{ display: block; height: 12px; width: 12px; line-height: 12px; color: #000; font-style: normal; font-family: "宋体"; font-size: 12px; position: absolute;}', ".sea-tip-pointer-1{ left: 70%; top: -6px; margin-left: -6px;}", ".sea-tip-pointer-2{ top: 30%; right: -6px; margin-top: -6px;}", ".sea-tip-pointer-3{ top: 50%; right: -6px; margin-top: -6px;}", ".sea-tip-pointer-4{ top: 70%; right: -6px; margin-top: -6px;}", ".sea-tip-pointer-5{ left: 70%; bottom: -7px; margin-left: -6px;}", ".sea-tip-pointer-6{ left: 50%; bottom: -7px; margin-left: -6px;}", ".sea-tip-pointer-7{ left: 30%; bottom: -7px; margin-left: -6px;}", ".sea-tip-pointer-8{ top: 70%; left: -6px; margin-top: -6px;}", ".sea-tip-pointer-9{ top: 50%; left: -6px; margin-top: -6px;}", ".sea-tip-pointer-10{ top: 30%; left: -6px; margin-top: -6px;}", ".sea-tip-pointer-11{ left: 30%; top: -6px; margin-left: -6px;}", ".sea-tip-pointer-12{ left: 50%; top: -6px; margin-left: -6px;}", ".sea-tip-theme-red{ background: #f28c77; color: #fff;}", ".sea-tip-theme-red .sea-tip-pointer{ color: #f28c77;}", ".sea-tip-theme-blue{ background: #71c6f7; color: #fff;}", ".sea-tip-theme-blue .sea-tip-pointer{ color: #71c6f7;}", ".sea-tip-theme-green{ background: #4bc577; color: #fff;}", ".sea-tip-theme-green .sea-tip-pointer{ color: #4bc577;}", ".sea-tip-theme-white{ background: #eee; color: #333;}", ".sea-tip-theme-white .sea-tip-pointer{ color: #eee;}" ].join(""));
    var $ = require("$-debug"), createClass = require("base/createClass/1.0.2/createClass-debug"), PubSub = require("base/pubSub/1.0.0/pubSub-debug");
    var Tip = createClass({
        init: function(conf) {
            var _conf = conf || {};
            var that = this, template = [ '<div class="sea-tip sea-tip-theme-white">', '<div class="sea-tip-content"></div>', '<i class="sea-tip-pointer">◆</i>', "</div>" ].join("");
            var tipEle = $(template), contentEle = tipEle.children("div.sea-tip-content"), arrowEle = tipEle.children("i.sea-tip-pointer"), theme = _conf.theme || "", tipText = _conf.tipText || "", arrowPosition = _conf.arrowPosition || 10;
            that.setAttr({
                template: template,
                theme: theme,
                tipText: tipText,
                arrowPosition: arrowPosition,
                tipEle: tipEle,
                contentEle: contentEle,
                arrowEle: arrowEle
            });
            that.setTipText(tipText).setTheme(theme).setArrowPosition(arrowPosition);
            tipEle.appendTo(document.body).hide();
        },
        methods: {
            show: function() {
                var that = this, tipEle = that.getAttr("tipEle");
                tipEle.show();
                return that;
            },
            hide: function() {
                var that = this, tipEle = that.getAttr("tipEle");
                tipEle.hide();
                return that;
            },
            setArrowPosition: function(arrowPosition) {
                var that = this, arrowEle = that.getAttr("arrowEle"), arrowClass = "sea-tip-pointer-";
                arrowPosition = parseInt(arrowPosition, 10);
                if (arrowPosition < 1 || arrowPosition > 12) {
                    arrowPosition = 11;
                }
                arrowClass = arrowClass + arrowPosition;
                arrowEle.removeClass().addClass("sea-tip-pointer " + arrowClass);
                that.setAttr("arrowPosition", arrowPosition);
                return that;
            },
            setTheme: function(theme) {
                var that = this, tipEle = that.getAttr("tipEle"), oldThemeClass = that.getAttr("theme"), newThemeClass = "";
                if (theme !== "") {
                    newThemeClass = "sea-tip-theme-" + theme;
                }
                tipEle.removeClass().addClass("sea-tip " + newThemeClass);
                that.setAttr("theme", theme);
                return that;
            },
            setTipText: function(tipText) {
                var that = this, tipEle = that.getAttr("tipEle"), contentEle = that.getAttr("contentEle");
                contentEle.html(tipText);
                that.setAttr("tipText", tipText);
                return that;
            },
            setPosition: function(left, top) {
                var that = this, tipEle = that.getAttr("tipEle"), arrowEle = that.getAttr("arrowEle"), arrowPosition = that.getAttr("arrowPosition");
                var tipEleOffset, arrowEleOffset;
                var tipIsShow = tipEle.css("display") === "block";
                if (!tipIsShow) {
                    tipEle.css("display", "block");
                }
                tipEleOffset = tipEle.offset();
                arrowEleOffset = arrowEle.offset();
                left = parseInt(left, 10) || tipEleOffset.left;
                top = parseInt(top, 10) || tipEleOffset.top;
                left = left - (arrowEleOffset.left - tipEleOffset.left);
                top = top - (arrowEleOffset.top - tipEleOffset.top);
                switch (arrowPosition) {
                  case 2:
                  case 3:
                  case 4:
                    left = left - 12;
                    top = top - 6;
                    break;

                  case 5:
                  case 6:
                  case 7:
                    left = left - 6;
                    top = top - 12;
                    break;

                  case 8:
                  case 9:
                  case 10:
                    top = top - 6;
                    break;

                  case 1:
                  case 11:
                  case 12:
                    left = left - 6;
                    break;

                  default:                }
                tipEle.css({
                    left: left,
                    top: top
                });
                if (!tipIsShow) {
                    that.hide();
                }
                return that;
            }
        }
    });
    return Tip;
});

/**
 * @Author      : 陈海云
 * @Date        : 2014-06-26
 * @SuperClass  : Layer
 * @Memo        : 提供一个具有基本功能气泡形状提示功能的组件
 * 
 * @param: 
 *      conf——实例化时初始配置对象，该对象的可配置想如下
 *              {
 *                  fadeOutHide   : 是否以淡出的方式隐藏
 *                  theme         : 提示框的主题，可选，（样式，默认为黑色主题）；
 *                  tipText       : 提示文案，可选，默认为空字符串；
 *                  arrowPosition : 箭头方向（以组件根节点的时钟方向为参考），默认为11点钟方向；
 *              }
 * 
 * @Methods:
 *      bindUI:
 *          描述: 重写了基类 Widget 的方法，绑定一些事件；
 *          参数: 无
 *          返回值: 当前对象
 * 
 *      setArrowPosition:
 *          描述: 设置提示框的箭头的方位；
 *          参数: 
 *              arrowPosition——箭头的时钟方向；数字，1-12之间；
 *          返回值: 当前对象
 * 
 *      setTheme:
 *          描述: 设置提示框的主题样式；
 *          参数: 
 *              theme——主题名称，当前支持6中样式，默认（值为空即可）、红色（red）、蓝
 *                     色（blue）、绿色（green）、白色（white）、橙色（orange）
 *          返回值: 当前对象
 * 
 *      setTipText:
 *          描述: 设置提示文案；
 *          参数: 
 *              tipText——提示文案，字符串
 *          返回值: 当前对象
 * 
 *      position:
 *          描述: 
 *             设置提示的坐标，其坐标不是直接设置组件根节点，而是根据计算设置成提示组
 *             件箭头顶端的坐标，比如：通过该方法position(100, 100)将x、y坐标分别
 *             设置成100，而此时的效果则是：箭头的顶端坐标正好在(100, 100)的位置；
 *          参数: 
 *              left——箭头水平坐标；
 *              top——箭头垂直坐标
 * 
 *          返回值: 当前对象
 * 
 *          部分方法继承自父类，请参考父类
 * 
 * 
 * @Events: 无；
 * 
 */
define("components/tip/0.0.2/tip-debug", [ "$-debug", "base/createClass/1.0.2/createClass-debug", "components/layer/0.0.1/layer-debug" ], function(require) {
    var $ = require("$-debug"), createClass = require("base/createClass/1.0.2/createClass-debug"), Layer = require("components/layer/0.0.1/layer-debug");
    var template = [ '<div class="sea-tip2-content"></div>', '<i class="sea-tip2-pointer sea-tip2-pointer-11">◆</i>' ].join("");
    var Tip = createClass({
        superClass: Layer,
        init: function(conf) {
            var that = this;
            conf = $.extend({
                theme: "",
                tipText: "",
                arrowPosition: 11
            }, conf);
            that.setAttr(conf);
        },
        methods: {
            bindUI: function() {
                var that = this, widgetEle = that.getAttr("widgetEle");
                that.on("render", function() {
                    widgetEle.addClass("sea-tip2").html(template);
                    that.setAttr({
                        contentEle: widgetEle.find("div.sea-tip2-content"),
                        arrowEle: widgetEle.find("i.sea-tip2-pointer")
                    });
                    that.setArrowPosition(that.getAttr("arrowPosition"));
                    that.setTheme(that.getAttr("theme"));
                    that.setTipText(that.getAttr("tipText"));
                });
            },
            // 设置箭头方向
            setArrowPosition: function(arrowPosition) {
                var that = this, arrowEle = that.getAttr("arrowEle"), arrowClass = "sea-tip2-pointer sea-tip2-pointer-";
                arrowPosition = parseInt(arrowPosition, 10);
                if (arrowPosition < 1 || arrowPosition > 12 || !arrowPosition) {
                    arrowPosition = that.getAttr("arrowPosition");
                }
                arrowClass = arrowClass + arrowPosition;
                arrowEle.removeClass().addClass(arrowClass);
                that.setAttr("arrowPosition", arrowPosition);
                return that;
            },
            // 设置主题
            setTheme: function(theme) {
                var that = this, widgetEle = that.getAttr("widgetEle"), oldTheme = that.getAttr("theme"), newThemeClass = "";
                if (!theme) {
                    theme = oldTheme;
                }
                if (theme === "") {
                    newThemeClass = "";
                } else {
                    newThemeClass = "sea-tip2-theme-" + theme;
                }
                widgetEle.removeClass().addClass("sea-tip2 " + newThemeClass);
                that.setAttr("theme", theme);
                return that;
            },
            // 设置提示文本（支持html）
            setTipText: function(tipText) {
                var contentEle = this.getAttr("contentEle");
                contentEle.html(tipText);
                return this;
            },
            // 定位（定位目标为箭头），重写父类方法
            position: function(left, top) {
                var that = this, widgetEle = that.getAttr("widgetEle"), arrowEle = that.getAttr("arrowEle"), arrowPosition = that.getAttr("arrowPosition");
                var tipEleOffset, arrowEleOffset;
                var tipIsShow = widgetEle.css("display") === "block";
                if (!tipIsShow) {
                    widgetEle.css("display", "block");
                }
                tipEleOffset = widgetEle.offset();
                arrowEleOffset = arrowEle.offset();
                left = parseInt(left, 10);
                top = parseInt(top, 10);
                left = left - (arrowEleOffset.left - tipEleOffset.left);
                top = top - (arrowEleOffset.top - tipEleOffset.top);
                switch (arrowPosition) {
                  case 2:
                  case 3:
                  case 4:
                    left = left - 12;
                    top = top - 6;
                    break;

                  case 5:
                  case 6:
                  case 7:
                    left = left - 6;
                    top = top - 12;
                    break;

                  case 8:
                  case 9:
                  case 10:
                    top = top - 6;
                    break;

                  case 1:
                  case 11:
                  case 12:
                    left = left - 6;
                    break;

                  default:                }
                widgetEle.css({
                    left: left,
                    top: top
                });
                if (!tipIsShow) {
                    that.hide();
                }
                return that;
            }
        }
    });
    // 引入样式
    require("./css/tipStyle-debug.css");
    return Tip;
});

define("components/toolTip/0.0.1/toolTip-debug", [ "$-debug", "base/createClass/1.0.1/createClass-debug", "components/tip/0.0.1/tip-debug" ], function(require) {
    var $ = require("$-debug"), createClass = require("base/createClass/1.0.1/createClass-debug"), Tip = require("components/tip/0.0.1/tip-debug");
    var ToolTip = createClass({
        init: function(conf) {
            var that = this;
            var tipObj = new Tip();
            conf = $.extend({
                trigger: $(conf.trigger).eq(0)
            }, conf);
            that.setAttr(conf).setAttr("tipObj", tipObj);
            if (conf.tipText) {
                that.setTipText(conf.tipText);
            }
            if (conf.theme) {
                that.setTheme(conf.theme);
            }
            if (conf.arrowPosition) {
                that.setArrowPosition(conf.arrowPosition);
            }
        },
        methods: {
            show: function() {
                var that = this, tipObj = that.getAttr("tipObj"), trigger = that.getAttr("trigger"), offset = trigger.offset(), triggerWidth = trigger.outerWidth(), triggerHeight = trigger.outerHeight(), arrowPosition = that.getAttr("arrowPosition"), space = 5, left, top;
                left = offset.left;
                top = offset.top;
                switch (arrowPosition) {
                  case 2:
                    top = top + triggerHeight * .33;
                    left = left + triggerWidth + space;
                    break;

                  case 3:
                    top = top + triggerHeight * .5;
                    left = left + triggerWidth + space;
                    break;

                  case 4:
                    top = top + triggerHeight * .66;
                    left = left + triggerWidth + space;
                    break;

                  case 5:
                    top = top + triggerHeight + space;
                    left = left + triggerWidth * .66;
                    break;

                  case 6:
                    top = top + triggerHeight + space;
                    left = left + triggerWidth * .5;
                    break;

                  case 7:
                    top = top + triggerHeight + space;
                    left = left + triggerWidth * .33;
                    break;

                  case 8:
                    top = top + triggerHeight * .66;
                    left = left - space;
                    break;

                  case 9:
                    top = top + triggerHeight * .5;
                    left = left - space;
                    break;

                  case 10:
                    top = top + triggerHeight * .33;
                    left = left - space;
                    break;

                  case 1:
                    top = top - space;
                    left = left + triggerWidth * .66;
                    break;

                  case 11:
                    top = top - space;
                    left = left + triggerWidth * .33;
                    break;

                  case 12:
                    top = top - space;
                    left = left + triggerWidth * .5;
                    break;

                  default:                }
                tipObj.setPosition(left, top).show();
                return that;
            },
            temporaryShow: function(time) {
                var that = this, temporaryTimer = that.getAttr("temporaryTimer");
                if (temporaryTimer) {
                    window.clearTimeout(temporaryTimer);
                }
                temporaryTimer = window.setTimeout(function() {
                    that.hide();
                }, time);
                that.setAttr("temporaryTimer", temporaryTimer);
                that.show();
                return that;
            },
            hide: function() {
                var that = this, tipObj = that.getAttr("tipObj");
                tipObj.hide();
                return that;
            },
            setArrowPosition: function(arrowPosition) {
                var that = this, tipObj = that.getAttr("tipObj"), tipArrowPosition;
                that.setAttr("arrowPosition", arrowPosition);
                switch (arrowPosition) {
                  case 1:
                    tipArrowPosition = 5;
                    break;

                  case 2:
                    tipArrowPosition = 10;
                    break;

                  case 3:
                    tipArrowPosition = 9;
                    break;

                  case 4:
                    tipArrowPosition = 8;
                    break;

                  case 5:
                    tipArrowPosition = 1;
                    break;

                  case 6:
                    tipArrowPosition = 12;
                    break;

                  case 7:
                    tipArrowPosition = 11;
                    break;

                  case 8:
                    tipArrowPosition = 4;
                    break;

                  case 9:
                    tipArrowPosition = 3;
                    break;

                  case 10:
                    tipArrowPosition = 2;
                    break;

                  case 11:
                    tipArrowPosition = 7;
                    break;

                  case 12:
                    tipArrowPosition = 6;
                    break;

                  default:                }
                tipObj.setArrowPosition(tipArrowPosition);
                return that;
            },
            setTheme: function(theme) {
                var that = this, tipObj = that.getAttr("tipObj");
                tipObj.setTheme(theme);
                return that;
            },
            setTipText: function(tipText) {
                var that = this, tipObj = that.getAttr("tipObj");
                tipObj.setTipText(tipText);
                return that;
            },
            setPosition: function(left, top) {
                var that = this, tipObj = that.getAttr("tipObj");
                tipObj.setPosition(left, top);
                return that;
            }
        }
    });
    return ToolTip;
});

define("components/toolTip/0.0.2/toolTip-debug", [ "$-debug", "base/createClass/1.0.2/createClass-debug", "base/pubSub/1.0.0/pubSub-debug", "components/tip/0.0.1/tip-debug" ], function(require) {
    var $ = require("$-debug"), createClass = require("base/createClass/1.0.2/createClass-debug"), PubSub = require("base/pubSub/1.0.0/pubSub-debug"), Tip = require("components/tip/0.0.1/tip-debug");
    var ToolTip = createClass({
        superClass: [ Tip, PubSub ],
        init: function(conf) {
            var that = this;
            conf = $.extend({
                trigger: $(conf.trigger).eq(0)
            }, conf);
            that.setAttr(conf);
            if (conf.tipText) {
                that.setTipText(conf.tipText);
            }
            if (conf.theme) {
                that.setTheme(conf.theme);
            }
            if (conf.arrowPosition) {
                that.setArrowPosition(conf.arrowPosition);
            }
        },
        methods: {
            // 方法：根据设置的箭头方向重新定位后显示tip（覆盖父类的show方法）
            show: function() {
                var that = this;
                that.relocation().getAttr("tipEle").show();
                that.on("show");
                return that;
            },
            // 方法：根据设置的箭头方向重新定位后tip
            relocation: function() {
                var that = this, position = that.computePosition();
                that.setPosition(position.left, position.top);
                return that;
            },
            // 方法：根据设置的箭头方向计算出tip的位置
            computePosition: function() {
                var that = this, trigger = that.getAttr("trigger"), offset = trigger.offset(), triggerWidth = trigger.outerWidth(), triggerHeight = trigger.outerHeight(), arrowPosition = that.getAttr("triggerArrowPosition"), // 箭头和trigger直接的距离
                space = 5, left, top;
                left = offset.left;
                top = offset.top;
                switch (arrowPosition) {
                  case 1:
                    top = top - space;
                    left = left + triggerWidth * .66;
                    break;

                  case 2:
                    top = top + triggerHeight * .33;
                    left = left + triggerWidth + space;
                    break;

                  case 3:
                    top = top + triggerHeight * .5;
                    left = left + triggerWidth + space;
                    break;

                  case 4:
                    top = top + triggerHeight * .66;
                    left = left + triggerWidth + space;
                    break;

                  case 5:
                    top = top + triggerHeight + space;
                    left = left + triggerWidth * .66;
                    break;

                  case 6:
                    top = top + triggerHeight + space;
                    left = left + triggerWidth * .5;
                    break;

                  case 7:
                    top = top + triggerHeight + space;
                    left = left + triggerWidth * .33;
                    break;

                  case 8:
                    top = top + triggerHeight * .66;
                    left = left - space;
                    break;

                  case 9:
                    top = top + triggerHeight * .5;
                    left = left - space;
                    break;

                  case 10:
                    top = top + triggerHeight * .33;
                    left = left - space;
                    break;

                  case 11:
                    top = top - space;
                    left = left + triggerWidth * .33;
                    break;

                  case 12:
                    top = top - space;
                    left = left + triggerWidth * .5;
                    break;

                  default:                }
                return {
                    left: left,
                    top: top
                };
            },
            // 方法：临时显示tip，根据设置的time长时间段临时显示tip
            temporaryShow: function(time) {
                var that = this, temporaryTimer = that.getAttr("temporaryTimer");
                if (temporaryTimer) {
                    window.clearTimeout(temporaryTimer);
                }
                temporaryTimer = window.setTimeout(function() {
                    that.hide();
                }, time);
                that.setAttr("temporaryTimer", temporaryTimer);
                that.show();
                return that;
            },
            /*
             * 方法：设置箭头的方向，以trigger为参考对象设置箭头钟表方向，如：trigger
             * 的12点钟的方向，tip对应的方向则为6点钟（覆盖父类的show方法）
             */
            setArrowPosition: function(arrowPosition) {
                var that = this, arrowMapping = [ 5, 10, 9, 8, 1, 12, 11, 4, 3, 2, 7, 6 ], tipArrowPosition = arrowMapping[arrowPosition - 1];
                that.setAttr("triggerArrowPosition", arrowPosition);
                that.superClass.prototype.setArrowPosition.call(that, tipArrowPosition);
                return that;
            }
        }
    });
    return ToolTip;
});

/**
 * @Author      : 陈海云
 * @Date        : 2014-06-26
 * @SuperClass  : Tip（components/tip/0.0.2/tip）
 * @Memo        : 提供一个具有多功能气泡形状提示功能的组件，对Tip（components/tip/0.0.2/tip）类进行了扩展
 * 
 * @param: 
 *      conf——实例化时初始配置对象，可配置属性在其父类Tip的基础上又增加了一下两项：
 *          {
 *              trigger     : 唤出tip的DOM节点；
 *              triggerType : 唤出tip节点的事件类型，默认为hover，即：鼠标移到trigger上时，显
 *                            示tip，移出时隐藏tip；当前支持三种事件类型：hover、click（单击
 *                            trigger时唤出tip）、focus（trigger获取焦点是唤出tip）；
 *          }
 * 
 * @Methods:
 *      bindUI:
 *          描述: 重写了基类 Widget 的方法，绑定一些事件；
 *          参数: 无
 *          返回值: 当前对象
 * 
 *      show:
 *          描述: 根据trigger的位置以及arrowPosition来显示tip，重写了父类的此方法；
 *          参数: 无；
 *          返回值: 当前对象
 * 
 *      relocation:
 *          描述: 根据trigger的位置以及arrowPosition重新定位tip的位置；
 *          参数: 无；
 *          返回值: 当前对象
 * 
 *      computePosition:
 *          描述: 根据trigger的位置以及arrowPosition计算出tip的位置；
 *          参数: 无；
 *          返回值: 当前对象
 * 
 *      temporaryShow:
 *          描述: 根据设置的时间，临时显示tip，过了设置的时间长度，tip自动隐藏；
 *          参数: 
 *              time——临时显示的时间；数值；单位：毫秒；
 * 
 *          返回值: 当前对象
 * 
 *      setArrowPosition:
 *          描述: 设置tip的箭头位置，该位置是以trigger为参考；
 *          参数: 
 *              arrowPosition——箭头的时钟方向值；以trigger为参考，例如：参数值
 *                             为6，tip会显示在trigger的正下方，此时，如果以 
 *                             tip 组件根节点为参考的话，tip 箭头方向应为12，
 *                             该方法会自动计算；
 * 
 *          返回值: 当前对象
 * 
 *          部分方法继承自父类，请参考父类
 * 
 * 
 * @Events: 无；
 * 
 */
define("components/toolTip/0.0.3/toolTip-debug", [ "$-debug", "base/createClass/1.0.2/createClass-debug", "components/tip/0.0.2/tip-debug" ], function(require) {
    var $ = require("$-debug"), createClass = require("base/createClass/1.0.2/createClass-debug"), Tip = require("components/tip/0.0.2/tip-debug");
    var TRIGGER_TYPE = [ "hover", "click", "focus" ];
    var ToolTip = createClass({
        superClass: Tip,
        init: function(conf) {
            var that = this;
            conf = $.extend({}, conf);
            if (conf.trigger) {
                conf.trigger = $(conf.trigger).eq(0);
            }
            if (indexOf.call(TRIGGER_TYPE, conf.triggerType) === -1) {
                conf.triggerType = TRIGGER_TYPE[0];
            }
            that.setAttr(conf);
        },
        methods: {
            bindUI: function() {
                var that = this, widgetEle = that.getAttr("widgetEle"), trigger = that.getAttr("trigger"), triggerType = that.getAttr("triggerType");
                var $win = $(window);
                // 窗口大小变化是，则根据trigger的位置重新定位tip的位置
                function resize() {
                    if (widgetEle.css("display") !== "none") {
                        that.relocation();
                    }
                }
                that.superClass.prototype.bindUI.apply(that);
                if (trigger) {
                    $win.on("resize", resize);
                    that.on("destroy", function() {
                        $win.off("resize", resize);
                    });
                    if (triggerType === "hover") {
                        var showFlag = false;
                        trigger.hover(function() {
                            showFlag = true;
                            that.show();
                        }, function() {
                            showFlag = false;
                            window.setTimeout(function() {
                                if (!showFlag) {
                                    that.hide();
                                }
                            }, 100);
                        });
                        widgetEle.hover(function() {
                            showFlag = true;
                            that.show();
                        }, function() {
                            showFlag = false;
                            window.setTimeout(function() {
                                if (!showFlag) {
                                    that.hide();
                                }
                            }, 100);
                        });
                    } else if (triggerType === "click") {
                        widgetEle.on("click", function() {
                            return false;
                        });
                        // 点击文档中的其他（除trigger的）地方时，隐藏tip
                        $(document.body).on("click", function(ev) {
                            if (ev.srcElement !== trigger[0]) {
                                that.hide();
                            }
                        });
                        trigger.on("click", function() {
                            that.show();
                        });
                    } else if (triggerType === "focus") {
                        widgetEle.on("mousedown", function() {
                            return false;
                        });
                        trigger.on("focus", function() {
                            that.show();
                        });
                        trigger.on("blur", function() {
                            that.hide();
                        });
                    }
                }
            },
            // 方法：根据设置的箭头方向重新定位后显示tip（覆盖父类的show方法）
            show: function() {
                var that = this, trigger = that.getAttr("trigger");
                if (trigger) {
                    that.relocation();
                }
                that.getAttr("widgetEle").show();
                that.on("show");
                return that;
            },
            // 方法：根据设置的箭头方向重新定位后tip
            relocation: function() {
                var that = this, thePosition = that.computePosition();
                that.position(thePosition.left, thePosition.top);
                return that;
            },
            // 方法：根据设置的箭头方向计算出tip的位置
            computePosition: function() {
                var that = this, trigger = that.getAttr("trigger"), offset = trigger.offset(), triggerWidth = trigger.outerWidth(), triggerHeight = trigger.outerHeight(), arrowPosition = that.getAttr("triggerArrowPosition"), // 箭头和trigger直接的距离
                space = 5, left, top;
                left = offset.left;
                top = offset.top;
                switch (arrowPosition) {
                  case 1:
                    top = top - space;
                    left = left + triggerWidth * .66;
                    break;

                  case 2:
                    top = top + triggerHeight * .33;
                    left = left + triggerWidth + space;
                    break;

                  case 3:
                    top = top + triggerHeight * .5;
                    left = left + triggerWidth + space;
                    break;

                  case 4:
                    top = top + triggerHeight * .66;
                    left = left + triggerWidth + space;
                    break;

                  case 5:
                    top = top + triggerHeight + space;
                    left = left + triggerWidth * .66;
                    break;

                  case 6:
                    top = top + triggerHeight + space;
                    left = left + triggerWidth * .5;
                    break;

                  case 7:
                    top = top + triggerHeight + space;
                    left = left + triggerWidth * .33;
                    break;

                  case 8:
                    top = top + triggerHeight * .66;
                    left = left - space;
                    break;

                  case 9:
                    top = top + triggerHeight * .5;
                    left = left - space;
                    break;

                  case 10:
                    top = top + triggerHeight * .33;
                    left = left - space;
                    break;

                  case 11:
                    top = top - space;
                    left = left + triggerWidth * .33;
                    break;

                  case 12:
                    top = top - space;
                    left = left + triggerWidth * .5;
                    break;

                  default:                }
                return {
                    left: left,
                    top: top
                };
            },
            // 方法：临时显示tip，根据设置的time长时间段临时显示tip
            temporaryShow: function(time) {
                var that = this, temporaryTimer = that.getAttr("temporaryTimer");
                if (temporaryTimer) {
                    window.clearTimeout(temporaryTimer);
                }
                temporaryTimer = window.setTimeout(function() {
                    that.hide();
                }, time);
                that.setAttr("temporaryTimer", temporaryTimer);
                that.show();
                return that;
            },
            /*
             * 方法：设置箭头的方向，以trigger为参考对象设置箭头钟表方向，如：trigger
             * 的12点钟的方向，tip对应的方向则为6点钟（覆盖父类的show方法）
             */
            setArrowPosition: function(arrowPosition) {
                var that = this, widgetEle = that.getAttr("widgetEle"), trigger = that.getAttr("trigger"), arrowMapping = [ 5, 10, 9, 8, 1, 12, 11, 4, 3, 2, 7, 6 ], tipArrowPosition = arrowPosition;
                if (trigger) {
                    // 如果设置了trigger，则进行此映射
                    tipArrowPosition = arrowMapping[arrowPosition - 1];
                }
                that.setAttr("triggerArrowPosition", arrowPosition);
                that.superClass.prototype.setArrowPosition.call(that, tipArrowPosition);
                if (trigger && widgetEle.css("display") !== "none") {
                    that.relocation();
                }
                return that;
            }
        }
    });
    var indexOf = Array.prototype.indexOf || function(ele) {
        var arr = this, reuslt = -1;
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i] === ele) {
                result = i;
                break;
            }
        }
        return result;
    };
    return ToolTip;
});

/**
 * @Author：陈海云
 * @Date：2014-5-15
 * @SuperClass：SubPub(继承订阅-发布模式的实现，以实现事件处理的功能)
 * @Memo：实现一个水平滚动的效果（滑动门）
 * @Param：conf = {
 *     view: 移动视图（滚动的节点）
 *     speed: 滚动速度
 *     scale: 每次移动的距离
 *     autoScroll: 是否自动滚动
 *     autoScrollTimeout: 自动滚动的时间间隔
 * }
 * 
 * @Methods:
 *      scrollTo:
 *          描述: 将试图滚动到参数index对应索引的模块
 *          参数:
 *              index——需要滚动到的目标索引值
 *          返回: 当前对象
 */
define("components/vScroll/0.0.1/vScroll-debug", [ "$-debug", "base/createClass/1.0.0/createClass-debug", "base/pubSub/1.0.0/pubSub-debug" ], function(require) {
    var $ = require("$-debug");
    var createClass = require("base/createClass/1.0.0/createClass-debug"), SubPub = require("base/pubSub/1.0.0/pubSub-debug");
    var Vscroll = createClass({
        superClass: SubPub,
        init: function(conf) {
            var that = this;
            var view = $(conf.view), speed = parseInt(conf.speed, 10) || "fast", scale = parseInt(conf.scale, 10), autoScroll = !!conf.autoScroll, autoScrollTimeout = parseInt(conf.autoScrollTimeout, 10) || 1e3;
            that.setAttr({
                view: view,
                speed: speed,
                scale: scale,
                autoScroll: autoScroll,
                autoScrollTimeout: autoScrollTimeout,
                hoverFlag: false,
                index: 0
            });
            view.hover(function() {
                that.setAttr("hoverFlag", true);
            }, function() {
                that.setAttr("hoverFlag", false);
            });
            if (autoScroll) {
                that.autoScroll();
            }
        },
        methods: {
            scrollTo: function(index) {
                var that = this, left = 0, view = that.getAttr("view"), speed = that.getAttr("speed"), scale = that.getAttr("scale"), hoverFlag = that.getAttr("hoverFlag");
                index = Math.floor(Number(index) || 0);
                if (index >= view.children().size()) {
                    index = 0;
                }
                if (index < 0) {
                    index = view.children().size() - 1;
                }
                left = 0 - scale * index;
                if (!hoverFlag) {
                    view.stop().animate({
                        left: left
                    }, speed, function() {});
                    that.setAttr("index", index);
                    that.on("scroll");
                }
                if (that.getAttr("autoScroll")) {
                    window.clearTimeout(that.getAttr("timeout"));
                    that.autoScroll();
                }
                return that;
            },
            autoScroll: function() {
                var that = this, autoScrollTimeout = that.getAttr("autoScrollTimeout");
                var timeout = window.setTimeout(function() {
                    var curIndex = that.getAttr("index");
                    curIndex = (parseInt(curIndex, 10) || 0) + 1;
                    that.scrollTo(curIndex);
                }, autoScrollTimeout);
                that.setAttr("timeout", timeout);
                return that;
            },
            getIndex: function() {
                return this.getAttr("index");
            }
        }
    });
    return Vscroll;
});

/**
 * @Author      : 陈海云
 * @Date        : 2014-06-23
 * @SuperClass  : PubSub
 * @Memo        : 提供一个实现组件的基类，提供一些组件常用的接口（方法、事件），该
 *                类一般不直接生成实例，主要目的是为了提供一个标准化的接口，在开发
 *                具体的组件时继承该类，来扩展功能基类实现更丰富的功能
 * @param       : 无
 * 
 * @Methods:
 *      render:
 *          描述: 渲染组件，将组件对应的DOM根节点加入到文档流中；
 *          参数: 
 *              container——需要将组件DOM根据加入到文档流的直接父容器，可选，默认为document.body；
 *          返回值: 当前对象
 * 
 *      renderUI:
 *          描述: 接口（空方法，需要子类重写覆盖），渲染组件内部的UI，在调用方法render()中调用，开始渲染之前调用；
 *          参数: 无
 *          返回值: 当前对象
 * 
 *      bindUI:
 *          描述: 接口（空方法，需要子类重写覆盖），在组件中的节点绑定某些事件，在调用方法render()中调用，开始渲染之前调用；
 *          参数: 无
 *          返回值: 当前对象
 * 
 *      destroy:
 *          描述: 销毁组件，将组件对应的DOM根节点从文档流中删除，并将解绑所有事件；
 *          参数: 无
 *          返回值: 当前对象
 * 
 *      destruct:
 *          描述: 接口（空方法，需要子类重写覆盖），在destroy()方法中调用，在销毁前做一些准备工作；
 *          参数: 无
 *          返回值: 当前对象
 * 
 *          部分方法继承自父类PubSub，请参考父类PubSub
 * 
 * 
 * @Events: 
 *      render:
 *          描述: 组件渲染时触发该事件；
 * 
 *      destroy:
 *          描述: 组件销毁时触发该事件；
 * 
 */
define("components/widget/0.0.1/widget-debug", [ "$-debug", "base/createClass/1.0.2/createClass-debug", "base/pubSub/1.0.1/pubSub-debug" ], function(require) {
    var $ = require("$-debug"), createClass = require("base/createClass/1.0.2/createClass-debug"), PubSub = require("base/pubSub/1.0.1/pubSub-debug");
    var Widget = createClass({
        superClass: PubSub,
        attrs: {
            template: '<div style="display:none;"></div>'
        },
        methods: {
            // 在渲染之前调用，处理一些UI方面的渲染工作
            renderUI: function() {},
            // 在渲染之后调用，在UI上绑定一些事件
            bindUI: function() {},
            // 将组件渲染到文档流中，
            render: function(container) {
                var that = this, template = that.getAttr("template"), rendered = that.getAttr("rendered"), widgetEle;
                // 判断组件是否已经渲染过，防止重复渲染
                if (rendered) {
                    return that;
                }
                that.renderUI();
                widgetEle = that.getAttr("widgetEle");
                if (!widgetEle) {
                    widgetEle = $(template);
                    that.setAttr("widgetEle", widgetEle);
                }
                if (!container) {
                    // 默认父容器为document.body
                    container = document.body;
                }
                // 加入到文档中
                widgetEle.appendTo(container);
                that.bindUI();
                that.setAttr({
                    rendered: true
                });
                that.on("render");
                return that;
            },
            // 销毁前调用的方法，空方法，需要子类实现
            destruct: function() {},
            // 销毁组件
            destroy: function() {
                var that = this, widgetEle = that.getAttr("widgetEle");
                that.destruct();
                // 将组件根节点从文档流中删除、删除根节点上的所有事件
                widgetEle.remove().off();
                // 触发destroy事件，并卸载组件上所有事件
                that.on("destroy").unbind().setAttr("rendered", false).setAttr("widgetEle", null);
                return that;
            }
        }
    });
    return Widget;
});
