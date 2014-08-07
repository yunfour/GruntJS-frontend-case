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
define("components/calendar/0.0.1/calendar-debug", [ "$-debug", "base/createClass/1.0.2/createClass-debug", "base/dateFormat/0.0.1/dateFormat-debug", "components/widget/0.0.1/widget-debug", "./calendarStyle-debug.css" ], function(require) {
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
                        // 点击页面上日历和trigger以外的地方的时候隐藏日历
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
                that.superClass.prototype.destroy(that);
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

define("components/calendar/0.0.1/calendarStyle-debug.css", [], function() {
    seajs.importStyle(".sea-calendar{height:auto;width:210px;padding:15px 10px;border:1px solid #E5E5E5;box-shadow:0 0 15px -3px #aaa;border-radius:3px;background:#fff;color:#333;position:absolute;left:0;top:0;z-index:10000}.sea-calendar,.sea-calendar a{color:#333}.sea-calendar-title{height:25px;margin:0 0 5px}.sea-calendar-title a{display:block;height:25px;line-height:25px;text-align:center;float:left}.sea-calendar-title a:hover{background:#ccc;text-decoration:none}.sea-calendar-title .year,.sea-calendar-title .month{width:26%;font-weight:700}.sea-calendar-title .pre-month,.sea-calendar-title .next-month,.sea-calendar-title .pre-year,.sea-calendar-title .next-year{width:12%}.sea-calendar-date{height:auto}.sea-calendar-week{height:30px}.sea-calendar-week li{height:30px;width:14.28%;font-weight:700;line-height:30px;text-align:center;float:left;overflow:hidden;cursor:default}.sea-calendar-day{height:auto}.sea-calendar-day li{width:14.28%;height:28px;float:left}.sea-calendar-day a{display:block;height:28px;line-height:28px;color:#333;text-align:center}.sea-calendar-day a:hover,.sea-calendar-day a.today{border-radius:3px;background:#CFCFCF;text-decoration:none}.sea-calendar-day a.active{border-radius:3px;background:#5fb3e3;color:#fff}.sea-calendar-day a.space{cursor:default}.sea-calendar-day a.disabled,.sea-calendar-day a.disabled:hover{border-radius:0;background:#eee;color:#999;cursor:default;cursor:not-allowed!important}.sea-calendar-years{height:auto;display:none}.sea-calendar-years li{width:33.33%;float:left}.sea-calendar-years a{display:block;height:35px;line-height:35px;text-align:center}.sea-calendar-years a:hover{background:#ccc;text-decoration:none}.sea-calendar-years a.active{background:#5fb3e3;color:#fff}.sea-calendar-monthes{height:auto;display:none}.sea-calendar-monthes li{width:33.33%;float:left}.sea-calendar-monthes a{display:block;height:35px;line-height:35px;text-align:center}.sea-calendar-monthes a:hover{background:#ccc;text-decoration:none}.sea-calendar-monthes a.active{background:#5fb3e3;color:#fff}.sea-calendar-theme-orange .sea-calendar-day a.active,.sea-calendar-theme-orange .sea-calendar-years a.active,.sea-calendar-theme-orange .sea-calendar-monthes a.active{background:#f57403}.sea-calendar-theme-black .sea-calendar-day a.active,.sea-calendar-theme-black .sea-calendar-years a.active,.sea-calendar-theme-black .sea-calendar-monthes a.active{background:#333}");
});
