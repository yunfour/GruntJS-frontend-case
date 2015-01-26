define("pages/closingCost/1.0.0/closingCost-debug", [ "$-debug", "base/dateFormat/0.0.1/dateFormat-debug", "common/setFilter/0.0.1/setFilter-debug", "components/calendar/0.0.1/calendar-debug" ], function(require) {
    var $ = require("$-debug"), dateFormat = require("base/dateFormat/0.0.1/dateFormat-debug"), setFilter = require("common/setFilter/0.0.1/setFilter-debug");
    var pagerPanel = $("#J-pagerPanel"), filterPanel = $("#J-filterPanel"), applyBeginDate = filterPanel.find("input[name=beginDate]"), applyEndDate = filterPanel.find("input[name=endDate]");
    setFilter({}, filterPanel, pagerPanel);
    var Calendar = require("components/calendar/0.0.1/calendar-debug");
    var today = new Date();
    var beginDateCalendar = new Calendar({
        range: [ undefined, today ],
        trigger: applyBeginDate
    });
    var endDateCalendar = new Calendar({
        range: [ undefined, today ],
        trigger: applyEndDate
    });
    beginDateCalendar.on("selectDate", function(theDate) {
        endDateCalendar.range([ theDate, today ]);
    });
    endDateCalendar.on("selectDate", function(theDate) {
        beginDateCalendar.range([ undefined, theDate ]);
    });
});