define(function(require) {
    var $ = require('$');
    
    var appLst = $('#J-appLst');
    
    // 单击“推广信息栏”的时候显示/隐藏进度条
    appLst.delegate('div.app-spread-info', 'click', function() {
        var rateSwitchBtn = $(this),
            stateIco      = rateSwitchBtn.find('i.com-ico'),
            rate          = rateSwitchBtn.closest('li.app-lst-itm').find('div.app-rate');
            
        if(stateIco.hasClass('up-ico')) {
            rate.hide();
            stateIco.removeClass()
                    .addClass('com-ico down-ico');
        } else {
            rate.show();
            stateIco.removeClass()
                    .addClass('com-ico up-ico');
        }
    });
});
