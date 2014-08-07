// 设置“推广截止点”切换效果

define(function(require) {
    var $ = require('$');
    
    var Tab = require('components/tab/1.0.1/tab');
    
    var theFrm              = $('#J-configSpreadFrm'),
        deadline            = theFrm.find('input[name=deadline]'),
        deadlineAttach      = $('#J-deadlineAttach'),
        deadlineValue       = $('#deadlineValue'),
        deadlineValueIco    = deadlineAttach.find('label.com-ico-canlendar');
    
    var tabObj = new Tab({
        tabItems: deadline,
        selectedClass: ''
    });
    
    require('gallery/jquery-ui/1.9.2/jquery-ui-debug')($);
    
    tabObj.on('change', function() {
        var index = tabObj.getAttr('index');
        
        deadlineAttach.show();
        
        deadlineValue.val('');
        deadlineValueIco.hide();
        
        if(index === 0) {
            deadlineValueIco.show();
            
            deadlineValue.datepicker({
                dateFormat: "yy-mm-dd"
            });
        } else {
            deadlineValue.datepicker('destroy');
        }
    });
});
