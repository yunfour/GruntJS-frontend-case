define(function(require) {
    var $           = require('$'),
        dateFormat  = require('base/dateFormat/0.0.1/dateFormat'),
        setFilter   = require('common/setFilter/0.0.1/setFilter');
    
    var pagerPanel     = $('#J-pagerPanel'),
        filterPanel    = $('#J-filterPanel'),
        applyBeginDate = filterPanel.find('input[name=beginDate]'),
        applyEndDate   = filterPanel.find('input[name=endDate]');
    
    setFilter({}, filterPanel, pagerPanel);
    
    var Calendar = require('components/calendar/0.0.1/calendar');
    
    var today = new Date();
    var beginDateCalendar = new Calendar({
        range: [undefined, today],
        trigger: applyBeginDate
    });
    var endDateCalendar = new Calendar({
        range: [undefined, today],
        trigger: applyEndDate
    });
    
    beginDateCalendar.on('selectDate', function(theDate) {
        endDateCalendar.range([theDate, today]);
    });
    endDateCalendar.on('selectDate', function(theDate) {
        beginDateCalendar.range([undefined, theDate]);
    });
    
});
